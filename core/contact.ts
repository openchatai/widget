import { PubSub } from "./PubSub";
import { ApiCaller } from "./api";
import { LoadingState, ErrorState } from "./types/helpers";
import { Dto } from "core/sdk";
import { WidgetConfig } from "core/types/WidgetConfig";

type ContactState = {
  contact: { token: string } | null;
  loading: LoadingState;
  error: ErrorState;
};

export type CreateContactHandlerOptions = {
  api: ApiCaller;
  config: WidgetConfig;
};

export function createContactHandler({
  config,
  api,
}: CreateContactHandlerOptions) {
  const state = new PubSub<ContactState>({
    contact: null,
    loading: { isLoading: false, reason: null },
    error: { hasError: false },
  });

  function shouldCollectData(): boolean {
    const currentState = state.getState();

    if (!currentState.contact?.token && config.collectUserData) {
      return true;
    } else {
      return false;
    }
  }

  async function cleanup() {
    try {
      state.setStatePartial({
        loading: { isLoading: true, reason: "cleaning_up" },
        error: { hasError: false },
      });
      state.setState({
        contact: null,
        loading: { isLoading: false, reason: null },
        error: { hasError: false },
      });

      state.clear();
    } catch (error) {
      state.setStatePartial({
        error: {
          hasError: true,
          message:
            error instanceof Error
              ? error.message
              : "Failed to cleanup contact data",
          code: "CONTACT_CLEANUP_FAILED",
        },
      });
    } finally {
      state.setStatePartial({
        loading: { isLoading: false, reason: null },
      });
    }
  }

  async function createUnauthenticatedContact(
    payload: Dto["CreateContactDto"],
  ): Promise<Dto["WidgetContactTokenResponseDto"] | null> {
    state.setStatePartial({
      loading: { isLoading: true, reason: "creating_unauthenticated_contact" },
      error: { hasError: false },
    });

    const { data, error } = await api.createContact(payload);
    if (data?.token) {
      state.setStatePartial({
        contact: { token: data.token },
      });
      api.setAuthToken(data.token);
      return data;
    }

    if (error) {
      state.setStatePartial({
        loading: { isLoading: false, reason: null },
        error: {
          hasError: true,
          message: error?.message,
          code: "CONTACT_CREATION_FAILED",
        },
      });
    }

    return null;
  }

  return {
    contactState: state,
    shouldCollectData,
    cleanup,
    createUnauthenticatedContact,
  };
}
