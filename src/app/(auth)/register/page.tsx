import RegisterForm from "@/components/RegisterForm";
import { Warehouse, Zap, ShieldCheck, LayoutGrid, Activity } from "lucide-react";

const features = [
  { icon: Zap, label: "Fast Ingestion" },
  { icon: ShieldCheck, label: "Secure Access" },
  { icon: LayoutGrid, label: "Fixed Grid UX" },
  { icon: Activity, label: "Reliable Uptime" },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-surface lg:grid lg:grid-cols-2">
      <div
        className="hidden flex-col justify-center gap-8 bg-primary px-16 py-12 text-white lg:flex"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            <Warehouse className="h-6 w-6" />
            <span className="font-heading text-xl font-bold">WarehouseOS</span>
          </div>

          <div className="mt-8 border-l-4 border-secondary pl-4">
            <p className="font-body text-sm text-white/70">
              Join your team and start managing operations in minutes. Built
              for industrial-grade reliability and high-utility environments.
            </p>
          </div>
        </div>

        <hr className="border-white/10" />

        <div className="grid grid-cols-2 gap-6">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/70">
              <Icon className="h-4 w-4" />
              <span className="font-body text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 sm:p-8">
        <div className="mb-2 flex items-center gap-2 text-primary lg:hidden">
          <Warehouse className="h-5 w-5" />
          <span className="font-heading text-lg font-bold">WarehouseOS</span>
        </div>

        <div className="w-full max-w-[430px] rounded-2xl bg-white p-8 shadow-xl sm:p-10">
          <h1 className="font-heading text-2xl font-bold text-primary">
            Create your account
          </h1>
          <p className="mb-6 font-body text-sm text-neutral">
            Get started with WarehouseOS.
          </p>

          <RegisterForm />
        </div>

        <p className="font-body text-xs text-neutral">
          © {new Date().getFullYear()} WarehouseOS
        </p>
      </div>
    </div>
  );
}
