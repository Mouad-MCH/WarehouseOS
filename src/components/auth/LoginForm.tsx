"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "@/lib/validation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

type FieldErrors = Partial<Record<"email" | "password", string[]>>;

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFieldErrors({});

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
      });

      if (!response || response.error) {
        setFormError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setFormError("Server error, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4" noValidate>
      {formError && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        placeholder="you@company.com"
        icon={<Mail className="h-4 w-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email?.[0]}
      />

      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        icon={<Lock className="h-4 w-4" />}
        endAdornment={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-neutral hover:text-primary"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password?.[0]}
      />

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      <p className="text-center text-sm font-body text-neutral">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-secondary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
