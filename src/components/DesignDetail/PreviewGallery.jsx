import Image from "next/image";
import { useDesign } from "./DesignContext";

const PreviewGallery = () => {
  const { designData } = useDesign();

  let previews = designData.specifications?.generatedImages || [];

  return (
    <div>
      <h2 className="text-lg text-center font-semibold text-gray-500 mb-4">
        Preview
      </h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {previews?.map((option, index) => (
          <div
            key={index}
            className="w-[200px] h-[300px] bg-white p-4 rounded-lg shadow-lg transition duration-200 hover:shadow-xl"
          >
            <Image
              src={option.image}
              alt={option.label}
              className="w-full object-contain rounded-lg mb-4 max-h-48"
              style={{
                aspectRatio: "3/4", // Ensures responsive aspect ratio
              }}
            />
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col justify-start items-start mb-3">
                <h3 className="text-center text-gray-800 font-semibold">
                  {option.label}
                </h3>
                <p className="text-center text-gray-500 text-sm">
                  {`${option.price} • ${option.units} per unit • ${option.delivery} days`}
                </p>
              </div>
              <div className="flex justify-center mt-auto">
                <button className="text-red-500 hover:text-red-600 transition">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewGallery;
