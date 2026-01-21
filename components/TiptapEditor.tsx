"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { cn } from "@/lib/utils";

const TipTapEditor = ({ value, onChange, error }: any) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[200px] h-auto w-full rounded-md border bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 resize-none",
          "dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          error ? "border-destructive ring-destructive" : "border-input",
        ),
      },
    },
  });

  return (
    <Field>
      <FieldLabel>Content</FieldLabel>
      <EditorContent editor={editor} />
      <FieldDescription>Write your notes here</FieldDescription>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};

export default TipTapEditor;
