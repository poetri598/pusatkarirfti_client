"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";

import { TextBold, TextItalic, TextUnderline, TextalignLeft, TextalignCenter, TextalignRight } from "iconsax-react";

import { Button } from "@heroui/react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Highlight,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: placeholder || "Tulis sesuatu...",
      }),
      CharacterCount.configure({ limit: 10000 }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const ToolbarButton = ({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) => (
    <Button size="sm" variant={active ? "solid" : "bordered"} onPress={onClick} className="flex items-center gap-1 px-3 py-2 text-[10px] sm:text-xs md:text-sm rounded-lg text-primary-primary">
      {icon}
      <span>{label}</span>
    </Button>
  );

  const toolbarItems = [
    {
      icon: <TextBold size={16} color="currentColor" />,
      label: "Bold",
      isActive: () => editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: <TextItalic size={16} color="currentColor" />,
      label: "Italic",
      isActive: () => editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: <TextUnderline size={16} color="currentColor" />,
      label: "Underline",
      isActive: () => editor.isActive("underline"),
      command: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: <span className="font-bold text-sm">H1</span>,
      label: "Heading 1",
      isActive: () => editor.isActive("heading", { level: 1 }),
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: <span className="font-bold text-sm">H2</span>,
      label: "Heading 2",
      isActive: () => editor.isActive("heading", { level: 2 }),
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <span className="font-bold text-sm">H3</span>,
      label: "Heading 3",
      isActive: () => editor.isActive("heading", { level: 3 }),
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: <TextalignLeft size={16} color="currentColor" />,
      label: "Align Kiri",
      isActive: () => editor.isActive({ textAlign: "left" }),
      command: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      icon: <TextalignCenter size={16} color="currentColor" />,
      label: "Align Tengah",
      isActive: () => editor.isActive({ textAlign: "center" }),
      command: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      icon: <TextalignRight size={16} color="currentColor" />,
      label: "Align Kanan",
      isActive: () => editor.isActive({ textAlign: "right" }),
      command: () => editor.chain().focus().setTextAlign("right").run(),
    },
    {
      icon: <span className="text-lg font-bold">━</span>,
      label: "HR",
      isActive: () => false,
      command: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: <span className="font-bold text-lg">1.</span>,
      label: "Number List",
      isActive: () => editor.isActive("orderedList"),
      command: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <span className="font-bold text-lg">•</span>,
      label: "Bullet List",
      isActive: () => editor.isActive("bulletList"),
      command: () => editor.chain().focus().toggleBulletList().run(),
    },
  ];

  return (
    <div className="w-full max-w-full border rounded-xl px-4 py-4 space-y-4 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        {toolbarItems.map((item) => (
          <ToolbarButton key={item.label} icon={item.icon} label={item.label} active={item.isActive?.()} onClick={item.command} />
        ))}
      </div>

      {/* Editor Area */}
      <EditorContent
        editor={editor}
        className="
          prose w-full max-w-none
          text-xs
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
          min-h-[200px] border-2 border-default-200 rounded-medium focus:outline-none
        "
      />

      {/* Footer */}
      <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 text-right">{editor.storage.characterCount?.characters()} karakter</p>
    </div>
  );
}
