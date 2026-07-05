/**
 * A quiet twilight landscape used wherever a photograph will eventually live.
 * Deterministic per `seed` so lists don't shimmer between renders.
 */
export default function PlaceholderScene({
  seed = 0,
  className = "",
}: {
  seed?: number;
  className?: string;
}) {
  const horizon = 46 + ((seed * 7) % 14); // horizon height varies 46–59%
  const moonX = 18 + (seed * 23) % 64;
  const id = `sky-${seed}`;
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      role="img"
      aria-label="Placeholder landscape awaiting a photograph"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1420" />
          <stop offset="50%" stopColor="#152233" />
          <stop offset={`${horizon - 8}%`} stopColor="#233648" />
          <stop offset={`${horizon - 1}%`} stopColor="#41404a" />
          <stop offset={`${horizon}%`} stopColor="#54453c" />
          <stop offset={`${horizon + 0.5}%`} stopColor="#0e161f" />
          <stop offset="100%" stopColor="#0b121b" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill={`url(#${id})`} />
      <circle
        cx={moonX * 8}
        cy={(horizon - 34) * 5}
        r="9"
        fill="#e9edf1"
        opacity="0.4"
      />
      <line
        x1="0"
        y1={horizon * 5}
        x2="800"
        y2={horizon * 5}
        stroke="#e2a356"
        strokeOpacity="0.3"
        strokeWidth="0.75"
      />
    </svg>
  );
}
