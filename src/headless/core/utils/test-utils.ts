import { vi } from "vitest";
import type { ApiCaller } from "../api/api-caller";
import { genUuid } from "./uuid";

export const TestUtils = {
  mock: {
    ApiCaller: {
      createSession(target, returnValue) {
        target.prototype.createSession = vi.fn().mockReturnValue({
          response: new Response(),
          data: {
            id: genUuid(),
            assignee: { kind: "ai", name: null, avatarUrl: null },
            channel: "",
            createdAt: new Date().toISOString(),
            isHandedOff: false,
            isOpened: true,
            isVerified: false,
            lastMessage: "",
            updatedAt: new Date().toISOString(),
            ...returnValue?.data,
          },
        } satisfies typeof returnValue);
      },
      createUnverifiedContact(target, returnValue) {
        target.prototype.createUnverifiedContact = vi.fn().mockReturnValue({
          response: new Response(),
          data: {
            token: "some-token",
            ...returnValue?.data,
          },
        } satisfies typeof returnValue);
      },
      getSession(target, returnValue) {
        target.prototype.getSession = vi.fn().mockReturnValue({
          response: new Response(),
          data: {
            id: genUuid(),
            assignee: { kind: "ai", name: null, avatarUrl: null },
            channel: "",
            createdAt: new Date().toISOString(),
            isHandedOff: false,
            isOpened: true,
            isVerified: false,
            lastMessage: "",
            updatedAt: new Date().toISOString(),
            ...returnValue?.data,
          },
        } satisfies typeof returnValue);
      },
      getSessionHistory(target, returnValue) {
        target.prototype.getSessionHistory = vi.fn().mockReturnValue({
          response: new Response(),
          data: [...(returnValue?.data || [])],
        } satisfies typeof returnValue);
      },
      getSessions(target, returnValue) {
        target.prototype.getSessions = vi.fn().mockReturnValue({
          response: new Response(),
          data: { items: [], next: null, ...returnValue?.data },
        } satisfies typeof returnValue);
      },
      sendMessage(target, returnValue) {
        target.prototype.sendMessage = vi.fn().mockReturnValue({
          response: new Response(),
          data:
            returnValue?.data?.success === false
              ? {
                  success: false,
                  error: {
                    code: "some-code",
                    message: "some-message",
                    ...returnValue?.data?.error,
                  },
                }
              : {
                  success: true,
                  autopilotResponse: {
                    type: "text",
                    value: {
                      error: false,
                      content: "some-reply",
                    },
                    id: genUuid(),
                    mightSolveUserIssue: false,
                  },
                  ...returnValue?.data,
                },
        } satisfies typeof returnValue);
      },
      setAuthToken(target, returnValue) {
        target.prototype.setAuthToken = vi.fn();
      },
      uploadFile(target, returnValue) {
        target.prototype.uploadFile = vi.fn().mockReturnValue({
          fileName: "some-file-name",
          fileUrl: "some-file-url",
        } satisfies typeof returnValue);
      },
      vote(target, returnValue) {
        target.prototype.vote = vi.fn().mockReturnValue({
          response: new Response(),
          data: {
            messagePublicId: genUuid(),
            success: true,
            ...returnValue?.data,
          },
        } satisfies typeof returnValue);
      },
      widgetPrelude(target, returnValue) {
        target.prototype.widgetPrelude = vi.fn().mockReturnValue({
          response: new Response(),
          data: {
            aiEnabled: true,
            initialQuestions: [],
            officeHours: {},
            officeHoursTimezone: null,
            organizationName: "some-org-name",
            ...returnValue?.data,
          },
        } satisfies typeof returnValue);
      },
    } satisfies {
      [K in keyof ApiCaller]: (
        target: typeof ApiCaller,
        returnValue?: Partial<Awaited<ReturnType<ApiCaller[K]>>>,
      ) => void;
    },
  },
};
