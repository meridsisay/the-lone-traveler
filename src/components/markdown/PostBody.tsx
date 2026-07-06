import ReactMarkdown, {
  defaultUrlTransform,
  type Components,
} from "react-markdown";
import remarkGfm from "remark-gfm";
import { CldImage } from "@/components/cld";
import CldVideo from "@/components/markdown/CldVideo";

/**
 * Renders post markdown. Media is embedded with the site's `cld:` URI scheme:
 *   ![alt](cld:image:publicId)   ![alt](cld:video:publicId)
 * The same component renders the public page and the editor preview, so what
 * the author sees is exactly what readers get.
 */

function CldFigure({ publicId, alt }: { publicId: string; alt: string }) {
  return (
    <figure className="my-10">
      <CldImage
        src={publicId}
        alt={alt}
        width={1400}
        height={933}
        crop="limit"
        quality="auto"
        format="auto"
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full"
      />
      {alt && (
        <figcaption className="instrument mt-3 text-haze">{alt}</figcaption>
      )}
    </figure>
  );
}

const components: Components = {
  img({ src, alt }) {
    const source = typeof src === "string" ? src : "";
    if (source.startsWith("cld:image:")) {
      return <CldFigure publicId={source.slice(10)} alt={alt ?? ""} />;
    }
    if (source.startsWith("cld:video:")) {
      return (
        <figure className="my-10">
          <CldVideo publicId={source.slice(10)} />
          {alt && (
            <figcaption className="instrument mt-3 text-haze">{alt}</figcaption>
          )}
        </figure>
      );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={source} alt={alt ?? ""} className="my-10 w-full" />;
  },
  // Keep media blocks out of <p> wrappers (invalid nesting, breaks layout).
  p({ node, children }) {
    const onlyChild =
      node?.children.length === 1 && node.children[0].type === "element"
        ? node.children[0]
        : null;
    if (onlyChild?.tagName === "img") return <>{children}</>;
    return <p>{children}</p>;
  },
};

export default function PostBody({ content }: { content: string }) {
  return (
    <div className="post-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        // react-markdown strips unknown protocols; keep our cld: media URIs.
        urlTransform={(url) =>
          url.startsWith("cld:") ? url : defaultUrlTransform(url)
        }
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
