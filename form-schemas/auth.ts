import z from "zod";

export const signUpSchema = z.object({
    name: z.string(),
    email: z.email(),
    username: z.string().regex(
        /^[a-zA-Z0-9._]+$/,
        "Username may only contain letters, numbers, underscores, and periods"
    ).min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
})

export type signUpData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    identifier: z.string().refine(value => {
        if (value.includes('@')) {
            return z.email().safeParse(value);
        } else {
            return true;
        }
    }, {message: 'Invalid email or username'}),
    password: z.string(),
})

export type signInData = z.infer<typeof signInSchema>;
