import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { toast } from "sonner";
import defaultImage from "@/public/user-profile.jpg";
import Image from "next/image";
import Link from "next/link";

const Users = async () => {
  const users = await db.select().from(user);

  if (!users) {
    toast.error("Error fetching users");
    throw new Error("Error fetching users");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Link
          href={`/user/${user.username}`}
          className="hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl active:shadow-sm transition-all duration-200"
        >
          <Card className="h-full w-full">
            <CardContent className="flex items-center gap-4">
              <Image
                src={user.image ? user.image : defaultImage}
                alt={`Profile picture of user ${user.username}`}
                width={45}
                height={45}
                className="rounded-full object-cover shadow-lg"
              />
              <div className="flex gap-3 items-baseline">
                <h1 className="text-2xl">{user.name}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Users;
