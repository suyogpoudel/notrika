import { db } from "@/db/drizzle";
import { NoteDisplay } from "../notes/_components/note-display";
import { note } from "@/db/schemas/note-schema";
import { desc, eq } from "drizzle-orm";

const Community = async () => {
  const notes = await db
    .select()
    .from(note)
    .where(eq(note.isPublic, true))
    .orderBy(desc(note.createdAt));

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

export default Community;
