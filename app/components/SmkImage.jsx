import Image from "next/image";
import { getImageUrl, getArtworkImageUrl } from "../lib/imageURL";

/**
 * Props:
 * - iiifId: et image_iiif_id (full IIIF URL)
 * - artworkId: et KKSnr som KKSgb22422 (valgfrit)
 * - fallback: alternativ URL (valgfrit)
 * - alt: alt-tekst
 * - width / height: billeddimensioner
 */
export default function SmkImage({
  iiifId = null,
  artworkId = null,
  fallback = null,
  alt = "Billede",
  width = 400,
  height = 300,
  className = ""
}) {
  const src =
    (iiifId && getImageUrl(iiifId, width)) ||
    (artworkId && getArtworkImageUrl(artworkId, width)) ||
    fallback;

  if (!src) {
    return (
      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
        <span className="text-xs text-gray-500 text-center px-2">
          Intet billede
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="object-cover w-full h-full rounded"
      loading="lazy"
      decoding="async"
    />
  );
}
