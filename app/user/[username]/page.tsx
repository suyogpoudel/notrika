import { db } from "@/db/drizzle";
import { user } from "@/db/schemas/auth-schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const User = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;

  const requiredUser = await db.query.user.findFirst({
    where: eq(user.username, username),
  });

  if (!requiredUser) {
    notFound();
  }

  return <div>User</div>;
};

export default User;
