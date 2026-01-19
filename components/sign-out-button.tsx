"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const SignOutButton = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <Button
      variant="destructive"
      onClick={signOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
