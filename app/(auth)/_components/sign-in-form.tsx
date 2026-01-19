"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signInData, signInSchema } from "@/form-schemas/auth";
import {
  signInEmail,
  signInGithub,
  signInGoogle,
  signInUsername,
} from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<signInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSignIn = async (data: signInData) => {
    const isEmail = data.identifier.includes("@");

    const result = isEmail
      ? await signInEmail({
          email: data.identifier,
          password: data.password,
        })
      : await signInUsername({
          username: data.identifier,
          password: data.password,
        });

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Signed in successfully");
      router.push("/notes");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSignIn)}
      className="flex flex-col justify-center items-center"
    >
      <FieldGroup>
        <Controller
          name="identifier"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="identifier">Email or Username</FieldLabel>
              <Input
                {...field}
                id="identifier"
                placeholder="Enter your email or username"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                {...field}
                id="password"
                placeholder="Enter your password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>

        <Field>
          <Button
            variant="outline"
            onClick={async () => {
              const result = await signInGoogle();
              if (result?.success === false) {
                toast.error(result.error);
              }
            }}
          >
            Login with Google
          </Button>
        </Field>

        <Field>
          <Button
            variant="outline"
            onClick={async () => {
              const result = await signInGithub();
              if (result?.success === false) {
                toast.error(result.error);
              }
            }}
          >
            Login with Github
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="underline underline-offset-4"
          >
            Sign Up
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};
export default SignInForm;
