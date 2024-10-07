import { getOrders } from "@/data/orders";
import OrderFilters from "./components/Filters";
import OrderTable from "./components/OrdersTable";
import OrderTabs from "./components/OrderTabs";
import { Button, Typography } from "@mui/material";

const orders = [
  {
    id: 1,
    channel: "reliancedigital",
    shipmentId: "1725528005521453230",
    price: "INR 100.00",
    tags: "STANDARD DELIVERY",
    status: "PLACED",
    itemImage: "/laptop.png",
    processBy: "- 27 days 20 hrs",
  },
  // Add more orders as needed
];

const OrdersPage = async ({ searchParams }) => {
  const orders = await getOrders(searchParams);
  console.log({ orders });

  return (
    <div className="bg-gray-100 h-full flex flex-col gap-6">
      <div className="px-6 flex items-center justify-between p-4 bg-white box-content">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          My Orders
        </Typography>
      </div>
      <div className="p-4 mx-6 py-6  flex flex-col gap-6 flex-1 overflow-auto bg-white ">
        <OrderFilters />
        <OrderTabs />
        <OrderTable orders={orders.items} />
      </div>
    </div>
  );
};

export default OrdersPage;
