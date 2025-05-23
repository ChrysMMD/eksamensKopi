"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ArtCard from "./ArtCard";
import useImageStore from "../stores/useImageStore";

export default function Galleri() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const selectedImages = useImageStore((state) => state.selectedImages);
  const addImage = useImageStore((state) => state.addImage);
  const removeImage = useImageStore((state) => state.removeImage);



  useEffect(() => {
    axios
      .get("https://api.smk.dk/api/v1/art/search?keys=%2A&offset=0&rows=30")
      .then((res) => {
        const filtered = res.data.items.filter((item) => {
          console.log("Thumbnail:", item.image_thumbnail);
          return item.image_thumbnail; //
        });

        setDatas(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError("Kunne ikke hente data");
        console.error(err);
        setLoading(false);
      });
  }, []);

  //funktion til checkboxe
  const handleCheckboxChange = (imageUrl) => {
    if (selectedImages.includes(imageUrl)) {
      removeImage(imageUrl);
    } else {
      addImage(imageUrl);
    }
  };

  if (loading) return <p>Indlæser data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Vælg billeder til dit event</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {datas.map((data) => {
          const imageUrl = data.image_thumbnail;
          return (
            <label
              key={data.id}
              className={`relative border rounded-lg p-1 ${
                selectedImages.includes(imageUrl) ? "ring-4 ring-blue-500" : ""
              }`}
            >
              {/* ArtCard viser billedet og info */}
              <ArtCard
                image_thumbnail={imageUrl}
                titles={data.titles}
                artist={data.artist}
              />
              {/* Usynlig checkbox der stadig kan klikkes */}
              <input
                type="checkbox"
                checked={selectedImages.includes(imageUrl)}
                onChange={() => handleCheckboxChange(imageUrl)}
                className="absolute top-2 right-2 w-5 h-5 accent-blue-500"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
