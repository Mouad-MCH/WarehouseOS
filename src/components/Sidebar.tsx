import Link from "next/link";
import {
  LayoutDashboard,
  Archive,
  Truck,
  BarChart3,
  Settings,
  Package,
} from "lucide-react";

interface SidebarProps {
  userName: string;
}

const soonItems = [
  { label: "Inventory", icon: Archive },
  { label: "Shipments", icon: Truck },
  { label: "Reports", icon: BarChart3 },
];

export default function Sidebar({ userName }: SidebarProps) {
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="flex w-full flex-col border-r border-primary/10 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
          <Package className="h-4 w-4" />
        </span>
        <span className="font-heading text-lg font-semibold text-primary">
          WarehouseOS
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg bg-secondary/10 px-3 py-2.5 text-sm font-medium font-body text-secondary"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>

        {soonItems.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex cursor-default items-center justify-between rounded-lg px-3 py-2.5 text-sm font-body text-neutral/60"
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4" />
              {label}
            </span>
            <span className="rounded-full bg-neutral/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral/70">
              Soon
            </span>
          </div>
        ))}
      </nav>

      <div className="px-4 pb-6">
        <div className="mb-2 flex cursor-default items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-body text-neutral">
          <Settings className="h-4 w-4" />
          Settings
        </div>

        <div className="flex items-center gap-3 border-t border-primary/10 px-3 pt-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-sm font-semibold text-secondary">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium font-body text-primary">
              {userName}
            </p>
            <p className="text-xs text-neutral">Admin Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
