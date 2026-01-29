"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateWithOrdinal, timeAgo } from "@/functions/note-display";
import { useReadOnlyEditor } from "@/hooks/useReadOnlyEditor";
import { EditorContent } from "@tiptap/react";
import { ClockIcon } from "lucide-react";
import Link from "next/link";

interface NoteDisplayFullProps {
  note: {
    title: string;
    content: string;
    slug: string;
    isPublic: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  authorName: string;
}

const NoteDisplayFull = ({ note, authorName }: NoteDisplayFullProps) => {
  const editor = useReadOnlyEditor(note.content);

  const createdAt = new Date(note.createdAt);

  const formattedDate = formatDateWithOrdinal(createdAt);

  const timePassed = timeAgo(createdAt);

  if (!editor) {
    return <div>Loading note...</div>;
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>
          {note.title} -{" "}
          <Link
            href={`/user/${authorName}`}
            className="text-muted-foreground"
          >
            {authorName}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <EditorContent editor={editor} />
      </CardContent>
      <CardFooter className="text-muted-foreground flex gap-2 items-center">
        <ClockIcon />
        {formattedDate} ({timePassed})
      </CardFooter>
    </Card>
  );
};

export default NoteDisplayFull;
