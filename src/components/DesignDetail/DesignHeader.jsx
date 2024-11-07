import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDesign } from "./DesignContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DesignHeader = () => {
  const router = useRouter();
  const {
    designData: { image = "", title = "", status = "" },
  } = useDesign();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg mb-6">
      <div className="flex items-center">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 mr-4"
          aria-label="Back"
        >
          <ArrowLeftOutlined style={{ fontSize: "20px" }} />
        </button>

        {/* Design Icon and Title */}
        <Image
          src={image}
          alt={`${title} Icon`}
          className="rounded-full w-10 h-10 mr-3"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <span className="text-gray-500 text-sm">({status})</span>
        </div>
      </div>

      {/* Save Button */}
      <button className="bg-primary w-26 text-white px-4 py-2 rounded-full shadow-md hover:bg-primary-dark transition duration-200">
        Save
      </button>
    </header>
  );
};

export default DesignHeader;
