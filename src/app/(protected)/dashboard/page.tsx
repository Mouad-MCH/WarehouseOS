import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User, Clock, ShieldCheck, Wrench } from "lucide-react";
import StatCard from "@/components/StatCard";
import LoginActivityChart from "@/components/LoginActivityChart";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user;
  const firstName = user.name.split(" ")[0];

  const loginDate = new Date(session!.loginTime);
  const dateLabel = loginDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeLabel = loginDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeZoneName =
    new Intl.DateTimeFormat("en-US", { timeZoneName: "long" })
      .formatToParts(loginDate)
      .find((part) => part.type === "timeZoneName")?.value ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-primary">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-sm text-neutral">
          Here&apos;s your account overview and recent system performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<User className="h-4 w-4" />}
          label="Account"
          title={user.name}
          subtitle={user.email}
        />
        <StatCard
          icon={<Clock className="h-4 w-4" />}
          label="Last Login"
          title={dateLabel}
          subtitle={`— ${timeLabel} (${timeZoneName})`}
        />
        <StatCard
          icon={<ShieldCheck className="h-4 w-4" />}
          label="Status"
          title="Active"
          subtitle="Security protocols up to date"
          statusDot="green"
        />
      </div>

      <LoginActivityChart />

      <div className="rounded-xl border border-dashed border-primary/20 bg-primary/5 px-6 py-10 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-neutral shadow-sm">
          <Wrench className="h-5 w-5" />
        </span>
        <h2 className="font-heading text-lg font-semibold text-primary">
          Inventory &amp; product management coming in Sprint 2
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-neutral">
          Our engineering team is currently building the core logistics modules. Expected
          deployment: August 2026.
        </p>
        <button
          type="button"
          className="mt-5 cursor-default rounded-lg bg-primary px-5 py-2.5 text-sm font-medium font-body text-white"
        >
          Notify me on launch
        </button>
      </div>
    </div>
  );
}
