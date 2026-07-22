import Button from "@/components/ui/Button";

const colorSwatches = [
  {
    name: "Primary",
    hex: "#1E293B",
    chip: "bg-primary",
    ramp: ["bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary/80", "bg-primary"],
  },
  {
    name: "Secondary",
    hex: "#F97316",
    chip: "bg-secondary",
    ramp: ["bg-secondary/20", "bg-secondary/40", "bg-secondary/60", "bg-secondary/80", "bg-secondary"],
  },
  {
    name: "Tertiary",
    hex: "#35280C",
    chip: "bg-tertiary",
    ramp: ["bg-tertiary/20", "bg-tertiary/40", "bg-tertiary/60", "bg-tertiary/80", "bg-tertiary"],
  },
  {
    name: "Neutral",
    hex: "#64748B",
    chip: "bg-neutral",
    ramp: ["bg-neutral/20", "bg-neutral/40", "bg-neutral/60", "bg-neutral/80", "bg-neutral"],
  },
];

const buttonVariants = ["primary", "secondary", "inverted", "outlined"] as const;

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-surface p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <h1 className="font-heading text-xl font-bold text-primary">
            WarehouseOS Design System
          </h1>
        </header>

        <section>
          <h2 className="mb-4 font-body text-sm font-medium text-neutral">Colors</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colorSwatches.map((color) => (
              <div key={color.name} className="rounded-xl bg-white p-6 shadow-sm">
                <p className="font-body text-sm font-medium text-primary">{color.name}</p>
                <p className="mb-3 font-body text-xs text-neutral">{color.hex}</p>
                <div className="flex h-8 overflow-hidden rounded-md">
                  {color.ramp.map((shadeClass) => (
                    <div key={shadeClass} className={`flex-1 ${shadeClass}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-body text-sm font-medium text-neutral">Typography</h2>
          <div className="space-y-4">
            <div>
              <p className="font-heading text-5xl text-primary">Aa</p>
              <p className="font-body text-xs text-neutral">Headline — Space Grotesk</p>
            </div>
            <div>
              <p className="font-body text-5xl text-primary">Aa</p>
              <p className="font-body text-xs text-neutral">Body — Inter</p>
            </div>
            <div>
              <p className="font-body text-3xl font-medium text-primary">Aa</p>
              <p className="font-body text-xs text-neutral">Label — Inter Medium</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-body text-sm font-medium text-neutral">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            {buttonVariants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-body text-sm font-medium text-neutral">Search field</h2>
          <div className="flex max-w-sm items-center gap-2 rounded-full border border-neutral/30 bg-surface px-4 py-2">
            <svg
              className="h-4 w-4 text-neutral"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="font-body text-sm text-neutral">Search</span>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-body text-sm font-medium text-neutral">Icon buttons</h2>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Home"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 011-1h0a1 1 0 011 1v4a1 1 0 001 1h4a1 1 0 001-1V10" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="User"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0" />
              </svg>
            </button>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-body text-sm font-medium text-neutral">Color chips</h2>
          <div className="flex gap-3">
            {colorSwatches.map((color) => (
              <div key={color.name} className={`h-8 w-8 rounded-full ${color.chip}`} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
