import axios from "axios";
import { useEffect, useState } from "react";

export default function Datas(){
    //gemmer liste når hentes
    const [datas, setDatas] = useState([]);
    //loading indikator
    const [loading, setLoading] = useState(true);
    //error-besked
    const [error, setError] = useState("");

    //hentning af data med axios
    useEffect(() => {
        axios.get("https://api.smk.dk/api/v1/art/all_ids")
        //gemmer i datas og filtrere værker uden billeder væk
          .then((res) => {
            const filtered = res.data.filter((item) => item.image?.thumbnail);
            setDatas(filtered);
            //loading stoppes, nu hvor dataen er hentet
            setLoading(false);
          })
          .catch((err) => {
            setError("Kunne ikke hente data");
            console.error(err);
            setLoading(false);
          });
      }, []); //skal kun køre én gang når komponenten loader
      
//visning af loading eller error
    if (loading) return <p>Indlæser data...</p>;
    if (error) return <p>{error}</p>;

    //hvis alt er godt, vises listen. Der loopes igennem datas med map. Key bruges til at holde styr på hver række. Felter der skal vises med data.person og data.field_info.
    return (
        <div>
            <h1>Liste over værker:</h1>
            <ul>
                {datas.map((data) => (
                     <li key={data.id} style={{ marginBottom: "1.5rem" }}>
                     <img
                       src={data.image?.thumbnail}
                       alt={data.titles[0] || "Værk uden titel"}
                       width={200}
                       style={{ borderRadius: "8px" }}
                     />
                     <p><strong>{data.titles?.[0] || "Ukendt titel"}</strong></p>
                     <p>{data.artist_names?.[0] || "Ukendt kunstner"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
