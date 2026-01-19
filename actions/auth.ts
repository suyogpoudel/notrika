import { signUpData } from "@/form-schemas/auth";
import { authClient } from "@/lib/auth-client";

export async function signUpEmail(
  data: signUpData,
): Promise<{ success: boolean; message?: string }> {
  try {
    await authClient.signUp.email(data);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Error signing up",
    };
  }
}

export async function signInEmail(data: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    await authClient.signIn.email(data);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Error signing up",
    };
  }
}

export async function signInUsername(data: {
  username: string;
  password: string;
}): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    await authClient.signIn.username(data);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Error signing up",
    };
  }
}

export const signInGithub = async () => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/notes",
  });
};

export const signInGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/notes",
  });
};
