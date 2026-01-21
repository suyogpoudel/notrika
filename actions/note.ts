"use server";

import { db } from "@/db/drizzle";
import { note } from "@/db/schemas/note-schema";
import { noteSchema } from "@/form-schemas/note";
import { getSession } from "@/lib/auth";

// generate a short random slug
function generateSlug(length = 8) {
  return crypto.randomUUID().slice(0, length); // e.g., 'a1b2c3d4'
}

export const createNote = async (input: unknown) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const data = noteSchema.parse(input);

  const slug = generateSlug();

  await db.insert(note).values({
    title: data.title,
    content: JSON.stringify(data.content),
    slug,
    isPublic: data.isPublic,
    userId: session.user.id,
  });
};
