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

function formatDateWithOrdinal(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb...
  const year = date.getFullYear();

  let ordinal = "th";
  if (day % 10 === 1 && day !== 11) ordinal = "st";
  else if (day % 10 === 2 && day !== 12) ordinal = "nd";
  else if (day % 10 === 3 && day !== 13) ordinal = "rd";

  return `${day}${ordinal} ${month}, ${year}`;
}

function timeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
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
      <CardFooter className="text-muted-foreground">
        {formattedDate} ({timePassed})
      </CardFooter>
    </Card>
  );
};

export default NoteDisplayFull;
