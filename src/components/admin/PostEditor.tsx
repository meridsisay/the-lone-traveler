"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import PostBody from "@/components/markdown/PostBody";
import MediaPicker, { type PickerMedia } from "@/components/admin/MediaPicker";
import MediaThumb from "@/components/admin/MediaThumb";
import { slugify } from "@/lib/slugify";
import {
  createPost,
  updatePost,
  publishPost,
  unpublishPost,
  deletePost,
} from "@/lib/actions/posts";

type PostItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  destinationId: string | null;
  coverMediaId: string | null;
  coverMedia: { publicId: string; kind: "IMAGE" | "VIDEO"; alt: string | null } | null;
};

type DestinationOption = { id: string; name: string };

export default function PostEditor({
  post,
  destinations,
  media,
}: {
  post: PostItem | null;
  destinations: DestinationOption[];
  media: PickerMedia[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [destinationId, setDestinationId] = useState(post?.destinationId ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [cover, setCover] = useState<PickerMedia | null>(
    post?.coverMedia && post.coverMediaId
      ? { id: post.coverMediaId, ...post.coverMedia }
      : null
  );
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    post?.status ?? "DRAFT"
  );
  const [pane, setPane] = useState<"write" | "preview">("write");
  const [picker, setPicker] = useState<"body" | "cover" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function insertAtCursor(snippet: string) {
    const el = textareaRef.current;
    if (!el) {
      setContent((c) => c + "\n\n" + snippet + "\n");
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = content.slice(0, start) + snippet + content.slice(end);
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + snippet.length;
    });
  }

  function payload() {
    return {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      destinationId: destinationId || null,
      coverMediaId: cover?.id ?? null,
    };
  }

  function handleSave() {
    setNotice(null);
    startTransition(async () => {
      try {
        if (post) {
          await updatePost({ id: post.id, ...payload() });
          setNotice("Saved.");
          router.refresh();
        } else {
          const { id } = await createPost(payload());
          router.push(`/admin/posts/${id}/edit`);
        }
      } catch {
        setNotice(
          "Couldn’t save. Check the title and that the slug is unique (lowercase letters, numbers, dashes)."
        );
      }
    });
  }

  function handlePublishToggle() {
    if (!post) return;
    setNotice(null);
    startTransition(async () => {
      try {
        await updatePost({ id: post.id, ...payload() });
        if (status === "DRAFT") {
          await publishPost({ id: post.id });
          setStatus("PUBLISHED");
          setNotice("Published.");
        } else {
          await unpublishPost({ id: post.id });
          setStatus("DRAFT");
          setNotice("Back to draft.");
        }
        router.refresh();
      } catch {
        setNotice("Couldn’t change publish state.");
      }
    });
  }

  function handleDelete() {
    if (!post) return;
    if (!confirm("Delete this story permanently?")) return;
    startTransition(async () => {
      await deletePost({ id: post.id });
      router.push("/admin/posts");
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="instrument text-lowsun">
            {post ? "Edit story" : "New story"}
            {" · "}
            {status === "PUBLISHED" ? "Published" : "Draft"}
          </p>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            placeholder="Story title"
            className="mt-3 w-full max-w-2xl border-0 bg-transparent font-display text-3xl font-extralight text-moonstone placeholder:text-haze/50 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={pending || !title || !slug}
            className="instrument border border-hairline px-5 py-2.5 text-moonstone transition-colors hover:border-lowsun hover:text-lowsun disabled:opacity-50"
          >
            {post ? "Save" : "Create draft"}
          </button>
          {post && (
            <button
              type="button"
              onClick={handlePublishToggle}
              disabled={pending}
              className={`instrument border px-5 py-2.5 transition-colors disabled:opacity-50 ${
                status === "DRAFT"
                  ? "border-lowsun text-lowsun hover:bg-lowsun hover:text-night"
                  : "border-hairline text-haze hover:text-moonstone"
              }`}
            >
              {status === "DRAFT" ? "Publish" : "Unpublish"}
            </button>
          )}
          {post && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              className="instrument px-2 py-2.5 text-haze transition-colors hover:text-red-300 disabled:opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {notice && <p className="instrument mt-3 text-lowsun">{notice}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex gap-4 lg:hidden">
              {(["write", "preview"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPane(p)}
                  className={`instrument ${
                    pane === p ? "text-lowsun" : "text-haze"
                  }`}
                >
                  {p === "write" ? "Write" : "Preview"}
                </button>
              ))}
            </div>
            <p className="instrument hidden text-haze lg:block">Write</p>
            <button
              type="button"
              onClick={() => setPicker("body")}
              className="instrument text-haze transition-colors hover:text-lowsun"
            >
              + Insert media
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={24}
            placeholder="Write in markdown. Use “Insert media” to drop photographs and films into the story."
            className={`mt-4 w-full resize-y border border-hairline bg-fathom/30 p-4 font-mono text-sm leading-relaxed text-moonstone focus:outline-none ${
              pane === "preview" ? "hidden lg:block" : ""
            }`}
          />
        </div>

        <aside className="order-first lg:order-none">
          <div className="space-y-4 border border-hairline bg-fathom/40 p-5">
            <label className="block">
              <span className="instrument text-haze">Slug</span>
              <input
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugTouched(true);
                }}
                pattern="[a-z0-9-]+"
                className="mt-2 w-full border border-hairline bg-night px-3 py-2 text-sm text-moonstone"
              />
            </label>
            <label className="block">
              <span className="instrument text-haze">Excerpt</span>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="One or two lines for cards and search results"
                className="mt-2 w-full border border-hairline bg-night px-3 py-2 text-sm text-moonstone"
              />
            </label>
            <label className="block">
              <span className="instrument text-haze">Destination</span>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
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
            <div>
              <span className="instrument text-haze">Cover</span>
              <div className="mt-2">
                {cover ? (
                  <MediaThumb
                    publicId={cover.publicId}
                    kind={cover.kind}
                    alt={cover.alt}
                    size={280}
                  />
                ) : (
                  <p className="text-sm text-haze">No cover chosen.</p>
                )}
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPicker("cover")}
                    className="instrument text-haze transition-colors hover:text-lowsun"
                  >
                    {cover ? "Change" : "Choose cover"}
                  </button>
                  {cover && (
                    <button
                      type="button"
                      onClick={() => setCover(null)}
                      className="instrument text-haze hover:text-moonstone"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div
        className={`mt-8 border-t border-hairline pt-8 ${
          pane === "write" ? "hidden lg:block" : ""
        }`}
      >
        <p className="instrument text-haze">Preview</p>
        <div className="mx-auto mt-6 max-w-2xl">
          {title && (
            <h1 className="mb-8 font-display text-4xl font-extralight">
              {title}
            </h1>
          )}
          {content ? (
            <PostBody content={content} />
          ) : (
            <p className="text-sm text-haze">
              The preview fills in as you write.
            </p>
          )}
        </div>
      </div>

      {picker && (
        <MediaPicker
          media={media}
          kinds={picker === "cover" ? ["IMAGE"] : ["IMAGE", "VIDEO"]}
          onClose={() => setPicker(null)}
          onSelect={(m) => {
            if (picker === "cover") {
              setCover(m);
            } else {
              const uri = `cld:${m.kind === "VIDEO" ? "video" : "image"}:${m.publicId}`;
              insertAtCursor(`\n![${m.alt ?? ""}](${uri})\n`);
            }
            setPicker(null);
          }}
        />
      )}
    </div>
  );
}
