import React from "react";
import { StarFilled } from "@ant-design/icons";

const ManufacturerCard = ({
  name,
  location,
  price,
  minUnits,
  delivery,
  experience,
  jobs,
  rating,
  description,
  isSelected = false,
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md mb-4  ${
        isSelected ? "bg-green-50 border-green-500 shadow-lg" : "bg-white" // Add border-green-500 class if isSelected is true, otherwise:bg-white
      }`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-normal  text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
        <div className="text-xs">
          <div className="text-xl text-end font-normal text-gray-800">
            {price}/Unit
          </div>
          <div className="text-sm text-gray-500">
            Min. {minUnits} units | Delivery in {delivery} days
          </div>
        </div>
      </div>
      <div className="text-gray-600 text-sm"></div>
      <p className="text-gray-600 text-xs ">{description}</p>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            {experience} years
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
            {jobs} jobs
          </span>
        </div>
        <div className="flex items-center text-yellow-500">
          <StarFilled />
          <span className="ml-1 text-sm">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerCard;
