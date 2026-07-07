"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import MediaPicker, { type PickerMedia } from "@/components/admin/MediaPicker";
import MediaThumb from "@/components/admin/MediaThumb";
import { slugify } from "@/lib/slugify";
import {
  createDestination,
  updateDestination,
  deleteDestination,
} from "@/lib/actions/destinations";

type DestinationItem = {
  id: string;
  slug: string;
  name: string;
  country: string | null;
  summary: string | null;
  latitude: number | null;
  longitude: number | null;
  coverMediaId: string | null;
  coverMedia: { publicId: string; kind: "IMAGE" | "VIDEO"; alt: string | null } | null;
  _count: { posts: number; media: number };
};

function DestinationForm({
  destination,
  media,
  onDone,
}: {
  destination: DestinationItem | null;
  media: PickerMedia[];
  onDone: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(destination?.name ?? "");
  const [slug, setSlug] = useState(destination?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!destination);
  const [cover, setCover] = useState<PickerMedia | null>(
    destination?.coverMedia && destination.coverMediaId
      ? { id: destination.coverMediaId, ...destination.coverMedia }
      : null
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(form: FormData) {
    startTransition(async () => {
      try {
        const lat = ((form.get("latitude") as string) ?? "").trim();
        const lon = ((form.get("longitude") as string) ?? "").trim();
        const payload = {
          name,
          slug,
          country: (form.get("country") as string) || null,
          summary: (form.get("summary") as string) || null,
          coverMediaId: cover?.id ?? null,
          latitude: lat === "" ? null : Number(lat),
          longitude: lon === "" ? null : Number(lon),
        };
        if (destination) {
          await updateDestination({ id: destination.id, ...payload });
        } else {
          await createDestination(payload);
        }
        router.refresh();
        onDone();
      } catch {
        setError(
          "Couldn’t save. Check that the slug is unique and uses only lowercase letters, numbers, and dashes."
        );
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      className="grid gap-4 border border-hairline bg-white p-6 sm:grid-cols-2"
    >
      <label className="block">
        <span className="instrument text-inksoft">Name</span>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          required
          className="mt-2 w-full border border-hairline bg-white px-3 py-2 text-sm text-ink"
          placeholder="Kyoto, Japan"
        />
      </label>
      <label className="block">
        <span className="instrument text-inksoft">Slug</span>
        <input
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          required
          pattern="[a-z0-9\-]+"
          className="mt-2 w-full border border-hairline bg-white px-3 py-2 text-sm text-ink"
          placeholder="kyoto"
        />
      </label>
      <label className="block">
        <span className="instrument text-inksoft">Country</span>
        <input
          name="country"
          defaultValue={destination?.country ?? ""}
          className="mt-2 w-full border border-hairline bg-white px-3 py-2 text-sm text-ink"
        />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="instrument text-inksoft">Latitude</span>
          <input
            name="latitude"
            type="number"
            step="any"
            min={-90}
            max={90}
            defaultValue={destination?.latitude ?? ""}
            placeholder="64.96"
            className="mt-2 w-full border border-hairline bg-white px-3 py-2 text-sm text-ink"
          />
        </label>
        <label className="block">
          <span className="instrument text-inksoft">Longitude</span>
          <input
            name="longitude"
            type="number"
            step="any"
            min={-180}
            max={180}
            defaultValue={destination?.longitude ?? ""}
            placeholder="-19.02"
            className="mt-2 w-full border border-hairline bg-white px-3 py-2 text-sm text-ink"
          />
        </label>
      </div>
      <label className="block sm:col-span-2">
        <span className="instrument text-inksoft">Summary</span>
        <textarea
          name="summary"
          defaultValue={destination?.summary ?? ""}
          rows={2}
          className="mt-2 w-full border border-hairline bg-white px-3 py-2 text-sm text-ink"
          placeholder="A line or two for the destination card"
        />
      </label>
      <div className="sm:col-span-2">
        <span className="instrument text-inksoft">Cover</span>
        <div className="mt-2 flex items-center gap-4">
          {cover ? (
            <div className="w-40">
              <MediaThumb
                publicId={cover.publicId}
                kind={cover.kind}
                alt={cover.alt}
                size={160}
              />
            </div>
          ) : (
            <p className="text-sm text-inksoft">No cover chosen.</p>
          )}
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="instrument border border-hairline px-4 py-2 text-ink transition-colors hover:border-cobalt hover:text-cobalt"
          >
            {cover ? "Change" : "Choose cover"}
          </button>
          {cover && (
            <button
              type="button"
              onClick={() => setCover(null)}
              className="instrument text-inksoft hover:text-ink"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-sm text-cobalt sm:col-span-2">{error}</p>}
      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="instrument border border-hairline px-5 py-2.5 text-ink transition-colors hover:border-cobalt hover:text-cobalt disabled:opacity-50"
        >
          {destination ? "Save changes" : "Create destination"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="instrument px-5 py-2.5 text-inksoft hover:text-ink"
        >
          Cancel
        </button>
      </div>
      {pickerOpen && (
        <MediaPicker
          media={media}
          kinds={["IMAGE"]}
          onClose={() => setPickerOpen(false)}
          onSelect={(m) => {
            setCover(m);
            setPickerOpen(false);
          }}
        />
      )}
    </form>
  );
}

export default function DestinationManager({
  destinations,
  media,
}: {
  destinations: DestinationItem[];
  media: PickerMedia[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleDelete(d: DestinationItem) {
    const details =
      d._count.posts > 0 || d._count.media > 0
        ? `\n\n${d._count.posts} stories and ${d._count.media} media items will keep existing but lose this destination.`
        : "";
    if (!confirm(`Delete ${d.name}?${details}`)) return;
    startTransition(async () => {
      await deleteDestination({ id: d.id });
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="instrument text-cobalt">Destinations</p>
          <h1 className="mt-3 font-punch text-3xl font-extrabold tracking-tight">
            Places on the map
          </h1>
        </div>
        {!creating && (
          <button
            type="button"
            onClick={() => {
              setCreating(true);
              setEditingId(null);
            }}
            className="instrument border border-hairline px-5 py-2.5 text-ink transition-colors hover:border-cobalt hover:text-cobalt"
          >
            New destination
          </button>
        )}
      </div>

      {creating && (
        <div className="mt-8">
          <DestinationForm
            destination={null}
            media={media}
            onDone={() => setCreating(false)}
          />
        </div>
      )}

      {destinations.length === 0 && !creating ? (
        <div className="mt-12 border-t border-hairline pt-12 text-center">
          <p className="font-reader text-2xl italic">
            No destinations pinned yet.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-inksoft">
            Create one to give a place its own page of stories and
            photographs.
          </p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-hairline border-t border-hairline">
          {destinations.map((d) => (
            <li key={d.id} className="py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-punch text-xl font-bold">
                    {d.name}
                    {d.country && (
                      <span className="ml-3 text-sm text-inksoft">{d.country}</span>
                    )}
                  </p>
                  <p className="instrument mt-1 text-inksoft">
                    /{d.slug} · {d._count.posts} stories · {d._count.media} media
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(editingId === d.id ? null : d.id);
                      setCreating(false);
                    }}
                    className="instrument text-inksoft transition-colors hover:text-cobalt"
                  >
                    {editingId === d.id ? "Close" : "Edit"}
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleDelete(d)}
                    className="instrument text-inksoft transition-colors hover:text-poppy disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {editingId === d.id && (
                <div className="mt-4">
                  <DestinationForm
                    destination={d}
                    media={media}
                    onDone={() => setEditingId(null)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
