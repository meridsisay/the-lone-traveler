"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import MediaThumb from "@/components/admin/MediaThumb";
import UploadButton from "@/components/admin/UploadButton";
import { updateMedia, deleteMedia } from "@/lib/actions/media";

type MediaItem = {
  id: string;
  publicId: string;
  kind: "IMAGE" | "VIDEO";
  alt: string | null;
  caption: string | null;
  inGallery: boolean;
  destinationId: string | null;
};

type DestinationOption = { id: string; name: string };

export default function MediaLibrary({
  media,
  destinations,
}: {
  media: MediaItem[];
  destinations: DestinationOption[];
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const selected = media.find((m) => m.id === selectedId) ?? null;

  function handleSave(form: FormData) {
    if (!selected) return;
    startTransition(async () => {
      await updateMedia({
        id: selected.id,
        alt: (form.get("alt") as string) || null,
        caption: (form.get("caption") as string) || null,
        inGallery: form.get("inGallery") === "on",
        destinationId: (form.get("destinationId") as string) || null,
      });
      setNotice("Saved.");
      router.refresh();
    });
  }

  function handleDelete(force = false) {
    if (!selected) return;
    if (!force && !confirm("Delete this media from the library and Cloudinary?"))
      return;
    startTransition(async () => {
      const result = await deleteMedia({ id: selected.id, force });
      if (!result.deleted && result.inUseBy) {
        const proceed = confirm(
          `This media appears in: ${result.inUseBy.join(", ")}.\n\nDelete anyway? Those stories will show a missing frame.`
        );
        if (proceed) {
          await deleteMedia({ id: selected.id, force: true });
        } else {
          return;
        }
      }
      setSelectedId(null);
      setNotice("Deleted.");
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="instrument text-lowsun">Media</p>
          <h1 className="mt-3 font-display text-3xl font-extralight">
            The library
          </h1>
        </div>
        <UploadButton />
      </div>

      {notice && <p className="instrument mt-4 text-lowsun">{notice}</p>}

      {media.length === 0 ? (
        <div className="mt-12 border-t border-hairline pt-12 text-center">
          <p className="font-display text-2xl font-extralight italic">
            Nothing here yet.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-haze">
            Upload photographs and films; they become available for stories,
            covers, and the public gallery.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedId(m.id === selectedId ? null : m.id);
                setNotice(null);
              }}
              className={`text-left transition-opacity ${
                selectedId && m.id !== selectedId ? "opacity-50" : ""
              } ${m.id === selectedId ? "outline outline-2 outline-lowsun" : ""}`}
            >
              <MediaThumb publicId={m.publicId} kind={m.kind} alt={m.alt} />
            </button>
          ))}
        </div>
      )}

      {selected && (
        <form
          action={handleSave}
          className="mt-8 grid gap-4 border border-hairline bg-fathom/40 p-6 sm:grid-cols-2"
        >
          <label className="block">
            <span className="instrument text-haze">Alt text</span>
            <input
              name="alt"
              defaultValue={selected.alt ?? ""}
              className="mt-2 w-full border border-hairline bg-night px-3 py-2 text-sm text-moonstone"
              placeholder="What the photograph shows"
            />
          </label>
          <label className="block">
            <span className="instrument text-haze">Caption</span>
            <input
              name="caption"
              defaultValue={selected.caption ?? ""}
              className="mt-2 w-full border border-hairline bg-night px-3 py-2 text-sm text-moonstone"
              placeholder="Shown under the image"
            />
          </label>
          <label className="block">
            <span className="instrument text-haze">Destination</span>
            <select
              name="destinationId"
              defaultValue={selected.destinationId ?? ""}
              className="mt-2 w-full border border-hairline bg-night px-3 py-2 text-sm text-moonstone"
            >
              <option value="">None</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-end gap-2 pb-2">
            <input
              type="checkbox"
              name="inGallery"
              defaultChecked={selected.inGallery}
              className="accent-lowsun"
            />
            <span className="text-sm text-haze">Show in public gallery</span>
          </label>
          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={pending}
              className="instrument border border-hairline px-5 py-2.5 text-moonstone transition-colors hover:border-lowsun hover:text-lowsun disabled:opacity-50"
            >
              Save changes
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => handleDelete()}
              className="instrument border border-hairline px-5 py-2.5 text-haze transition-colors hover:border-red-400 hover:text-red-300 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
