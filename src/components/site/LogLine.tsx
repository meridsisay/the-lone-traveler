/** The site's signature device: a mono caption stamping a moment with place and time. */
export default function LogLine({
  parts,
  className = "",
}: {
  parts: (string | null | undefined)[];
  className?: string;
}) {
  const text = parts.filter(Boolean).join(" · ");
  if (!text) return null;
  return (
    <p className={`instrument log-line text-haze ${className}`}>{text}</p>
  );
}
