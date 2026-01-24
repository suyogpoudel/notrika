import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const useReadOnlyEditor = (content: string) => {
  return useEditor({
    extensions: [StarterKit],
    content: JSON.parse(content),
    editable: false,
    immediatelyRender: false,
  });
};
