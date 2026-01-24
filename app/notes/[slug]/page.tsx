import { db } from "@/db/drizzle";
import { note } from "@/db/schemas/note-schema";
import { eq } from "drizzle-orm";
import NoteDisplayFull from "../_components/note-display-full";
import { user } from "@/db/schemas/auth-schema";

const NotePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const requiredNote = await db.query.note.findFirst({
    where: eq(note.slug, slug),
  });

  if (!requiredNote) {
    return <p>Note not found</p>;
  }

  const author = await db.query.user.findFirst({
    where: eq(user.id, requiredNote.userId),
  });

  return (
    <NoteDisplayFull
      note={requiredNote}
      authorName={author?.username || "Unknown"}
    />
  );
};

export default NotePage;
