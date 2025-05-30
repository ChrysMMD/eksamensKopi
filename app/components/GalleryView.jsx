export default function GalleryView({ images }) {
    console.log("🖼️ GalleryView modtager billeder:", images);
  if (!images || images.length === 0) {
    return <p>Ingen billeder tilknyttet dette event.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Galleri billede ${index + 1}`}
          className="w-full h-48 object-cover rounded"
        />
      ))}
    </div>
  );
}
