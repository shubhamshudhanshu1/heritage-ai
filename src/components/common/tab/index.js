import React from "react";
import { Tabs, Tab, Box, Divider } from "@mui/material";
import PropTypes from "prop-types";

const TabPanel = ({ value, index, children }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box>{children}</Box>}
  </div>
);

TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

const CustomTabs = ({ tabs, onChange, value }) => {
  const selectedIndex = tabs.findIndex((tab) => tab.id === value);
  const handleChange = (event, newIndex) => {
    const newValue = tabs[newIndex].id;
    onChange(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={selectedIndex} onChange={handleChange} centered>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={tab.label}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </Tabs>
      <Divider />
      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} value={selectedIndex} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CustomTabs;
