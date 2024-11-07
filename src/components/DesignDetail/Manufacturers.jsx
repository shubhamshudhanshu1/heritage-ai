import { useState } from "react";
import { manufacturersdata } from "./mockdata";
import { Button } from "antd";
import ManufacturerCard from "./ManufactureCard";

/**
 * Counter component for increment and decrement of quantity.
 */
const QuantityCounter = ({ quantity, setQuantity }) => {
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center border rounded">
      <button
        onClick={decrement}
        className="px-2 py-1 border-r text-gray-500 hover:bg-gray-100">
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="w-16 text-center outline-none"
      />
      <button
        onClick={increment}
        className="px-2 py-1 border-l text-gray-500 hover:bg-gray-100">
        +
      </button>
    </div>
  );
};

/**
 * Renders a list of manufacturers with single-selection functionality.
 * Each manufacturer is displayed using the ManufacturerCard component.
 * Includes a counter for specifying quantity and a button to request a quote.
 */
const Manufacturers = () => {
  const [quantity, setQuantity] = useState(50);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  const handleSelect = (index) => {
    // Toggle selection for single-select mode
    setSelectedManufacturer((prevSelected) =>
      prevSelected === index ? null : index
    );
  };

  const isSelected = (index) => selectedManufacturer === index;

  return (
    <div>
      <h2 className="text-lg text-center font-semibold   text-gray-500 mb-4">
        Select Manufacturer
      </h2>
      {manufacturersdata.map((manufacturer, index) => (
        <div
          key={index}
          onClick={() => handleSelect(index)}
          className="cursor-pointer">
          <input
            type="radio"
            checked={isSelected(index)}
            onChange={() => handleSelect(index)}
            className="mr-3"
            hidden
          />

          <ManufacturerCard {...manufacturer} isSelected={isSelected(index)} />
        </div>
      ))}
      <div className="flex justify-end  p-4 items-center space-x-3">
        <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
        <Button
          type="primary"
          disabled={selectedManufacturer === null}
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:!bg-green-600 transition duration-200">
          Request Quote
        </Button>
      </div>
    </div>
  );
};

export default Manufacturers;
