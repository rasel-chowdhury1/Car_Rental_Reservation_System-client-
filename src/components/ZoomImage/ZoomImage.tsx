
import './ZoomImage.css'; // Import the custom CSS for zoom effect

const ZoomImage = ({ src, alt }: {src: string, alt:string}) => {
  return (
    <div className="relative overflow-hidden group">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto transition-transform duration-500 ease-in-out transform group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
    </div>
  );
};

export default ZoomImage;
