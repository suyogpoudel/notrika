import { NoteDisplay } from "@/app/notes/_components/note-display";
import { db } from "@/db/drizzle";
import { note } from "@/db/schemas/note-schema";
import { getSession } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

interface UserNoteProps {
  userId: string;
}

const UserNotes = async (props: UserNoteProps) => {
  const { userId } = props;
  const session = await getSession();

  if (!session) redirect("/sign-in");

  const isOwner = session.user.id === userId;

  const notes = await db.query.note.findMany({
    where: isOwner
      ? eq(note.userId, userId)
      : and(eq(note.userId, userId), eq(note.isPublic, true)),
  });

  if (!notes) {
    return <div>No notes yet :( </div>;
  }

  return (
    <div className="flex flex-col">
      <p className="text-right text-muted-foreground mb-2">
        {notes.length} Notes
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteDisplay
            key={note.id}
            note={note}
          />
        ))}
      </div>
    </div>
  );
};

export default UserNotes;
