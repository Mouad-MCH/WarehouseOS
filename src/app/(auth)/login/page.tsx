import LoginForm from "@/components/LoginForm";
import { Warehouse } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-surface lg:grid lg:grid-cols-2">
      <div
        className="hidden flex-col items-center justify-center gap-4 bg-primary px-16 py-12 text-center text-white lg:flex"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <Warehouse className="h-8 w-8" />
        <span className="font-heading text-2xl font-bold">WarehouseOS</span>
        <p className="max-w-xs font-body text-sm text-white/70">
          Streamline your warehouse operations with real-time inventory
          control.
        </p>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 sm:p-8">
        <div className="mb-2 flex items-center gap-2 text-primary lg:hidden">
          <Warehouse className="h-5 w-5" />
          <span className="font-heading text-lg font-bold">WarehouseOS</span>
        </div>

        <div className="w-full max-w-[430px] rounded-2xl bg-white p-8 shadow-xl sm:p-10">
          <h1 className="text-center font-heading text-2xl font-bold text-primary">
            Welcome back
          </h1>
          <p className="mb-6 text-center font-body text-sm text-neutral">
            Sign in to your dashboard
          </p>

          <LoginForm />
        </div>

        <p className="font-body text-xs text-neutral">
          © {new Date().getFullYear()} WarehouseOS
        </p>
      </div>
    </div>
  );
}
