import type { Dto } from "../api/client";

export type VoteInputDto = Dto["WidgetVoteDto"];
export type VoteOutputDto = Dto["WidgetVoteResponseDto"];

export type SendMessageDto = Dto["HttpChatInputDto"];
export type SendMessageOutputDto = Dto["HandleContactMessageOutputDto"];

export type SessionDto = Dto["WidgetSessionDto"];
export type MessageDto = Dto["WidgetHistoryDto"];
export type PreludeDto = Dto["WidgetPreludeDto"];
export type MessageAttachmentType = NonNullable<
  Dto["WidgetHistoryDto"]["attachments"]
>[number];
