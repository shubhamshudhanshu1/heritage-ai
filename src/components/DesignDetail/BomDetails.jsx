import ActionBar from "./ActionBar"; // Actions related to BOM
import BomInfo from "./BomInfo";
import Manufacturers from "./Manufacturers";

const BOMDetail = () => {
  return (
    <div className="flex flex-1 gap-6 p-6">
      <div className="w-1/2 bg-white p-6 rounded-lg  overflow-y-auto">
        <BomInfo />
        <ActionBar /> {/* Actions specific to BOM */}
      </div>
      <div className="lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
        <Manufacturers />
      </div>
    </div>
  );
};

export default BOMDetail;
