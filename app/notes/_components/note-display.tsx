"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface NoteDisplayProps {
  note: {
    title: string;
    content: string;
    isPublic: boolean;
  };
}

export const NoteDisplay = ({ note }: NoteDisplayProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: JSON.parse(note.content),
    editable: false,
    immediatelyRender: false,
  });

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <EditorContent editor={editor} />
      </CardContent>
      <CardFooter
        className={`${note.isPublic ? "text-green-400 dark:text-green-500" : "text-red-400 dark:text-red-500"}`}
      >
        {note.isPublic ? "Public" : "Private"}
      </CardFooter>
    </Card>
  );
};
