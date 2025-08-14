import type { ApiCaller } from '../api/api-caller';
import type { MessageType } from '../types/messages';
import type { ActionCallDto, MessageDto } from '../types/dtos';
import type { WidgetConfig } from '../types/widget-config';
import { Poller } from '../utils/Poller';
import { runCatching } from '../utils/run-catching';
import type { MessageCtx } from './message.ctx';
import type { SessionCtx } from './session.ctx';

export class ActiveSessionPollingCtx {
  private api: ApiCaller;
  private config: WidgetConfig;
  private sessionCtx: SessionCtx;
  private messageCtx: MessageCtx;
  private sessionPollingIntervalSeconds: number;

  private poller = new Poller();

  constructor({
    api,
    config,
    sessionCtx,
    messageCtx,
    sessionPollingIntervalSeconds,
  }: {
    api: ApiCaller;
    config: WidgetConfig;
    sessionCtx: SessionCtx;
    messageCtx: MessageCtx;
    sessionPollingIntervalSeconds: number;
  }) {
    this.api = api;
    this.config = config;
    this.sessionCtx = sessionCtx;
    this.messageCtx = messageCtx;
    this.sessionPollingIntervalSeconds = sessionPollingIntervalSeconds;

    this.registerPolling();
  }

  private registerPolling = () => {
    this.sessionCtx.sessionState.subscribe(({ session }) => {
      if (session?.id) {
        this.poller.startPolling(async (abortSignal) => {
          this.hackAndSlash(session.id, abortSignal);
        }, this.sessionPollingIntervalSeconds * 1000);
      } else {
        this.poller.reset();
      }
    });
  };

  private hackAndSlash = async (
    sessionId: string,
    abortSignal: AbortSignal,
  ): Promise<void> => {
    /**
     * This is a bit of an implicit contract... there are two cases here
     * 1. If there are no messages in state, it means the user selected a previous session from the sessions screen and got routed to the chat,
     *    in this case, we want to show a loading indicator until the initial fetch is done
     * 2. There is a single message in state, which is the optimistically rendered user message,
     *    in this case, we don't want to show a loading indicator
     */
    if (this.messageCtx.state.get().messages.length === 0) {
      this.messageCtx.state.setPartial({ isInitialFetchLoading: true });
    }

    const messages = this.messageCtx.state.get().messages;
    const lastMessageTimestamp =
      messages.length > 0
        ? messages[messages.length - 1]?.timestamp ?? undefined
        : undefined;

    const { data } = await this.api.pollSessionAndHistory({
      sessionId,
      abortSignal,
      lastMessageTimestamp,
    });

    if (data?.session) {
      this.sessionCtx.sessionState.setPartial({ session: data.session });
      this.sessionCtx.setSessions([data.session]);
    }

    if (data?.history && data.history.length > 0) {
      // Get a fresh reference to current messages after the poll is done
      const prevMessages = this.messageCtx.state.get().messages;
      const newMessages = data.history
        .map(this.mapHistoryToMessage)
        .filter(
          (newMsg) =>
            !prevMessages.some((existingMsg) => existingMsg.id === newMsg.id),
        );
      this.messageCtx.state.setPartial({
        messages: [...prevMessages, ...newMessages],
      });
    }

    if (this.messageCtx.state.get().isInitialFetchLoading) {
      this.messageCtx.state.setPartial({ isInitialFetchLoading: false });
    }
  };

  mapHistoryToMessage = (history: MessageDto): MessageType => {
    const commonFields = {
      id: history.publicId,
      timestamp: history.sentAt || '',
      attachments: history.attachments || undefined,
    };

    if (history.sender.kind === 'user') {
      return {
        ...commonFields,
        type: 'FROM_USER',
        content: history.content.text || '',
        deliveredAt: history.sentAt || '',
      };
    }

    if (history.sender.kind === 'agent') {
      return {
        ...commonFields,
        type: 'FROM_AGENT',
        component: 'agent_message',
        data: {
          message: history.content.text || '',
        },
        agent: {
          name: history.sender.name || '',
          avatar: history.sender.avatar || '',
          id: null,
          isAi: false,
        },
      };
    }

    const action =
      history.actionCalls && history.actionCalls.length > 0
        ? history.actionCalls[history.actionCalls.length - 1]
        : undefined;

    return {
      ...commonFields,
      type: 'FROM_BOT',
      component: 'bot_message',
      agent: {
        id: null,
        name: this.config.bot?.name || '',
        isAi: true,
        avatar: this.config.bot?.avatar || '',
      },
      data: {
        message: history.content.text || '',
        action: action
          ? {
              name: action.actionName,
              data: this.extractActionResult(action),
            }
          : undefined,
      },
    };
  };

  extractActionResult = (action: ActionCallDto) => {
    const result = action.result;

    if (result === null) return result;
    if (typeof result !== 'object') return result;

    if (
      'responseBodyText' in result &&
      typeof result.responseBodyText === 'string'
    ) {
      const responseBodyText = result.responseBodyText;
      const parsed = runCatching(() => JSON.parse(responseBodyText)).data;
      if (parsed) return parsed;
    }

    return action.result;
  };
}
