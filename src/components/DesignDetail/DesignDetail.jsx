"use client";
import ChatHistory from "./ChatHistory";
import PreviewGallery from "./PreviewGallery";
import ActionBar from "./ActionBar";
import { useState } from "react";

const DesignDetail = () => {
  const [generatedImages, setGeneratedImages] = useState([]);

  return (
    <div className="flex flex-1 gap-6">
      <div className=" bg-white py-6 w-full">
        <ChatHistory />
      </div>
      {generatedImages.length > 0 ? (
        <div className="flex-1 bg-gray-100 p-6 rounded-[30px] shadow-lg overflow-y-auto">
          <PreviewGallery />
        </div>
      ) : null}
    </div>
  );
};

export default DesignDetail;
