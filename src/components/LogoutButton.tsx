"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 rounded-lg border border-primary/15 px-4 py-2 text-sm font-medium font-body text-red-600 transition-colors hover:bg-red-50"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}
