import { Dto } from "@core/sdk";

export type WidgetVoteResponseDto = Dto["WidgetVoteResponseDto"];
export type HandleContactMessageOutputSchema =
  Dto["HandleContactMessageOutputDto"];
export type SendChatDto = Dto["HttpChatInputDto"];
export type WidgetSessionDto = Dto["WidgetSessionDto"];
export type WidgetHistoryDto = Dto["WidgetHistoryDto"];
export type WidgetPreludeDto = Dto["WidgetPreludeDto"];
export type WidgetVoteDto = Dto["WidgetVoteDto"];
export type ChatAttachmentType = NonNullable<
  Dto["WidgetHistoryDto"]["attachments"]
>[number];

export type MessageTypeU = Dto["WidgetHistoryDto"]["type"];
