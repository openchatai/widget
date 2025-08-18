import type { ApiCaller } from '../api/api-caller';
import type { Dto } from '../api/client';
import type { SafeOmit } from '../types/helpers';
import type { WidgetConfig } from '../types/widget-config';
import { genUuid } from '../utils/uuid';
import type { MessageCtx } from './message.ctx';
import type { SessionCtx } from './session.ctx';

export class CsatCtx {
  private config: WidgetConfig;
  private api: ApiCaller;
  private sessionCtx: SessionCtx;
  private messageCtx: MessageCtx;

  constructor({
    config,
    api,
    sessionCtx,
    messageCtx,
  }: {
    config: WidgetConfig;
    api: ApiCaller;
    sessionCtx: SessionCtx;
    messageCtx: MessageCtx;
  }) {
    this.config = config;
    this.api = api;
    this.sessionCtx = sessionCtx;
    this.messageCtx = messageCtx;
  }

  submitCsat = async (
    body: Pick<Dto['WidgetSubmitCsatInputDto'], 'score' | 'feedback'>,
  ) => {
    const currentSessionId = this.sessionCtx.sessionState.get().session?.id;
    if (!currentSessionId) {
      return { data: null, error: 'No session id found' };
    }

    const uuid = genUuid();
    this.messageCtx.state.setPartial({
      messages: [
        ...this.messageCtx.state.get().messages,
        {
          id: uuid,
          type: 'SYSTEM',
          subtype: 'csat_submitted',
          timestamp: new Date().toISOString(),
          data: {
            payload: {
              score: body.score,
              feedback: body.feedback,
            },
          },
        },
      ],
    });

    const { data, error } = await this.api.submitCsat({
      ...body,
      system_message_uuid: uuid,
      session_id: currentSessionId,
    });
    return { data, error };
  };
}
