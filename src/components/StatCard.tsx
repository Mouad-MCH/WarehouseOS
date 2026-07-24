import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  title: string;
  subtitle: string;
  statusDot?: "green";
}

export default function StatCard({ icon, label, title, subtitle, statusDot }: StatCardProps) {
  return (
    <div className="rounded-xl border border-primary/10 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
          {icon}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-neutral">
          {label}
        </span>
      </div>

      {statusDot ? (
        <p className="mb-1 flex items-center gap-1.5 font-heading text-base font-semibold text-green-600">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {title}
        </p>
      ) : (
        <p className="mb-1 font-heading text-base font-semibold text-primary">{title}</p>
      )}
      <p className="text-sm text-neutral">{subtitle}</p>
    </div>
  );
}
