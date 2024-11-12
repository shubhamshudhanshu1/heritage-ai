import { useState, useEffect } from "react";
import DesignHeader from "./DesignHeader";
import { DesignProvider, useDesign } from "./DesignContext";
import DesignDetail from "./DesignDetail";
import BOMDetail from "./BomDetails";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  createDesign,
  updateDesign,
  getDesignById,
} from "./../../redux/slices/designSlice";

const DesignComponentContent = () => {
  const params = useParams();
  const { id } = params;
  const { designData, setDesignData } = useDesign();
  const [activeTab, setActiveTab] = useState("Design");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the design data based on the ID when component mounts
    const fetchDesignData = async () => {
      try {
        if (id && id !== "new") {
          const resultAction = await dispatch(getDesignById(id)).unwrap();
          if (resultAction.data) {
            setDesignData(resultAction.data);
          } else {
            setDesignData({}); // If no design found, allow to start from scratch
          }
        } else {
          setDesignData({});
        }
      } catch (error) {
        console.error("Error fetching design data:", error);
        setDesignData({});
      } finally {
        setLoading(false);
      }
    };

    fetchDesignData();
  }, [id]);

  const handleSave = async (callback) => {
    try {
      if (designData?._id) {
        // Update existing design
        await dispatch(
          updateDesign({ designId: designData._id, updateData: designData })
        ).unwrap();
      } else {
        // Create new design
        const resultAction = await dispatch(createDesign(designData)).unwrap();
        setDesignData(resultAction.data); // Update with the new design data, including the ID
      }
      console.log("Design saved successfully");
    } catch (error) {
      console.error("Error saving design data:", error);
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-full">
      <DesignHeader onSave={handleSave} designId={id} />

      {/* Tab Navigation */}
      <div className="flex border-b-2 font-medium">
        <button
          className={`px-4 py-2 ${
            activeTab === "Design" ? "border-b-2 border-green-500 top-1" : ""
          }`}
          onClick={() => setActiveTab("Design")}
        >
          Design
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "BOM" ? "border-b-2 border-green-500" : ""
          }`}
          onClick={() => setActiveTab("BOM")}
        >
          BOM
        </button>
      </div>

      {/* Render based on Active Tab */}
      <div className="flex-1 min-h-[600px]">
        {activeTab === "Design" && <DesignDetail />}
        {activeTab === "BOM" && <BOMDetail />}
      </div>
    </div>
  );
};

const DesignComponent = () => (
  <DesignProvider>
    <DesignComponentContent />
  </DesignProvider>
);

export default DesignComponent;
