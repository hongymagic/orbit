import Link from "next/link";

import { SignupForm } from "@/components/surfaces/signup-form";
import { BrandMark } from "@/components/layout/brand-mark";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-semibold tracking-[-0.02em]">
          <BrandMark letter="O" size={24} />
          Orbit
        </Link>
        <SignupForm />
        <div className="text-center text-[12px] text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-foreground underline-offset-2 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
