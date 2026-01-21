import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const note = pgTable("note", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull().unique(),

  isPublic: boolean("is_public").default(true).notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
