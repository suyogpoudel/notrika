import { db } from "@/db/drizzle";
import { note } from "@/db/schemas/note-schema";
import { eq } from "drizzle-orm";
import NoteDisplayFull from "../_components/note-display-full";
import { user } from "@/db/schemas/auth-schema";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const NotePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const session = await getSession();

  if (!session) redirect("/sign-in");

  const requiredNote = await db.query.note.findFirst({
    where: eq(note.slug, slug),
  });

  if (!requiredNote) {
    return <p>Note not found</p>;
  }

  const author = await db.query.user.findFirst({
    where: eq(user.id, requiredNote.userId),
  });

  if (session.user.id !== author?.id) {
    return <div>You are not authorized to see this note</div>;
  }

  return (
    <NoteDisplayFull
      note={requiredNote}
      authorName={author?.username || "Unknown"}
    />
  );
};

export default NotePage;
