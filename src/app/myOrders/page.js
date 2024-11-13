"use client";
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import OrdersTabContent from "@/components/Orders/OrdersTabContent"; // Adjust path if needed
import {
  DefaultImage,
  Tea1Image,
  Tea2Image,
} from "@/components/DesignDetail/mockdata"; // Ensure these are accessible
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

// Use dynamic imports for specific components
const Tabs = dynamic(() => import("antd/es/tabs"), { ssr: false });

const { TabPane } = Tabs;

const MyOrders = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [quotationData, setQuotationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      fetchQuotations(session.user.id);
    }
  }, [session?.user?.id]);

  const fetchQuotations = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quotations?userId=${userId}`);
      const result = await response.json();

      if (response.ok) {
        setQuotationData(result.quotations);
      } else {
        message.error(result.error || "Failed to fetch quotations");
      }
    } catch (error) {
      console.error("Error fetching quotations: ", error);
      message.error("Failed to fetch quotations");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const quotationColumns = [
    { title: "Vendor", dataIndex: ["vendorId", "name"], key: "vendor" },
    { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice" },
    { title: "Shipping", dataIndex: "shippingCost", key: "shipping" },
    { title: "Delivery In", dataIndex: "deliveryTime", key: "delivery" },
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
            <OrdersTabContent
              title="Quotation Requests"
              data={quotationData.map((quotation) => ({
                image: Tea1Image, // Assuming a default image for now
                title: `${quotation.designId.name} | ${quotation.quantity} units`,
                description: quotation.designId.description,
                tableData: [quotation],
                tableColumns: quotationColumns,
                showAccordionIcon: true,
              }))}
              loading={loading}
            />
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
