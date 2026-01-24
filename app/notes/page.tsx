import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { note } from "@/db/schemas/note-schema";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { NoteDisplay } from "./_components/note-display";
import Image from "next/image";
import { user } from "@/db/schemas/auth-schema";
import defaultImage from "@/public/user-profile.jpg";
import { PenIcon, PlusIcon } from "lucide-react";

const Notes = async () => {
  const session = await getSession();

  if (!session) redirect("/sign-in");

  const notes = await db
    .select()
    .from(note)
    .where(eq(note.userId, session.user.id));

  const requiredUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!requiredUser) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-10">
        <div className="flex items-center gap-4">
          <Image
            src={requiredUser.image ? requiredUser.image : defaultImage}
            alt={`Profile picture of user ${requiredUser.username}`}
            width={50}
            height={50}
            className="rounded-full object-cover shadow-lg"
          />
          <div className="flex gap-3 items-baseline">
            <h1 className="text-2xl">{requiredUser.name}</h1>
            <p className="text-muted-foreground">@{requiredUser.username}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            size="lg"
            variant="outline"
          >
            <Link href="/edit-profile">
              <PenIcon />
              Edit Profile
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
          >
            <Link href="/notes/new">
              <PlusIcon />
              New Note
            </Link>
          </Button>
        </div>
      </div>

      <div>
        {notes.length === 0 ? (
          <p className="mt-4 text-gray-500">You have no notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
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
