import { vi } from "vitest";
import type { ApiCaller } from "../api/api-caller";
import { genUuid } from "./uuid";

export const TestUtils = {
  mock: {
    ApiCaller: {
      createSession(target, returnValue) {
        target.prototype.createSession = vi
          .fn(target.prototype.createSession)
          .mockResolvedValue({
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
          });
      },
      createUnverifiedContact(target, returnValue) {
        target.prototype.createUnverifiedContact = vi
          .fn(target.prototype.createUnverifiedContact)
          .mockResolvedValue({
            response: new Response(),
            data: {
              token: "some-token",
              ...returnValue?.data,
            },
          });
      },
      getSession(target, returnValue) {
        target.prototype.getSession = vi
          .fn(target.prototype.getSession)
          .mockResolvedValue({
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
          });
      },
      getSessionHistory(target, returnValue) {
        target.prototype.getSessionHistory = vi
          .fn(target.prototype.getSessionHistory)
          .mockResolvedValue({
            response: new Response(),
            data: [...(returnValue?.data || [])],
          });
      },
      getSessions(target, returnValue) {
        target.prototype.getSessions = vi
          .fn(target.prototype.getSessions)
          .mockResolvedValue({
            response: new Response(),
            data: { items: [], next: null, ...returnValue?.data },
          });
      },
      sendMessage(target, returnValue) {
        target.prototype.sendMessage = vi
          .fn(target.prototype.sendMessage)
          .mockResolvedValue({
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
          });
      },
      setAuthToken(target, returnValue) {
        target.prototype.setAuthToken = vi.fn();
      },
      uploadFile(target, returnValue) {
        target.prototype.uploadFile = vi
          .fn(target.prototype.uploadFile)
          .mockResolvedValue({
            fileName: "some-file-name",
            fileUrl: "some-file-url",
          });
      },
      vote(target, returnValue) {
        target.prototype.vote = vi.fn(target.prototype.vote).mockResolvedValue({
          response: new Response(),
          data: {
            messagePublicId: genUuid(),
            success: true,
            ...returnValue?.data,
          },
        });
      },
      widgetPrelude(target, returnValue) {
        target.prototype.widgetPrelude = vi
          .fn(target.prototype.widgetPrelude)
          .mockResolvedValue({
            response: new Response(),
            data: {
              aiEnabled: true,
              initialQuestions: [],
              officeHours: {},
              officeHoursTimezone: null,
              organizationName: "some-org-name",
              ...returnValue?.data,
            },
          });
      },
    } satisfies {
      [K in keyof ApiCaller]: (
        target: typeof ApiCaller,
        returnValue?: Partial<Awaited<ReturnType<ApiCaller[K]>>>,
      ) => void;
    },
  },
};
