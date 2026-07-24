import { Search, Bell, Settings } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

interface TopbarProps {
  userName: string;
  userEmail: string;
}

export default function Topbar({ userName, userEmail }: TopbarProps) {
  return (
    <header className="flex items-center gap-4 border-b border-primary/10 bg-white px-4 py-4 sm:px-6">
      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral" />
        <input
          type="text"
          placeholder="Search anything..."
          disabled
          className="w-full cursor-default rounded-lg border border-primary/10 bg-surface py-2 pl-9 pr-3 text-sm font-body text-neutral placeholder:text-neutral focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 cursor-default items-center justify-center rounded-lg text-primary hover:bg-surface"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-secondary" />
        </button>

        <button
          type="button"
          aria-label="Settings"
          className="flex h-9 w-9 cursor-default items-center justify-center rounded-lg text-primary hover:bg-surface"
        >
          <Settings className="h-4 w-4" />
        </button>

        <div className="hidden h-8 w-px bg-primary/10 md:block" />

        <div className="hidden text-right md:block">
          <p className="text-sm font-medium font-body text-primary">{userName}</p>
          <p className="text-xs text-neutral">{userEmail}</p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}
