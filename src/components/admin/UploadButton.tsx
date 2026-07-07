"use client";

import {
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { useRouter } from "next/navigation";
import { createMediaRecord } from "@/lib/actions/media";

export default function UploadButton({
  onUploaded,
}: {
  onUploaded?: (publicId: string) => void;
}) {
  const router = useRouter();

  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/sign"
      options={{
        folder: "the-lone-traveler",
        sources: ["local", "camera"],
        multiple: true,
        resourceType: "auto",
      }}
      onSuccess={async (result) => {
        const info = result.info;
        if (typeof info !== "object" || !info) return;
        const upload = info as CloudinaryUploadWidgetInfo;
        await createMediaRecord({
          publicId: upload.public_id,
          kind: upload.resource_type === "video" ? "VIDEO" : "IMAGE",
          width: upload.width,
          height: upload.height,
          format: upload.format,
        });
        onUploaded?.(upload.public_id);
        router.refresh();
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="instrument border border-hairline px-5 py-2.5 text-ink transition-colors hover:border-cobalt hover:text-cobalt"
        >
          Upload media
        </button>
      )}
    </CldUploadWidget>
  );
}
