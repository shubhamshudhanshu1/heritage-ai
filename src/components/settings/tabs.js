import React, { useState } from "react";
import { Tabs, Tab, Box, Divider } from "@mui/material";
import GlobalSettings from "./globalSettings";
import PageSettings from "./pageSettings";

const TabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const SettingsTabs = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Global Setting" />
        <Tab label="Page Setting" />
      </Tabs>
      <Divider />
      <TabPanel value={value} index={0}>
        <GlobalSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PageSettings />
      </TabPanel>
    </Box>
  );
};

export default SettingsTabs;
