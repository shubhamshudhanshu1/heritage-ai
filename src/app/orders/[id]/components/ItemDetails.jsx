import Image from "next/image";

const ItemDetails = ({}) => {
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
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <h2 className="font-semibold text-sm">Item Details</h2>
      <div className="flex justify-between items-center mt-2">
        <Image
          src={order?.items[0]?.image}
          alt="Item"
          width={50}
          height={50}
          className="object-cover rounded-md"
        />
        <div className="flex-grow ml-4">
          <div className="font-semibold">{order?.items[0].name}</div>
          <div className="text-gray-500">SKU: {order?.items[0].sku}</div>
        </div>
        <div className="text-sm">
          <div>Initial Qty: {order?.items[0].quantity}</div>
          <div>
            Price: {order?.prices.currency} {order?.items[0].price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
