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
    <Link href={`/notes/${note.slug}`}>
      <Card className="flex flex-col h-full">
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
    </Link>
  );
};
