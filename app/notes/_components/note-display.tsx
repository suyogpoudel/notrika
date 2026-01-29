"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateWithOrdinal, timeAgo } from "@/functions/note-display";
import { useReadOnlyEditor } from "@/hooks/useReadOnlyEditor";
import { EditorContent } from "@tiptap/react";
import { ClockIcon, GlobeIcon, LockIcon } from "lucide-react";
import Link from "next/link";

interface NoteDisplayProps {
  note: {
    title: string;
    content: string;
    slug: string;
    isPublic: boolean;
    createdAt: Date;
  };
}

export const VisibilityIcon = ({ isPublic }: { isPublic: boolean }) => {
  return isPublic ? <GlobeIcon /> : <LockIcon />;
};

export const NoteDisplay = ({ note }: NoteDisplayProps) => {
  const editor = useReadOnlyEditor(note.content);

  const createdAt = new Date(note.createdAt);

  const formattedDate = formatDateWithOrdinal(createdAt);

  const timePassed = timeAgo(createdAt);

  const visibility = note.isPublic ? "Public" : "Private";

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl active:shadow-sm transition-all duration-200"
    >
      <Card className="flex flex-col h-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{note.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-muted-foreground scale-90">
            <VisibilityIcon isPublic={note.isPublic} />
            {visibility}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <EditorContent editor={editor} />
        </CardContent>
        <CardFooter className="text-muted-foreground flex gap-2 items-center">
          <ClockIcon />
          {formattedDate} ({timePassed})
        </CardFooter>
      </Card>
    </Link>
  );
};
