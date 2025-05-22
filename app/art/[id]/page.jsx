import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function VaerkDetalje() {
  const { id } = useParams();
  const [vaerk, setVaerk] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.smk.dk/api/v1/artworks/${id}`)
      .then((res) => setVaerk(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!vaerk) return <div>Indlæser...</div>;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">&larr; Tilbage</Link>
      <h1 className="text-3xl font-bold mt-4">{vaerk.title}</h1>
      <p className="mt-2 text-lg">🎨 Kunstner: {vaerk.artist_names || 'Ukendt'}</p>
    </div>
  );
}

export default VaerkDetalje;
