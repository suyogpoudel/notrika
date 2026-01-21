import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateNoteForm from "../_components/create-note-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const NewNote = async () => {
  const session = await getSession();

  if (!session) redirect("/sign-in");

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <Card className="w-[80%] md:w-[50%] lg:w-[35%]">
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardTitle>Create a new note here.</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateNoteForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewNote;
