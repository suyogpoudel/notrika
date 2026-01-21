"use client";

import { createNote } from "@/actions/note";
import TiptapEditor from "@/components/TiptapEditor";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { noteData, noteSchema } from "@/form-schemas/note";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateNoteForm = () => {
  const router = useRouter();

  const form = useForm<noteData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: { type: "doc", content: [] },
      isPublic: true,
    },
  });

  const onCreateNote = async (data: noteData) => {
    try {
      await createNote(data);
      toast.success("Note created successfully!");

      router.push(`/notes`);
    } catch (error) {
      toast.error("Failed to create note. Please try again.");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onCreateNote)}
      className="flex flex-col justify-center items-center"
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...field}
                id="title"
                placeholder="Enter your note title"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <TiptapEditor
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="isPublic"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <FieldLabel htmlFor="isPublic">Make note public?</FieldLabel>
              <Switch
                id="isPublic"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default CreateNoteForm;
