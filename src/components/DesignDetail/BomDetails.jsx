import { useDesign } from "./DesignContext";
import ActionBar from "./ActionBar"; // Actions related to BOM
import BomInfo from "./BomInfo";
import Manufacturers from "./Manufacturers";

const BOMDetail = ({ onSave, designId }) => {
  const { designData } = useDesign();

  // Extracting materials from the designData specifications
  const materials = designData?.specifications
    ? Object.values(designData.specifications).filter(
        (item) => typeof item === "string"
      )
    : [];

  return (
    <div className="flex flex-1 gap-6 py-6">
      <div className="min-w-1/2 w-1/2 bg-white p-1 rounded-lg overflow-y-auto">
        <BomInfo />
        {/* <ActionBar /> Actions specific to BOM */}
      </div>
      <div className="min-w-1/2 w-1/2 lg:w-1/2 bg-gray-100 p-6 rounded-[30px] shadow-md">
        <Manufacturers
          materials={materials}
          designId={designId}
          onDesignSave={onSave}
        />
      </div>
    </div>
  );
};

export default BOMDetail;
