/** A rubber-stamp ring: place name (and coordinates when known) circling a compass dot. */
export default function Stamp({
  text,
  color = "#2b59e0",
  className = "",
}: {
  text: string;
  color?: string;
  className?: string;
}) {
  const ring = `${text} · `.repeat(Math.max(1, Math.ceil(24 / (text.length + 3))));
  const id = `ring-${text.replace(/\W/g, "")}`;
  return (
    <svg
      viewBox="0 0 120 120"
      className={`h-full w-full ${className}`}
      style={{ color }}
      aria-hidden
    >
      <defs>
        <path
          id={id}
          d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
        />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        cx="60"
        cy="60"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <circle cx="60" cy="60" r="3.5" fill="currentColor" />
      <text
        fontSize="10.5"
        letterSpacing="2.5"
        fill="currentColor"
        fontFamily="var(--font-plex-mono), monospace"
        fontWeight="500"
      >
        <textPath href={`#${id}`}>{ring.toUpperCase()}</textPath>
      </text>
    </svg>
  );
}
