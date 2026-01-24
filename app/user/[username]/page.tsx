import { db } from "@/db/drizzle";
import { user } from "@/db/schemas/auth-schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import UserNotes from "../_components/user-notes";
import Image from "next/image";
import defaultImage from "@/public/user-profile.jpg";

const User = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;

  const requiredUser = await db.query.user.findFirst({
    where: eq(user.username, username),
  });

  if (!requiredUser) {
    notFound();
  }

  return (
    <div className="flex flex-col">
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

      <UserNotes userId={requiredUser.id} />
    </div>
  );
};

export default User;
