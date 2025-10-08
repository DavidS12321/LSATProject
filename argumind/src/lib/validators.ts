import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

const signUpFields = {
  name: z.string().min(2, "Please enter your full name"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[a-z]/, "Include at least one lowercase letter")
    .regex(/[0-9]/, "Include at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password")
};

export const signUpSchema = z
  .object(signUpFields)
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match"
  });

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;

export const registerUserSchema = z.object({
  name: signUpFields.name,
  email: signUpFields.email,
  password: signUpFields.password
  name: signUpSchema.shape.name,
  email: signUpSchema.shape.email,
  password: signUpSchema.shape.password
});

export type RegisterUserValues = z.infer<typeof registerUserSchema>;
