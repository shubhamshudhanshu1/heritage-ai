"use client";

import { Button } from "@mui/material";
import OrderHeader from "./components/OrderHeader";
import ShipmentDetails from "./components/ShipmentDetails";
import FulfillmentDetails from "./components/FulfillmentDetails";
import ItemDetails from "./components/ItemDetails";
import PriceBreakup from "./components/PriceBreakup";
import ChannelAndOrderDetails from "./components/ChannelAndOrderDetails";
import { DummyOrderDetails } from "@/dummyData/orders";

const OrderDetailsPage = () => {
  //   const router = useRouter();
  //   const { order_id } = router.query;

  // Sample order data (replace this with API call to fetch data)
  const order = {
    shipment_id: "17255278005521453230",
    price: 100,
    items: 1,
    status: "Placed",
    fulfillment: {
      location_code: "V054",
      location_name: "RRL Digital Sultanpur NDC",
      shipping_charges: 0.0,
      delivery_partner: "Self Delivery",
      packaging: "SYSTEM DEFAULT",
    },
    item_details: {
      name: "Gionee A1 Smart Phone",
      sku: "491297543",
      seller_identifier: "491297543",
      initial_qty: 1,
      final_qty: 1,
      price: 100.0,
      image: "/laptop.png", // Sample image
      progress: [
        { label: "Placed", completed: true },
        { label: "Confirmed", completed: false },
        { label: "DP Assigned", completed: false },
        { label: "Packed", completed: false },
        { label: "In Transit", completed: false },
        { label: "Out for Delivery", completed: false },
        { label: "Delivered", completed: false },
      ],
    },
  };
  const { order: OrderDetails, shipments } = DummyOrderDetails;

  return (
    <div className=" bg-gray-50 h-full overflow-auto text-sm">
      {/* <div className="bg-white shadow-md rounded-md p-4 mx-auto"> */}
      {/* Back Button */}

      {/* Order Header */}
      <OrderHeader order={order} />
      <div className="flex flex-row gap-5 overflow-auto p-4 ">
        <div className="bg-white flex-1 px-4 py-4  border border-gray-300">
          <ShipmentDetails shipment={shipments?.[0]} />
          <FulfillmentDetails
            fulfillment={shipments?.[0]?.fulfilling_store}
            shipment={shipments?.[0]}
          />
          <ItemDetails order={OrderDetails} />
          <PriceBreakup order={OrderDetails} />
        </div>

        {/* Channel and Other Details */}
        <div className="bg-white w-1/3 max-w-96 ">
          <ChannelAndOrderDetails order={OrderDetails} />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default OrderDetailsPage;
