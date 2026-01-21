import z from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  content: z
    .object({
      type: z.literal("doc"),
      content: z.array(z.any()).optional(),
    })
    .refine(
      (doc) =>
        doc.content?.some(
          (n) =>
            n.type === "paragraph" && n.content?.some((c) => c.text?.trim()),
        ),
      "Note cannot be empty",
    ),

  isPublic: z.boolean(),
});

export type noteData = z.infer<typeof noteSchema>;
