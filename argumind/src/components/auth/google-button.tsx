"use client";

import { FcGoogle } from "react-icons/fc";

export function GoogleSignInButton() {
  const handleClick = () => {
    alert("Google sign-in will be available soon.");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    >
      <FcGoogle className="text-lg" /> Continue with Google
    </button>
  );
}
