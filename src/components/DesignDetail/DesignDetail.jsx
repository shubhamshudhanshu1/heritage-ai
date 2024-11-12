"use client";
import ChatHistory from "./ChatHistory";
import { useDesign } from "./DesignContext";
import PreviewGallery from "./PreviewGallery";

const DesignDetail = () => {
  const { setDesignData, designData } = useDesign();

  const handleDesignPayload = (payload) => {
    setDesignData(payload);
  };
  console.log({ designData });

  let generatedImages = designData.specifications?.generatedImages || [];

  return (
    <div className="flex flex-1 gap-6">
      <div
        className={`bg-white pt-6 ${
          generatedImages.length > 0 ? "w-1/2" : "w-full"
        }`}
      >
        <ChatHistory
          handleChange={handleDesignPayload}
          savedData={designData}
        />
      </div>
      {generatedImages.length > 0 && (
        <div className="w-1/2 bg-gray-100 rounded-[30px] shadow-lg p-6 mt-4">
          <PreviewGallery />
        </div>
      )}
    </div>
  );
};

export default DesignDetail;
