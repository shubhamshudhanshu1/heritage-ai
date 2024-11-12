import Image from "next/image";
import { useDesign } from "./DesignContext";

const BomInfo = () => {
  const { designData } = useDesign();

  if (!designData) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          No design data available.
        </h2>
      </div>
    );
  }

  const { designType, title, specifications } = designData;

  // Extract the first favorite image if available
  const favImage = specifications?.fav_images?.[0];

  // Function to render specifications dynamically
  const renderSpecifications = (specifications = {}) => {
    return Object.keys(specifications).map((key, index) => {
      const spec = specifications[key];

      // Skip generatedImages fields
      if (key === "generatedImages" || key === "fav_images") return null;

      // Handle fields that are arrays (e.g., sizes)
      if (Array.isArray(spec)) {
        return (
          <div key={`${key}-${index}`} className="flex justify-between">
            <div>
              <p className="font-semibold mb-2">{`${index + 1}. ${key}`}</p>
              <ul className="list-disc pl-6 mb-2">
                {spec.map((item, i) => (
                  <li key={`${key}-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
            {favImage && index === 0 && (
              <Image
                src={favImage.src}
                alt={favImage.alt}
                height={160}
                width={160}
                className="object-cover rounded-lg shadow-md"
              />
            )}
          </div>
        );
      }

      // Handle simple fields
      return (
        <div key={key} className="flex justify-between items-center mb-4">
          <div>
            <p className="font-semibold mb-2">{`${index + 1}. ${key}`}</p>
            <ul className="list-disc pl-6 mb-2">
              <li>{spec}</li>
            </ul>
          </div>
          {favImage && index === 0 && (
            <Image
              src={favImage.src}
              alt={favImage.alt}
              height={160}
              width={160}
              className="object-cover rounded-lg shadow-md"
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Bill of Materials for {title || designType}
        </h2>
        <div className="text-gray-500 mb-6">
          {renderSpecifications(specifications)}
        </div>
      </div>
      <div className="rounded shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Manufacturing Process Steps
        </h2>
        <ol className="list-decimal pl-6 text-gray-500">
          <li>Cutting and forming raw materials</li>
          <li>Welding/assembling different parts</li>
          <li>Applying necessary coatings</li>
          <li>Printing designs on the exterior</li>
          <li>Final packaging and quality inspection</li>
        </ol>
      </div>
    </div>
  );
};

export default BomInfo;
