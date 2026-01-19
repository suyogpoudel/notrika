import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import SignInForm from "@/app/(auth)/_components/sign-in-form";

const SignIn = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-10">
            <Card className="w-[80%] md:w-[50%] lg:w-[35%]">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Log in to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInForm/>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </div>
    )
}
export default SignIn
