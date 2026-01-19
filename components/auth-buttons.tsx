import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/auth";
import SignOutButton from "./sign-out-button";

const AuthButtons = async () => {
  const session = await getSession();
  return (
    <div>
      {session ? (
        <SignOutButton />
      ) : (
        <div className="flex gap-2">
          <Button
            asChild
            size="lg"
            variant="secondary"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>

          <Button
            asChild
            size="lg"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
