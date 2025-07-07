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
        prose prose-xs max-w-none text-text-secondary
        [&_p]:my-0.5 [&_ul]:my-0 [&_ol]:my-0
        [&_ul]:pl-4 [&_ol]:pl-4
        [&_ul]:leading-tight [&_ol]:leading-tight
        [&_li]:my-0 [&_p]:tracking-normal [&_p]:leading-5 [&_p]:text-justify
        [&_ul]:list-disc [&_ol]:list-decimal
        ${className ?? ""}
      `}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}
