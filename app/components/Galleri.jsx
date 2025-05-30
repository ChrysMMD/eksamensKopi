"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ArtCard from "./ArtCard";
import useImageStore from "../stores/useImageStore";

export default function Galleri() {
  //billeder fra API
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //zustand
  const selectedImages = useImageStore((state) => state.selectedImages);
  const addImage = useImageStore((state) => state.addImage);
  const removeImage = useImageStore((state) => state.removeImage);
  const artworkIds = useImageStore((state) => state.artworkIds);
  const addArtworkId = useImageStore((state) => state.addArtworkId);
  const removeArtworkId = useImageStore((state) => state.removeArtworkId);

  //søgefel
  const [searchTerm, setSearchTerm] = useState("");

  //hent data fra API
  useEffect(() => {
      const delayDebounce = setTimeout(() => {
    const query = searchTerm.trim() === "" ? "*"
      : encodeURIComponent(searchTerm);
    axios
       .get(`https://api.smk.dk/api/v1/art/search?keys=${query}&offset=0&rows=30`)
      .then((res) => {
        const filtered = res.data.items.filter((item) => item.image_thumbnail);
        setDatas(filtered);
        setLoading(false);
      })

      .catch((err) => {
        setError("Kunne ikke hente data");
        console.error(err);
        setLoading(false);
      });

  }, 300);
    return () => clearTimeout(delayDebounce); 
}, [searchTerm]);

  //funktion til checkboxe
  const handleCheckboxChange = (imageUrl, artworkId) => {
  const isSelected = selectedImages.includes(imageUrl);

  if (isSelected) {
    removeImage(imageUrl);
    removeArtworkId(artworkId);
  } else {
    addImage(imageUrl);
    addArtworkId(artworkId);
  }
};


  //load og fejl-tilstand
  if (loading) return <p>Indlæser data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Vælg billeder til dit event</h2>
      <input
        type="text"
        placeholder="Søg værker (fx Van Gogh, portræt...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-4"
      />

      <div className="flex flex-wrap gap-6 justify-center">
        {datas.map((data) => {
          const imageUrl = data.image_thumbnail;
          const artworkId = data.id;
          
          return (
            <label
              key={artworkId}
              className={`relative border rounded-lg p-1 ${
                selectedImages.includes(imageUrl) ? "ring-4 ring-blue-500" : ""
              }`}
            >
              
              <ArtCard
                image_thumbnail={imageUrl}
                titles={data.titles}
                artist={data.artist}
              />
            
              <input
                type="checkbox"
                checked={selectedImages.includes(imageUrl)}
                onChange={() =>
                  handleCheckboxChange(imageUrl, artworkId)
                }
                className="absolute top-2 right-2 w-5 h-5 accent-blue-500"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
} 
