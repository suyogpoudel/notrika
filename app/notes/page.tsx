import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { note } from "@/db/schemas/note-schema";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { NoteDisplay } from "./_components/note-display";

const Notes = async () => {
  const session = await getSession();

  if (!session) redirect("/sign-in");

  const notes = await db
    .select()
    .from(note)
    .where(eq(note.userId, session.user.id));

  return (
    <div className="w-full flex flex-col items-center mt-10 space-y-6">
      <Button
        asChild
        size="lg"
      >
        <Link href="/notes/new">New Note</Link>
      </Button>

      <div className="w-full px-10">
        {notes.length === 0 ? (
          <p className="mt-4 text-gray-500">You have no notes yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {notes.map((note) => (
              <NoteDisplay
                key={note.id}
                note={note}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
