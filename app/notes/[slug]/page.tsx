import { db } from "@/db/drizzle";
import { note } from "@/db/schemas/note-schema";
import { eq } from "drizzle-orm";
import { NoteDisplay } from "../_components/note-display";

interface NotePageProps {
  params: { slug: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const noteData = await db.query.note.findFirst({
    where: eq(note.slug, params.slug),
  });

  if (!noteData) return <p>Note not found</p>;

  return <NoteDisplay note={noteData} />;
}
