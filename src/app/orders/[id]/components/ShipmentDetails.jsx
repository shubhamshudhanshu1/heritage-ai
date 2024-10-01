import { Button } from "@mui/material";

const ShipmentDetails = ({ shipment }) => {
  console.log({ shipment });
  return (
    <>
      <div className="border-b pb-2 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-500 text-sm">Shipment ID</p>
            <h1 className="text-lg font-semibold">{shipment.shipment_id}</h1>
          </div>
          <div className="flex space-x-4">
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Confirm
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Price</p>
            <h2 className="text-lg font-semibold">
              INR 100.00
              {/* {shipment.pr.toFixed(2)} */}
            </h2>
          </div>
          <div>
            <p className="text-gray-500">Items</p>
            <h2 className="text-lg font-semibold">{shipment.items.length}</h2>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span className="bg-green-100 text-green-700 px-2 py-1  text-xs">
              Placed{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShipmentDetails;
