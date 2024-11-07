const BomInfo = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Bill of Materials for Cylindrical Tea Tin
        </h2>
        <div className="text-gray-500 mb-6">
          <p>
            <strong>1. Main Body:</strong>
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>Material: Tinplate (steel sheet coated with tin)</li>
            <li>Dimensions: 4 inches height, 3 inches diameter</li>
            <li>Thickness: 0.20 mm - 0.25 mm</li>
          </ul>
          <p>
            <strong>2. Lid:</strong>
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>Material: Tinplate</li>
            <li>Type: Sealed lid for tight sealing</li>
          </ul>
          <p>
            <strong>3. Base:</strong>
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>Material: Tinplate</li>
          </ul>
          <p>
            <strong>4. Printing Materials:</strong>
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>Food-safe ink for external designs</li>
          </ul>
          <p>
            <strong>5. Coatings:</strong>
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>
              Inner lacquer coating (food-grade) to preserve tea and prevent
              contamination
            </li>
            <li>Outer protective coating</li>
          </ul>
          <p>
            <strong>6. Label Material:</strong>
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>Water-resistant material for branding and information</li>
          </ul>
          <p>
            <strong>7. Packaging Material:</strong>
          </p>
          <ul className="list-disc pl-6">
            <li>
              Cardboard box for outer packaging to protect the tin during
              shipping
            </li>
          </ul>
        </div>
      </div>
      <div className="rounded shadow-md p-6">
        {" "}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Manufacturing Process Steps
        </h2>
        <ol className="list-decimal pl-6 text-gray-500 ">
          <li>Cutting and forming tinplate sheets into cylindrical shape</li>
          <li>Welding of the body and base</li>
          <li>Applying inner lacquer coating</li>
          <li>Printing designs on the exterior</li>
          <li>Applying outer protective coating</li>
          {/* <li>....</li> */}
        </ol>
      </div>
    </div>
  );
};

export default BomInfo;
