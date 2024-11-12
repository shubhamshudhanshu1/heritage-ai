import { useState, useEffect } from "react";
import { Button, message } from "antd";
import ManufacturerCard from "./ManufactureCard";
import { useSession } from "next-auth/react";
import { useDesign } from "./DesignContext";

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
        className="px-2 py-1 border-r text-gray-500 hover:bg-gray-100"
      >
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
        className="px-2 py-1 border-l text-gray-500 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};

/**
 * Renders a list of vendors with single-selection functionality.
 * Each vendor is displayed using the ManufacturerCard component.
 * Includes a counter for specifying quantity and a button to request a quote.
 */
const Vendors = ({ materials }) => {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(50);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { designData } = useDesign();

  let designId = designData._id;
  useEffect(() => {
    const fetchVendors = async () => {
      if (!materials || materials.length === 0) {
        setVendors([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `/api/vendors?materials=${materials.join(",")}`
        );
        const result = await response.json();
        setVendors(result.data);
        setError(null);
      } catch (err) {
        setError("Failed to load vendors");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [materials]);

  const handleSelect = (index) => {
    // Toggle selection for single-select mode
    setSelectedVendor((prevSelected) =>
      prevSelected === index ? null : index
    );
  };

  const isSelected = (index) => selectedVendor === index;

  const handleRequestQuote = async (designId) => {
    if (selectedVendor === null || !session || !designId) return;

    const vendor = vendors[selectedVendor];
    const quotationData = {
      designId: designId, // Replace with actual designId
      userId: session.user.id,
      vendorId: vendor._id,
      unitPrice: vendor.unitPrice, // Assuming vendor provides unitPrice
      shippingCost: vendor.shippingCost, // Assuming vendor provides shippingCost
      deliveryTime: vendor.deliveryTime, // Assuming vendor provides deliveryTime
      gst: vendor.gst, // Assuming vendor provides gst
      quantity,
    };

    try {
      const response = await fetch("/api/quotations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quotationData),
      });

      const result = await response.json();

      if (response.ok) {
        message.success("Quotation created successfully");
      } else {
        message.error(result.error || "Failed to create quotation");
      }
    } catch (error) {
      console.error("Error creating quotation: ", error);
      message.error("Failed to create quotation");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-lg text-center font-semibold text-gray-500 mb-4">
        Select Vendor
      </h2>
      <div className="flex flex-col justify-between">
        {vendors && vendors.length > 0 ? (
          vendors.map((vendor, index) => (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className="cursor-pointer"
            >
              <input
                type="radio"
                checked={isSelected(index)}
                onChange={() => handleSelect(index)}
                className="mr-3"
                hidden
              />

              <ManufacturerCard {...vendor} isSelected={isSelected(index)} />
            </div>
          ))
        ) : (
          <div>No vendors available for the selected materials</div>
        )}
        <div className="flex justify-end p-4 items-center space-x-3">
          <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
          <Button
            type="primary"
            disabled={selectedVendor === null}
            onClick={() => handleRequestQuote(designId)}
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:!bg-green-600 transition duration-200"
          >
            Request Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
