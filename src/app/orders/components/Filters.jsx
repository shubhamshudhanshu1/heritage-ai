// components/Filters.js
"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

const Filters = () => {
  const searchParams = useSearchParams();

  // State for filters
  const [searchType, setSearchType] = useState(
    searchParams.get("searchType") || "Auto"
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [dateRange, setDateRange] = useState(
    searchParams.get("dateRange")
      ? dayjs(searchParams.get("dateRange"))
      : dayjs()
  );
  const [fulfillmentLocation, setFulfillmentLocation] = useState(
    searchParams.get("fulfillmentLocation") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");

  // Update search parameters when filter values change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchType) params.set("searchType", searchType);
    if (search) params.set("search", search);
    if (dateRange) params.set("dateRange", dateRange.format("YYYY-MM-DD"));
    if (fulfillmentLocation)
      params.set("fulfillmentLocation", fulfillmentLocation);
    if (sortBy) params.set("sortBy", sortBy);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  }, [searchType, search, dateRange, fulfillmentLocation, sortBy]);

  const commonSx = {
    width: "100%",
    height: "40px", // Ensure the same height for all elements
  };

  const datePickerSx = {
    "& .MuiInputBase-root": {
      height: "40px", // Match the height of other components
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-between mb-6 items-center space-x-4">
        {/* Search Type Select */}
        <FormControl fullWidth>
          <InputLabel>Search Type</InputLabel>
          <Select
            label="Search Type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            variant="outlined"
            sx={commonSx}>
            <MenuItem value="Auto">Auto</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
          </Select>
        </FormControl>

        {/* Search Input */}
        <TextField
          label="Search"
          value={search}
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by "
          variant="outlined"
          fullWidth
          sx={commonSx}
        />

        {/* Date Range Picker */}
        <DatePicker
          label="Date Range"
          sx={{ ...commonSx, ...datePickerSx }}
          value={dateRange}
          onChange={(newDate) => setDateRange(newDate)}
          renderInput={(params) => (
            <TextField {...params} size="small" sx={commonSx} />
          )}
        />

        {/* Fulfillment Location Select */}
        <FormControl fullWidth>
          <InputLabel>Fulfillment Location</InputLabel>
          <Select
            label="Fulfillment Location"
            value={fulfillmentLocation}
            size="small"
            sx={{ ...commonSx }}
            onChange={(e) => setFulfillmentLocation(e.target.value)}
            variant="outlined">
            <MenuItem value="warehouse-1">Warehouse 1</MenuItem>
            <MenuItem value="warehouse-2">Warehouse 2</MenuItem>
            <MenuItem value="warehouse-3">Warehouse 3</MenuItem>
          </Select>
        </FormControl>

        {/* Sort By Select */}
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            variant="outlined"
            sx={commonSx}>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>
      </div>
    </LocalizationProvider>
  );
};

export default Filters;
