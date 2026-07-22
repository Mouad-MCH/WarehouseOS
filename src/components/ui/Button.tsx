import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "inverted" | "outlined";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-600",
  secondary: "bg-secondary text-white hover:bg-secondary-600",
  inverted: "bg-white text-primary border border-primary hover:bg-slate-50",
  outlined: "bg-transparent border border-primary text-primary hover:bg-primary/5",
};

export default function Button({
  variant = "primary",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-sm font-medium font-body transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
