"use client";
import { Card, Avatar, Tooltip } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import logo from "/public/assets/images/ai.png";
import Image from "next/image";
import {
  deleteDesign,
  getRecentDesignsByUserId,
} from "@/redux/slices/designSlice";

const DesignCard = ({ design }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Extract values from the design object
  const {
    _id,
    designType,
    specifications,
    description = `Design a ${designType} made of ${
      specifications?.body_material || "material not specified"
    }`,
  } = design;

  const favImage = specifications?.fav_images?.[0] || logo; // Default image

  // Link to the specific design page
  const link = `/design/${_id}`;

  const handleEditClick = () => {
    router.push(link); // Navigate to edit page
  };

  const handleDeleteClick = () => {
    dispatch(deleteDesign(_id)).then(() => {
      dispatch(getRecentDesignsByUserId()); // Fetch recent designs after deletion
    });
  };

  return (
    <Card
      size="small"
      className="custom-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 w-full"
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
      }}
    >
      <Image
        src={favImage.src}
        alt={favImage.alt}
        height={50}
        width={50}
        className="object-cover rounded-full shadow-md"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-secondary-dark mb-1">
          {designType}
        </h3>
        <p className="text-secondary-light text-sm mb-0">{description}</p>
      </div>
      <div className="flex items-center space-x-2 gap-3 text-secondary">
        <Tooltip title="Edit">
          <EditOutlined
            className="cursor-pointer hover:text-primary-light"
            style={{ fontSize: "20px" }}
            onClick={handleEditClick}
            aria-label="Edit"
          />
        </Tooltip>
        <Tooltip title="Delete">
          <DeleteOutlined
            className="cursor-pointer hover:text-red-500"
            style={{ fontSize: "20px" }}
            onClick={handleDeleteClick}
            aria-label="Delete"
          />
        </Tooltip>
        {/* <Tooltip title="More options">
          <MoreOutlined
            className="cursor-pointer hover:text-primary-light"
            style={{ fontSize: "20px" }}
            rotate={90}
            aria-label="More options"
          />
        </Tooltip> */}
      </div>
    </Card>
  );
};

export default DesignCard;
