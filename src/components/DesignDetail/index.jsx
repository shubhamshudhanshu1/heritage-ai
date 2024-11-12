import { useState, useEffect } from "react";
import DesignHeader from "./DesignHeader";
import { DesignProvider, useDesign } from "./DesignContext";
import DesignDetail from "./DesignDetail";
import BOMDetail from "./BomDetails";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const DesignComponentContent = () => {
  const params = useParams();
  const { id } = params;
  const { designData, setDesignData } = useDesign();
  const [activeTab, setActiveTab] = useState("Design");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the design data based on the ID when component mounts
    const fetchDesignData = async () => {
      try {
        const response = await fetch(`/api/getDesignById?designId=${id}`);
        if (response.ok) {
          const { data = {} } = await response.json();
          setDesignData(data);
        } else {
          setDesignData({}); // If no design found, allow to start from scratch
        }
      } catch (error) {
        console.error("Error fetching design data:", error.message);
        setDesignData({});
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDesignData();
    else {
      setDesignData({});
    }
  }, [id, setDesignData]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-full">
      <DesignHeader />

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
