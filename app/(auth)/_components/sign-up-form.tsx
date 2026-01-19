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
import { signUpData, signUpSchema } from "@/form-schemas/auth";
import { signInGithub, signInGoogle, signUpEmail } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<signUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignUp = async (data: signUpData) => {
    const result = await signUpEmail(data);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Signed up successfully");
      router.push("/notes");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSignUp)}
      className="flex flex-col justify-center items-center"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="John Doe"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                placeholder="johndoe@example.com"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                {...field}
                id="username"
                placeholder="johndoe_1"
                type="text"
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
                placeholder="Enter a secure password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                {...field}
                id="confirmPassword"
                placeholder="Confirm your password"
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
            {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>
        <Field>
          <Button
            variant="outline"
            onClick={signInGoogle}
          >
            Login with Google
          </Button>
        </Field>

        <Field>
          <Button
            variant="outline"
            onClick={signInGithub}
          >
            Login with Github
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4"
          >
            Sign In
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};
export default SignUpForm;
