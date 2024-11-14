import { useMemo, useState } from "react";
import { Card, Avatar, Tooltip, Table, Badge } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  BellOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "./ordersLayout.css";
import { useRouter } from "next/navigation";

const OrderDetailsCard = ({
  image,
  title,
  description,
  actions = [],
  tableData = null,
  tableColumns = [],
  showAccordionIcon = false,
  vendorName = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const router = useRouter();
  const handleView = () => {
    router.push(`/design/${designId._id}`);
  };
  const notificationCount = useMemo(() => {
    return Math.floor(Math.random() * 100) / 1;
  }, []);

  return (
    <div className="mb-8">
      <Card
        className="rounded-3xl  shadow-md bg-white p-4"
        bodyStyle={{ padding: 0, overflow: "hidden" }}
      >
        <div className="flex items-start justify-between p-3 items-center">
          <div className="flex items-center gap-3">
            <Avatar
              src={image}
              style={{ objectFit: "contain", width: "48px", height: "48px" }}
              className="mr-1 rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h4 className="text-sm  font-semibold text-gray-800">{title}</h4>
              <p className="text-gray-500 text-xs">
                {tableData[0]?.vendorId?.companyName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {actions.includes("view") && (
              <Tooltip title="View">
                <EyeOutlined
                  style={{ fontSize: "16px" }}
                  className="text-gray-500 hover:text-blue-500 cursor-pointer"
                  onClick={handleView}
                />
              </Tooltip>
            )}
            {actions.includes("delete") && (
              <Tooltip title="Delete">
                <DeleteOutlined
                  style={{ fontSize: "16px" }}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                />
              </Tooltip>
            )}
            {actions.includes("notification") && (
              <Tooltip title="Notification">
                <Badge count={10} offset={[6, -2]} color="red">
                  <BellOutlined
                    style={{ fontSize: "18px" }}
                    className="text-red-500 hover:text-yellow-500 cursor-pointer"
                  />
                </Badge>
              </Tooltip>
            )}
            {showAccordionIcon && (
              <Tooltip title={isExpanded ? "Collapse" : "Expand"}>
                {isExpanded ? (
                  <UpOutlined
                    style={{ fontSize: "16px" }}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer pl-1.5"
                    onClick={toggleExpand}
                  />
                ) : (
                  <DownOutlined
                    style={{ fontSize: "16px" }}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer pl-1.5"
                    onClick={toggleExpand}
                  />
                )}
              </Tooltip>
            )}
          </div>
        </div>

        {isExpanded && tableData && tableColumns && (
          <div className="mt-4 overflow-auto">
            <Table
              columns={tableColumns}
              dataSource={tableData}
              pagination={false}
              className="custom-table"
              bordered={false}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

OrderDetailsCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.string), // 'view', 'delete', 'notification'
  tableData: PropTypes.array,
  tableColumns: PropTypes.array,
  showAccordionIcon: PropTypes.bool,
};

export default OrderDetailsCard;
