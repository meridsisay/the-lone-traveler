"use client";

/**
 * Lightweight video embed served straight from Cloudinary as progressive MP4
 * with an auto-generated poster frame.
 */
export default function CldVideo({ publicId }: { publicId: string }) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const base = `https://res.cloudinary.com/${cloud}/video/upload`;
  return (
    <video
      controls
      preload="metadata"
      playsInline
      poster={`${base}/q_auto,f_jpg,so_0/${publicId}.jpg`}
      className="w-full bg-sand"
    >
      <source src={`${base}/q_auto/${publicId}.mp4`} type="video/mp4" />
      Your browser can’t play this film.
    </video>
  );
}
