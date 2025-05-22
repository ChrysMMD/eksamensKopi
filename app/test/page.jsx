"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";


export default function Datas() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.smk.dk/api/v1/art/search?keys=%2A&offset=0&rows=10")
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

  if (loading) return <p>Indlæser data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste over værker:</h1>
      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {datas.map((data) => (
          <ArtCard 
          key={data.id} 
          image_thumbnail={data.image_thumbnail}
          titles={data.titles}
          artist={data.artist}
          />
        ))}
      </div>
    </div>
  );
}
