"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReadOnlyEditor } from "@/hooks/useReadOnlyEditor";
import { EditorContent } from "@tiptap/react";
import Link from "next/link";

interface NoteDisplayProps {
  note: {
    title: string;
    content: string;
    slug: string;
    isPublic: boolean;
  };
}

export const NoteDisplay = ({ note }: NoteDisplayProps) => {
  const editor = useReadOnlyEditor(note.content);

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl active:shadow-sm transition-all duration-200"
    >
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <EditorContent editor={editor} />
        </CardContent>
        <CardFooter
          className={`${note.isPublic ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
        >
          {note.isPublic ? "Public" : "Private"}
        </CardFooter>
      </Card>
    </Link>
  );
};
