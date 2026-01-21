import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/app/(auth)/_components/sign-up-form";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <Card className="w-[80%] md:w-[50%] lg:w-[35%]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account if you don&apos;t have one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default SignUp;
