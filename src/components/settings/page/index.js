import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import CommonLabel from "../../common/label";
import AddSchemaModal from "../addSchema";
import Tabs from "../../common/tab";
import Settings from "./settings";
import Sections from "./sections";

function PageSettings() {
  const [page, setPage] = useState("");

  const tabs = [
    {
      label: "Settings",
      content: <Settings />,
    },
    {
      label: "Sections",
      content: <Sections />,
    },
  ];

  return (
    <div>
      <FormControl
        fullWidth
        margin="normal"
        required
        sx={{ margin: 0 }}
        className="py-2 pb-4"
      >
        <CommonLabel>Page</CommonLabel>
        <Select
          labelId="tenant-select-label"
          name="User Type"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="tenant1"> Home</MenuItem>
          <MenuItem value="tenant2">Cart</MenuItem>
          <MenuItem value="tenant3">Review</MenuItem>
        </Select>
      </FormControl>
      <Box className="pt-2">
        <Tabs tabs={tabs} />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {}}
      >
        Save Changes
      </Button>
    </div>
  );
}

export default PageSettings;
