import Link from 'next/link';

export default async function ArtDetail(){
const res = await fetch(`https://api.smk.dk/api/v1/art/all_ids`);

const data = await res.json();
const art = data.arty;

return (
    <div className='relative'>
        <img 
        src={art.thumbnail}
        alt={art.name}
        className='w-full mx-auto aspect-square object-cover rounded-xl'
        />
    </div>
)
}