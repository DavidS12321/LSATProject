"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema, type SignInValues, type SignUpValues } from "@/lib/validators";
import { cn } from "@/lib/utils";
import { GoogleSignInButton } from "./google-button";

const formTitles = {
  signIn: "Welcome back",
  signUp: "Create your account"
} as const;

type Mode = keyof typeof formTitles;

type BaseFormValues = SignInValues & { name?: string; confirmPassword?: string };

type AuthFormProps = {
  mode?: Mode;
};

export function AuthForm({ mode: initialMode = "signIn" }: AuthFormProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const schema = useMemo(() => (mode === "signIn" ? signInSchema : signUpSchema), [mode]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BaseFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur"
  });

  useEffect(() => {
    reset();
    setError(null);
    setSuccess(null);
  }, [mode, reset]);

  const onSubmit = async (values: BaseFormValues) => {
    setError(null);
    setSuccess(null);

    const parsed = schema.parse(values);

    try {
      if (mode === "signUp") {
        const { email, password, name } = parsed as SignUpValues;

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(data?.error ?? "Unable to create your account.");
        }

        setSuccess("Account created! Signing you in...");
      }

      const { email, password } = parsed as SignInValues;

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        const message =
          signInResult.error === "CredentialsSignin"
            ? "Invalid email or password."
            : signInResult.error;
        throw new Error(message);
      }

      setSuccess(mode === "signIn" ? "Welcome back!" : "You're all set—welcome aboard!");
      router.refresh();
    } catch (submissionError) {
      const message =
        submissionError instanceof Error && submissionError.message
          ? submissionError.message
          : "Something went wrong. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-800/60 bg-slate-950/60 p-8 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary-300/80">Argumind</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{formTitles[mode]}</h2>
          <p className="mt-1 text-sm text-slate-400">
            {mode === "signIn" ? "Sign in to access your personalized LSAT prep." : "Start building smarter logic with Argumind."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
          className="text-sm font-medium text-primary-300 hover:text-primary-200"
        >
          {mode === "signIn" ? "Need an account?" : "Have an account?"}
        </button>
      </div>

      <div className="mt-8 space-y-3">
        <GoogleSignInButton />
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500">
          <span className="h-px flex-1 bg-slate-800" />
          <span>Or</span>
          <span className="h-px flex-1 bg-slate-800" />
        </div>
      </div>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        {error ? <p className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
        {success ? <p className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p> : null}

        {mode === "signUp" && (
          <div>
            <label className="label" htmlFor="name">
              Full name
            </label>
            <input id="name" type="text" autoComplete="name" className="input mt-1" {...register("name" as const)} />
            {errors?.name && <p className="error-text">{errors.name.message}</p>}
          </div>
        )}

        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input id="email" type="email" autoComplete="email" className="input mt-1" {...register("email" as const)} />
          {errors?.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === "signIn" ? "current-password" : "new-password"}
            className="input mt-1"
            {...register("password" as const)}
          />
          {errors?.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        {mode === "signUp" && (
          <div>
            <label className="label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input id="confirmPassword" type="password" autoComplete="new-password" className="input mt-1" {...register("confirmPassword" as const)} />
            {errors?.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
          </div>
        )}

        <button type="submit" className={cn("btn-primary w-full", isSubmitting && "opacity-80")} disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : mode === "signIn" ? "Sign in" : "Create account"}
        </button>
      </form>
    </div>
  );
}
