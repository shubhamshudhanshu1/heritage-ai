"use client";

import React, { useState, useEffect } from "react";
import { Tabs as MuiTabs, Tab } from "@mui/material";
import { useSearchParams } from "next/navigation";

const OrdersTab = () => {
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(
    searchParams.get("tab") || "unfulfilled"
  );

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", newValue);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <MuiTabs
      value={selectedTab}
      onChange={handleTabChange}
      sx={{
        borderBottom: "1px solid #ddd",
        marginBottom: "16px",
        minHeight: "48px",
      }}
      indicatorColor="primary"
      textColor="primary"
      aria-label="order-tabs">
      <Tab
        label="Unfulfilled"
        value="unfulfilled"
        sx={{
          textTransform: "none",
          fontWeight: selectedTab === "unfulfilled" ? "bold" : "normal",
        }}
      />
      <Tab
        label="Processed"
        value="processed"
        sx={{
          textTransform: "none",
          fontWeight: selectedTab === "processed" ? "bold" : "normal",
        }}
      />
      <Tab
        label="Returns"
        value="returns"
        sx={{
          textTransform: "none",
          fontWeight: selectedTab === "returns" ? "bold" : "normal",
        }}
      />
      <Tab
        label="Action Centre"
        value="actionCentre"
        sx={{
          textTransform: "none",
          fontWeight: selectedTab === "actionCentre" ? "bold" : "normal",
        }}
      />
    </MuiTabs>
  );
};

export default OrdersTab;
