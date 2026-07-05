"use client";

import { useState } from "react";
import MediaThumb from "@/components/admin/MediaThumb";
import UploadButton from "@/components/admin/UploadButton";

export type PickerMedia = {
  id: string;
  publicId: string;
  kind: "IMAGE" | "VIDEO";
  alt: string | null;
};

/** Overlay for choosing (or uploading) a media item without ever typing a publicId. */
export default function MediaPicker({
  media,
  onSelect,
  onClose,
  kinds = ["IMAGE", "VIDEO"],
}: {
  media: PickerMedia[];
  onSelect: (item: PickerMedia) => void;
  onClose: () => void;
  kinds?: ("IMAGE" | "VIDEO")[];
}) {
  const [query, setQuery] = useState("");

  const visible = media.filter(
    (m) =>
      kinds.includes(m.kind) &&
      (query === "" ||
        m.publicId.toLowerCase().includes(query.toLowerCase()) ||
        (m.alt ?? "").toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/90 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Choose media"
    >
      <div className="flex max-h-[85svh] w-full max-w-3xl flex-col border border-hairline bg-fathom p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="instrument text-lowsun">Choose media</p>
          <div className="flex items-center gap-3">
            <UploadButton />
            <button
              type="button"
              onClick={onClose}
              className="instrument text-haze transition-colors hover:text-moonstone"
            >
              Close
            </button>
          </div>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or alt text"
          className="mt-4 w-full border border-hairline bg-night px-3 py-2 text-sm text-moonstone"
        />
        {visible.length === 0 ? (
          <p className="mt-8 text-center text-sm text-haze">
            No media yet. Upload something to get started.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
            {visible.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelect(m)}
                className="transition-opacity hover:opacity-80"
              >
                <MediaThumb
                  publicId={m.publicId}
                  kind={m.kind}
                  alt={m.alt}
                  size={200}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
