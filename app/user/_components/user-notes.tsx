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

  const notes = await db
    .select()
    .from(note)
    .where(and(eq(note.userId, userId), eq(note.isPublic, true)));

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
      {session.user.id === userId && (
        <p className="text-center text-muted-foreground mt-10">
          Only showing your public notes. Go to{" "}
          <Link
            href="/notes"
            className="text-primary  hover:underline underline-offset-4"
          >
            Notes
          </Link>{" "}
          page to see all.
        </p>
      )}
    </div>
  );
};

export default UserNotes;
