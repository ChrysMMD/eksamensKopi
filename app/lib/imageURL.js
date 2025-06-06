/**
 * Bygger IIIF-billed-URL ud fra image_iiif_id
 * @param {string} iiifId - SMK IIIF ID
 * @param {number} size - Maks bredde
 * @returns {string|null}
 */
export function getImageUrl(iiifId, size = 400) {
  if (!iiifId) return null;
  return `${iiifId}/full/!${size},/0/default.jpg`;
}

/**
 * @param {string} artworkId 
 * @param {number} size 
 * @returns {string|null}
 */
export function getArtworkImageUrl(artworkId, size = 400) {
  if (!artworkId) return null;
  const lower = artworkId.toLowerCase();
  return `https://iip-thumb.smk.dk/iiif/jp2/${lower}.tif.jp2/full/!${size},/0/default.jpg`;
}