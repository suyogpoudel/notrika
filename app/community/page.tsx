import { db } from "@/db/drizzle";
import { note } from "@/db/schemas/note-schema";
import { desc, eq } from "drizzle-orm";
import NoteDisplayFull from "../notes/_components/note-display-full";
import { user } from "@/db/schemas/auth-schema";

const Community = async () => {
  const notes = await db
    .select()
    .from(note)
    .where(eq(note.isPublic, true))
    .orderBy(desc(note.createdAt));

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-3xl font-semibold mb-10">Community</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(async (note) => {
          const author = await db.query.user.findFirst({
            where: eq(user.id, note.userId),
          });
          return (
            <NoteDisplayFull
              key={note.id}
              note={note}
              authorName={author?.username || "Unknown"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Community;
