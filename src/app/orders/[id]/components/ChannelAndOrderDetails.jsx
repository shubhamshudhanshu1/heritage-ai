import Image from "next/image";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ChannelAndOrderDetails = ({}) => {
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
  return (
    <div className="mt-6">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h3 className="font-semibold text-sm">Channel</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex items-center">
            <Image
              src={order?.channel?.logo}
              alt={order?.channel?.name}
              width={40}
              height={40}
              className="object-cover rounded-md"
            />
            <div className="ml-4">
              <a href={order?.channel?.url} className="text-blue-500 underline">
                {order?.channel?.name}
              </a>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Payment, Shipping, Billing Details */}
      <Accordion className="mt-2">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h3 className="font-semibold text-sm">Payment Method</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {order?.payment_method}: {order?.prices?.currency}{" "}
            {order?.prices?.amount_paid.toFixed(2)}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mt-2">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h3 className="font-semibold text-sm">Shipping Details</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div>Shipping information goes here...</div>
        </AccordionDetails>
      </Accordion>

      <Accordion className="mt-2">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h3 className="font-semibold text-sm">Billing Details</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div>Billing information goes here...</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ChannelAndOrderDetails;
