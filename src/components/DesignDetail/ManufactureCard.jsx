import React from "react";
import { StarFilled } from "@ant-design/icons";

const ManufacturerCard = ({
  companyName,
  itemsPrinted,
  materialsAvailable,
  pricing,
  serviceablePincodes,
  createdAt,
  mobileNumber,
  isSelected = false,
}) => {
  return (
    <div
      className={`p-4 rounded-xl shadow-md mb-4 ${
        isSelected ? "bg-green-50 border-green-500 shadow-lg" : "bg-white" // Add border-green-500 class if isSelected is true, otherwise:bg-white
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-normal text-gray-800 font-semibold">
            {companyName}
          </p>
          <p className="text-xs text-gray-500">{`Contact: ${mobileNumber}`}</p>
        </div>
        <div className="text-xs">
          <div className="text-xl text-end font-normal text-gray-500 font-semibold">
            ₹ {pricing}/Unit
          </div>
          <div className="text-sm text-gray-400">
            {serviceablePincodes.length > 0
              ? `Pincodes: ${serviceablePincodes.join(", ")}`
              : "No serviceable pincodes"}
          </div>
        </div>
      </div>
      <div className="text-gray-600 text-sm"></div>
      <p className="text-gray-600 text-xs mt-2">
        {`Materials Available: ${materialsAvailable.join(", ")}`}
      </p>
      <p className="text-gray-600 text-xs mt-2">
        {`Items Printed: ${itemsPrinted.join(", ")}`}
      </p>
      <div className="flex justify-between mt-4">
        <div className="flex space-x-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            {`Created at: ${new Date(createdAt).toLocaleDateString()}`}
          </span>
        </div>
        <div className="flex items-center text-yellow-500">
          <StarFilled />
          <span className="ml-1 text-sm">4.5</span>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerCard;
