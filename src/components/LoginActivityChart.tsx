const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/** Static sample data — no login-history tracking exists this sprint, purely illustrative. */
const SAMPLE_WEEKLY_ACTIVITY = [18, 24, 20, 48, 34, 82, 74];

const WIDTH = 700;
const HEIGHT = 240;
const PADDING_X = 12;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 16;

function buildPoints(values: number[]) {
  const max = Math.max(...values);
  const usableWidth = WIDTH - PADDING_X * 2;
  const usableHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  return values.map((value, index) => {
    const x = PADDING_X + (usableWidth * index) / (values.length - 1);
    const y = PADDING_TOP + usableHeight * (1 - value / max);
    return { x, y };
  });
}

export default function LoginActivityChart() {
  const points = buildPoints(SAMPLE_WEEKLY_ACTIVITY);
  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ");
  const firstPoint = points[0]!;
  const lastPoint = points[points.length - 1]!;
  const areaPath = `${linePath} L${lastPoint.x},${HEIGHT - PADDING_BOTTOM} L${firstPoint.x},${HEIGHT - PADDING_BOTTOM} Z`;

  return (
    <div className="rounded-xl border border-primary/10 bg-white p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold text-primary">Login Activity</h2>
          <p className="text-sm text-neutral">System access frequency over the last 7 days</p>
        </div>
        <div className="flex items-center gap-2 text-right">
          <span className="text-xs font-medium uppercase tracking-wide text-neutral">
            Weekly Target
          </span>
          <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
            100% SECURE
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Sample weekly login activity chart">
        <defs>
          <linearGradient id="loginActivityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#loginActivityGradient)" />
        <path d={linePath} fill="none" stroke="#F97316" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="mt-2 flex justify-between text-xs font-medium text-neutral">
        {DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  );
}
