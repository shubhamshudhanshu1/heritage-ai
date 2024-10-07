import dayjs from "dayjs";

const FulfillmentDetails = ({ fulfillment, shipment }) => {
  const processBy = shipment?.estimated_sla_time
    ? dayjs(shipment.estimated_sla_time).format("MMM D, YYYY, h:mm A")
    : "N/A";

  return (
    <div className="p-4 rounded-md mb-4 flex flex-col gap-3 ">
      <div className="flex gap-2 justify-between text-xs ">
        <span className="text-orange-600 border text-center  uppercase border-orange-600 px-2 py-2">
          Standard Delivery
        </span>
        <span className="px-4 py-2 text-red-600">{processBy}</span>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <div className="-mb-3 text-sm text-blue-600 bg-blue-500/20 border border-blue-600 px-2 py-1 w-fit ">
          Fulfillment Details
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs border px-4 py-6">
          <div className="text-xs">
            <div className="font-semibold text-sm text-gray-500">
              Location Code
            </div>
            <div>{fulfillment?.code}</div>
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-500">
              Location Id
            </div>
            <div>{fulfillment?.id}</div>
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-500">
              Location Name
            </div>
            <div className="">{fulfillment?.name}</div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap  gap-3 mt-2 text-xs">
          <div className=" bg-gray-100 px-2 py-2 rounded-lg  shrink-1 flex gap-2 shrink-0 ">
            <div className="font-semibold ">Estimated Shipping Charges</div>
            <div>INR 0.00</div>
          </div>
          <div className=" bg-gray-100 px-2 py-2 rounded-lg  flex gap-2 shrink-0">
            <div className="font-semibold ">Delivery Partner</div>
            <div>Self Delivery</div>
          </div>
          <div className=" bg-gray-100 px-2 py-2 rounded-lg  flex gap-2 shrink-0">
            <div className="font-semibold ">Packaging</div>
            <div>System Default</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FulfillmentDetails;
