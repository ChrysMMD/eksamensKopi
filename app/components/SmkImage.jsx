import Image from "next/image";
import { getImageUrl, getArtworkImageUrl } from "../lib/imageURL";


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
      <div className="bg-gray-200 w-full flex items-center justify-center">
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
      className="object-cover w-full rounded"
      loading="lazy"
      decoding="async"
    />
  );
}
