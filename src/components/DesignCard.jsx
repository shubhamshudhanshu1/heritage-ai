"use client";
import { Card, Avatar, Tooltip } from "antd";
import { MoreOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const DesignCard = ({ image, title, description, link }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(link); // Navigate to edit page
  };
  console.log({ image, link });

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
      <Avatar src={image} style={{ width: "48px", height: "48px" }} />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-secondary-dark mb-1">
          {title}
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
        <Tooltip title="More options">
          <MoreOutlined
            className="cursor-pointer hover:text-primary-light"
            style={{ fontSize: "20px" }}
            rotate={90}
            aria-label="More options"
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export default DesignCard;
