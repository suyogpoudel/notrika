import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Notes = async () => {
  const session = await getSession();

  if (!session) redirect("/sign-in");

  return <div>Notes</div>;
};

export default Notes;
