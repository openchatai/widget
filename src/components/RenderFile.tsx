import React from "react";
import { ChatAttachmentType } from "@core/types";

type Props = {
  attachment: ChatAttachmentType;
};

export function RenderAttachment({ attachment }: Props) {
  const { name, size, type, url } = attachment;

  const isImage = type.startsWith("image/");
  const isVideo = type.startsWith("video/");
  const isAudio = type.startsWith("audio/");

  return (
    <div className="size-fit gap-2 border shrink-0 rounded-xl overflow-hidden">
      {isImage && (
        <img loading="lazy" src={url} className="object-cover size-16" />
      )}
      {isVideo && (
        <video controls>
          <source src={url} type={type} />
          Your browser does not support the video tag.
        </video>
      )}
      {isAudio && (
        <audio controls className="w-full mt-2 rounded-md border">
          <source src={url} type={type} />
          Your browser does not support the audio tag.
        </audio>
      )}
      {!isImage && !isVideo && !isAudio && (
        <div className="flex items-center gap-2 p-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 line-clamp-2 underline hover:text-blue-600"
          >
            {name}
          </a>
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {(size / 1024).toFixed(2)} KB
          </span>
        </div>
      )}
    </div>
  );
}
