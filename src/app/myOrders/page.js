"use client";
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import OrdersTabContent from "@/components/Orders/OrdersTabContent";

// Use dynamic imports for specific components
const Tabs = dynamic(() => import("antd/es/tabs"), { ssr: false });

const { TabPane } = Tabs;

const MyOrders = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [quotationData, setQuotationData] = useState({
    draft: [],
    approved: [],
    rejected: [],
    new: [],
  });
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      fetchQuotations(session.user.id);
    }
  }, [session?.user?.id]);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const identifier =
        session.user.role.roleName === "vendor"
          ? `vendorId=${session.user.id}`
          : `userId=${session.user.id}`;
      const response = await fetch(`/api/quotations?${identifier}`);
      const result = await response.json();

      if (response.ok) {
        const segregatedData = result.quotations.reduce(
          (acc, quotation) => {
            const designStatus = quotation.designId?.status || "other";
            acc[designStatus] = acc[designStatus] || [];
            acc[designStatus].push(quotation);
            return acc;
          },
          { draft: [], approved: [], rejected: [], new: [] }
        );

        setQuotationData(segregatedData);
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
    { title: "Vendor", dataIndex: ["vendorId", "companyName"], key: "vendor" },
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
              title="Draft Quotations"
              data={quotationData.draft.map((quotation) => ({
                image:
                  quotation.designId?.specifications?.fav_images?.[0]?.src ||
                  "",
                title: `${quotation.designId.designType} | ${quotation.quantity} units`,
                description: `${quotation.designId.specifications.body_material}, ${quotation.designId.specifications.sleeves_material}`,
                tableData: [quotation],
                tableColumns: quotationColumns,
                showAccordionIcon: true,
              }))}
              loading={loading}
            />
            <OrdersTabContent
              title="New Quotations"
              data={quotationData.new.map((quotation) => ({
                image: quotation.designId?.previewImages?.[0]?.src || "",
                title: `${quotation.designId.designType} | ${quotation.quantity} units`,
                description: `${quotation.designId.specifications.body_material}, ${quotation.designId.specifications.sleeves_material}`,
                tableData: [quotation],
                tableColumns: quotationColumns,
                showAccordionIcon: true,
              }))}
              loading={loading}
            />
          </div>
        </TabPane>
        <TabPane tab={<span>Delivered Orders</span>} key="2">
          <div className="bg-gray-100 p-6 overflow-auto">
            <OrdersTabContent
              title="Approved Quotations"
              data={quotationData.approved}
            />
            <OrdersTabContent
              title="Rejected Quotations"
              data={quotationData.rejected}
            />
          </div>
        </TabPane>
        <TabPane tab={<span>Disputes</span>} key="3">
          <div className="bg-gray-100 p-6 overflow-auto">
            <OrdersTabContent
              title="In Process"
              data={quotationData.rejected}
            />
            <OrdersTabContent title="Rejected" data={quotationData.draft} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyOrders;
