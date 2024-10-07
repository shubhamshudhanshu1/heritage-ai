import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const OrderHeader = ({}) => {
  const order = {
    order_id: "RD66D558460E4E640C8D",
    shipment_id: "17255278005521453230",
    order_date: "2024-09-02T11:46:40+00:00",
    channel: {
      name: "Reliancedigital",
      logo: "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/company/1/applications/62a98346c2f4735b4606e406/application/pictures/free-logo/original/1qELAceYg-reliancedigital.png",
      url: "https://reliancedigital.jiox0.de",
    },
    prices: {
      amount_paid: 100,
      currency: "INR",
    },
    payment_method: "Prepaid",
    items: [
      {
        name: "Gionee A1 Smart Phone",
        sku: "491297543",
        quantity: 1,
        price: 100,
        image:
          "https://cdn.pixelbin.io/v2/jmd-asp/jmd-np/wrkr/jiox0/products/pictures/item/free/270x0/Vd5H2F1oc-S_hy8ylZTY-hp-chromebook-11mk-g9-ee-laptop-493837955-i-1-1200wx1200h.jpeg", // You can replace this with the correct image path
      },
    ],
    fulfillment: {
      location_code: "V054",
      location_name: "RRL Digital Sultanpur NDC",
      estimated_shipping_charges: 0,
      delivery_partner: "Self Delivery",
      packaging: "SYSTEM DEFAULT",
    },
    status: {
      current: "Placed",
      breach: 28,
      breach_date: "Sep 4, 2024",
    },
  };
  const router = useRouter();
  return (
    <div className="border-b pb-2 mb-4 flex justify-between bg-white p-4">
      <h1 className="text-xl font-semibold">
        {order.order_id} (1 shipment) |{" "}
        <span className="text-gray-500">
          {dayjs(order.order_date).format("MMM D, YYYY, h:mm A")}
        </span>
      </h1>
      <div className="mb-4">
        <Button
          variant="text"
          className="text-blue-500"
          onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default OrderHeader;
