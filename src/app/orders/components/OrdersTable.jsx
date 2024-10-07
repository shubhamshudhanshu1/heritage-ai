"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const OrderRow = ({ order }) => {
  const router = useRouter(); // Initialize the router

  // Fallbacks for missing data
  const orderDetailLink = `/orders/${order.shipment_id}`; // Dynamic link to order detail page
  const logoUrl = order?.channel?.logo || "/default-image.png"; // Default logo if missing
  const channel = order?.channel?.name || "-";
  const shipmentId = order?.shipment_id || "N/A";
  const priceEffective = order?.prices?.price_effective || "N/A";
  const tags = order?.fulfillment_tags?.length
    ? order.fulfillment_tags.join(", ")
    : "Standard Delivery"; // Default tag if missing
  const status = order?.shipment_status?.status || "N/A";
  const statusTitle = order?.shipment_status?.title || "Unknown Status";

  // Default image for product if missing
  const imageUrl =
    order?.bags?.[0]?.brand?.logo ||
    order?.meta?.external?.primary_image_url ||
    "/default-image.png";

  // Date formatting
  const processBy = order?.estimated_sla_time
    ? dayjs(order.estimated_sla_time).format("MMM D, YYYY, h:mm A")
    : "N/A";
  const orderDate = order?.order_date
    ? dayjs(order.order_date).format("MMM D, YYYY, h:mm A")
    : "N/A";

  // Function to handle row click
  const handleRowClick = () => {
    router.push(orderDetailLink); // Navigate to the order details page
  };

  return (
    <tr
      onClick={handleRowClick} // Attach the click handler to the row
      className="border-b text-xs cursor-pointer hover:bg-gray-100">
      <td className="px-4 py-2">
        <Image
          src={logoUrl}
          alt={`Channel logo`}
          width={40}
          height={40}
          className="object-cover"
        />
        <p className="text-gray-500"> {channel}</p>
      </td>
      <td className="px-4 py-2 text-blue-500">
        <div>
          <p> {shipmentId}</p>
          <p className="text-gray-500">Placed: {orderDate} </p>
        </div>
      </td>
      <td className="px-4 py-2">
        <p>₹{priceEffective}</p>
        <span className="text-gray-500">PREPAID</span>
      </td>
      <td className="px-4 py-2">
        <span className="text-orange-600 border uppercase border-orange-600 px-2 py-1 ">
          {tags}
        </span>
      </td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1  border uppercase ${
            status === "placed"
              ? "text-green-600 border-green-600"
              : status === "shipped"
              ? "text-blue-600 border-blue-600"
              : status === "cancelled"
              ? "text-red-600 border-red-600"
              : "text-gray-600 border-gray-600"
          }`}>
          {statusTitle}
        </span>
      </td>
      <td className="px-4 py-2">
        <Image
          src={imageUrl}
          alt={`Item image`}
          width={40}
          height={40}
          className="object-cover"
        />
      </td>
      <td className="px-4 py-2 text-red-600">{processBy}</td>
    </tr>
  );
};

const OrderTable = ({ orders }) => {
  if (!orders) {
    return <p className="text-red-600">Error: Unable to load orders.</p>;
  }

  if (orders.length === 0) {
    return <p className="text-gray-500">No orders available.</p>;
  }

  return (
    <table className="min-w-full bg-white border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="px-4 py-2">Channel</th>
          <th className="px-4 py-2">Shipment ID</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Tags</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Items</th>
          <th className="px-4 py-2">Process by</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow key={order.order_id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
