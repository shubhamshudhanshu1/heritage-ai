const PriceBreakup = ({}) => {
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
        image: "/laptop.png", // You can replace this with the correct image path
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
    <div className="bg-white p-4 rounded-md">
      <h2 className="font-semibold text-sm">Price Breakup</h2>
      <div className="flex justify-between mt-2">
        <div className="text-gray-600">Total</div>
        <div>INR {order?.prices?.amount_paid.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default PriceBreakup;
