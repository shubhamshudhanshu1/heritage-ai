"use client";
import React, { useState } from "react";
import { Button } from "antd";
import OrdersTabContent from "@/components/Orders/OrdersTabContent"; // Adjust path if needed
import {
  DefaultImage,
  Tea1Image,
  Tea2Image,
} from "@/components/DesignDetail/mockdata"; // Ensure these are accessible
import dynamic from "next/dynamic";

// Use dynamic imports for specific components
const Tabs = dynamic(() => import("antd/es/tabs"), { ssr: false });

const { TabPane } = Tabs;

const MyOrders = () => {
  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const quotationColumns = [
    { title: "Vendor", dataIndex: "vendor", key: "vendor" },
    { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice" },
    { title: "Shipping", dataIndex: "shipping", key: "shipping" },
    { title: "Delivery In", dataIndex: "delivery", key: "delivery" },
    { title: "GST", dataIndex: "gst", key: "gst" },
    { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
    {
      title: "Chat",
      key: "chat",
      render: () => (
        <span role="img" aria-label="Chat">
          💬
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex space-x-2">
          <Button className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded-md text-sm">
            Approve
          </Button>
          <Button className="bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-md text-sm">
            Reject
          </Button>
          <Button className="bg-yellow-500 text-white hover:bg-yellow-600 px-3 py-1 rounded-md text-sm">
            Counter
          </Button>
        </div>
      ),
    },
  ];

  const quotationData = [
    {
      image: Tea1Image,
      title: "Tea tin design | 400 units",
      description: "Design a tea tin for my Darjeeling first flush tea...",
      actions: ["view", "delete", "notification"],
      tableData: [
        {
          key: "1",
          vendor: "Maharashtra Metal Works",
          unitPrice: "₹ 14",
          shipping: "₹ 1780",
          delivery: "18 Days",
          gst: "₹ 1008",
          totalAmount: "₹ 8388",
        },
        {
          key: "2",
          vendor: "Laser Tin Printers",
          unitPrice: "₹ 24",
          shipping: "Free",
          delivery: "10 Days",
          gst: "₹ 1728",
          totalAmount: "₹ 11288",
        },
        {
          key: "3",
          vendor: "VM Can Industries",
          unitPrice: "₹ 18",
          shipping: "₹ 500",
          delivery: "14 Days",
          gst: "₹ 1296",
          totalAmount: "₹ 8996",
        },
      ],
      tableColumns: quotationColumns,
      showAccordionIcon: true,
    },
    // More data...
  ];

  const productionData = [
    {
      image: Tea2Image,
      title: "Festive gift box | Mona Boxmakers, Chandigarh",
      description: "₹ 24/Unit | 400 Units | Expected Delivery: 04/Nov/2024",
      actions: ["view"],
    },
  ];

  const shippedData = [
    {
      image: Tea1Image,
      title: "Wedding invitation | VM Paperworks, Pondicherry",
      description: "₹ 14/Unit | 100 Units | Expected Delivery: 12/Nov/2024",
      actions: ["view"],
    },
    {
      image: DefaultImage,
      title: "Wedding invitation | VM Paperworks, Pondicherry",
      description: "₹ 14/Unit | 100 Units | Expected Delivery: 12/Nov/2024",
      actions: ["view"],
    },
  ];

  return (
    <div className="my-orders min-h-full">
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        className="font-medium"
        onChange={handleTabChange}
      >
        <TabPane tab={<span>Active Orders</span>} key="1">
          <div className="bg-gray-100 p-6 overflow-auto">
            <OrdersTabContent title="Quotation Requests" data={quotationData} />
            <OrdersTabContent title="In Production" data={productionData} />
            <OrdersTabContent title="Shipped" data={shippedData} />
          </div>
        </TabPane>
        <TabPane tab={<span>Delivered Orders</span>} key="2">
          <div className="bg-gray-100 p-6 overflow-auto">
            <OrdersTabContent title="In Production" data={productionData} />
            <OrdersTabContent title="Shipped" data={shippedData} />
          </div>
        </TabPane>
        <TabPane tab={<span>Disputes</span>} key="3">
          <div className="bg-gray-100 p-6 overflow-auto">
            <OrdersTabContent title="In Process" data={shippedData} />
            <OrdersTabContent title="Rejected" data={productionData} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyOrders;
