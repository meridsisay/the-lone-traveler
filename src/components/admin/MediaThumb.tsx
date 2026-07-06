import { CldImage } from "@/components/cld";

/** Small preview for library grids and pickers; videos show a generated poster frame. */
export default function MediaThumb({
  publicId,
  kind,
  alt,
  size = 320,
}: {
  publicId: string;
  kind: "IMAGE" | "VIDEO";
  alt?: string | null;
  size?: number;
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-fathom">
      <CldImage
        src={publicId}
        alt={alt ?? ""}
        width={size}
        height={Math.round((size * 3) / 4)}
        crop="fill"
        gravity="auto"
        quality="auto"
        format="auto"
        assetType={kind === "VIDEO" ? "video" : "image"}
        className="h-full w-full object-cover"
      />
      {kind === "VIDEO" && (
        <span className="instrument absolute bottom-2 left-2 bg-night/80 px-2 py-1 text-lowsun">
          Film
        </span>
      )}
    </div>
  );
}
