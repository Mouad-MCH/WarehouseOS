"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema } from "@/lib/validation";
import { registerUser, type FieldErrors } from "@/services/register";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFieldErrors({});

    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setIsSubmitting(true);

    const registerResult = await registerUser(result.data);

    if (!registerResult.success) {
      if (registerResult.status === 400 && registerResult.errors) {
        setFieldErrors(registerResult.errors);
      } else if (registerResult.status === 409) {
        setFormError("This email is already in use");
      } else {
        setFormError(registerResult.message || "Server error, please try again");
      }
      setIsSubmitting(false);
      return;
    }

    router.push("/login");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4" noValidate>
      {formError && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      <Input
        id="name"
        name="name"
        type="text"
        label="Full name"
        placeholder="John Doe"
        icon={<User className="h-4 w-4" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors.name?.[0]}
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        placeholder="john.doe@logistics.com"
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
        helperText="Minimum 8 characters"
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

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        label="Confirm password"
        icon={<Lock className="h-4 w-4" />}
        endAdornment={
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="text-neutral hover:text-primary"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={fieldErrors.confirmPassword?.[0]}
      />

      <label className="flex items-start gap-2 text-sm font-body text-neutral">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-neutral/40 text-secondary focus:ring-secondary"
        />
        <span>
          I agree to the{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-secondary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-secondary hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting || !agreedToTerms}
        className="w-full"
      >
        {isSubmitting ? "Creating account..." : "Create Account →"}
      </Button>

      <p className="text-center text-sm font-body text-neutral">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-secondary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
