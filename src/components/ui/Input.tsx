import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  endAdornment?: ReactNode;
  helperText?: string;
}

export default function Input({
  label,
  error,
  icon,
  endAdornment,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium font-body text-primary">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full rounded-md border px-3 py-2 text-sm font-body text-primary focus:outline-none focus:ring-1 ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400"
              : "border-neutral/40 focus:border-secondary focus:ring-secondary"
          } ${icon ? "pl-9" : ""} ${endAdornment ? "pr-9" : ""} ${className}`}
          {...props}
        />
        {endAdornment && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">{endAdornment}</span>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      ) : (
        helperText && <p className="mt-1 text-sm text-neutral">{helperText}</p>
      )}
    </div>
  );
}
