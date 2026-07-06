/** The site's signature device: a mono caption stamping a moment with place and time. */
export default function LogLine({
  parts,
  className = "",
}: {
  parts: (string | null | undefined)[];
  className?: string;
}) {
  const seen = new Set<string>();
  const text = parts
    .filter((p): p is string => !!p)
    .filter((p) => {
      const key = p.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(" · ");
  if (!text) return null;
  return (
    <p className={`instrument log-line text-haze ${className}`}>{text}</p>
  );
}
