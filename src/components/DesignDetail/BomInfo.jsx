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

  const {
    designType,
    title,
    description,
    packagingRequirements,
    ...specificDetails
  } = designData;

  // Function to render specifications dynamically
  const renderSpecifications = (specifications) => {
    return Object.keys(specifications).map((key, index) => {
      const spec = specifications[key];

      // Handle fields that are arrays (e.g., materials, sizes)
      if (Array.isArray(spec)) {
        return spec.map((item, i) => (
          <div key={`${key}-${i}`}>
            <p className="font-semibold">{`${index + 1}. ${
              item.part || key
            }`}</p>
            <ul className="list-disc pl-6 mb-2">
              {Object.entries(item).map(([field, value]) => (
                <li key={`${key}-${i}-${field}`}>
                  {field}: {value}
                </li>
              ))}
            </ul>
          </div>
        ));
      }

      // Handle nested objects
      if (typeof spec === "object" && spec !== null) {
        return (
          <div key={key}>
            <p className="font-semibold">{`${index + 1}. ${key}`}</p>
            <ul className="list-disc pl-6 mb-2">
              {Object.entries(spec).map(([field, value]) => (
                <li key={`${key}-${field}`}>{`${field}: ${value}`}</li>
              ))}
            </ul>
          </div>
        );
      }

      // Handle simple fields
      return (
        <div key={key}>
          <p className="font-semibold">{`${index + 1}. ${key}`}</p>
          <ul className="list-disc pl-6 mb-2">
            <li>{spec}</li>
          </ul>
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
          {renderSpecifications(specificDetails)}
          {packagingRequirements && (
            <>
              <p className="font-semibold">Packaging Requirements:</p>
              <ul className="list-disc pl-6 mb-2">
                <li>{packagingRequirements}</li>
              </ul>
            </>
          )}
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
