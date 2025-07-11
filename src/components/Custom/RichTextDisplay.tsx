// src/components/Custom/RichTextDisplay.tsx

import React from "react";
import DOMPurify from "dompurify";

type Props = {
  html: string;
  className?: string;
};

export default function RichTextDisplay({ html, className }: Props) {
  return (
    <div
      className={`
       prose w-full max-w-none
          text-xs
          text-text-secondary
          leading-normal

          [&_h1]:text-lg sm:[&_h1]:text-xl md:[&_h1]:text-2xl lg:[&_h1]:text-3xl
          [&_h2]:text-base sm:[&_h2]:text-lg md:[&_h2]:text-xl lg:[&_h2]:text-2xl
          [&_h3]:text-sm sm:[&_h3]:text-base md:[&_h3]:text-lg lg:[&_h3]:text-xl

          [&_h1]:leading-snug [&_h2]:leading-snug [&_h3]:leading-snug
          [&_p]:my-0.5 [&_ul]:my-0 [&_ol]:my-0
          [&_ul]:pl-4 [&_ol]:pl-4
          [&_ul]:leading-tight [&_ol]:leading-tight
          [&_li]:my-0 [&_p]:tracking-normal [&_p]:leading-5 [&_p]:text-justify
          [&_ul]:list-disc [&_ol]:list-decimal
         focus:outline-none
        ${className ?? ""}
      `}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}
