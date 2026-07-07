/**
 * A soft daylight gradient used wherever a photograph will eventually live —
 * sky into sunlit haze into sand, with a faint horizon.
 */
export default function PlaceholderScene({
  seed = 0,
  className = "",
}: {
  seed?: number;
  className?: string;
}) {
  const horizon = 58 + ((seed * 7) % 12);
  const id = `daylight-${seed}`;
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      role="img"
      aria-label="Placeholder awaiting a photograph"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe0f5" />
          <stop offset={`${horizon - 10}%`} stopColor="#ecdfc0" />
          <stop offset={`${horizon}%`} stopColor="#f3d9a8" />
          <stop offset={`${horizon + 1}%`} stopColor="#e8e2d4" />
          <stop offset="100%" stopColor="#ded7c5" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id})`} />
      <line
        x1="0"
        y1={horizon * 6}
        x2="800"
        y2={horizon * 6}
        stroke="#e4572e"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
    </svg>
  );
}
