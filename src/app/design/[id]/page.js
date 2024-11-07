"use client";
import { Tabs, Card, Avatar } from "antd";
// import { MessageOutlined, HeartOutlined } from "@ant-design/icons";
import DesignDetail from "@/components/DesignDetail";
const { TabPane } = Tabs;

const DesignDetails = ({ params }) => {
  return (
    <div className="p-8">
      <DesignDetail />
    </div>
  );
};

export default DesignDetails;
