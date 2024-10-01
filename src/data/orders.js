import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { dummyOrders } from "@/dummyData/orders";
import dayjs from "dayjs";

export const filterOrders = (orders, filters) => {
  let filteredOrders = orders;

  // Filter by search term (search against shipmentId, orderId, or customerEmail)
  if (filters.search) {
    filteredOrders = filteredOrders.filter((order) =>
      order.shipmentId.includes(filters.search)
    );
  }

  // Filter by date range
  if (filters.dateRange) {
    const [startDate, endDate] = filters.dateRange.split(" ~ ");
    filteredOrders = filteredOrders.filter((order) =>
      dayjs(order.date).isBetween(dayjs(startDate), dayjs(endDate), null, "[]")
    );
  }

  // Filter by tab (status)
  if (filters.tab) {
    filteredOrders = filteredOrders.filter(
      (order) => order.status.toLowerCase() === filters.tab.toLowerCase()
    );
  }

  // Sort orders by the selected criteria
  if (filters.sortBy === "price") {
    filteredOrders = filteredOrders.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "date") {
    filteredOrders = filteredOrders.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  return filteredOrders;
};

export const getOrders = cache(async (searchParams) => {
  cookies(); // Ensure cookies are handled properly

  try {
    const {
      search = "",
      dateRange = "",
      sortBy = "",
      tab = "unfulfilled",
      page = "1",
      pageSize = "20",
    } = searchParams;

    // Build the payload to simulate an API call
    const payload = {
      filters: {
        search: search.trim(),
        dateRange,
        sortBy,
        tab,
      },
      pagination: {
        offset: (Number(page) - 1) * Number(pageSize),
        limit: Number(pageSize),
      },
    };

    console.log("Payload for API:", payload);

    // You would replace the dummyOrders with an actual API call
    // const response = await fetchOrdersFromApi(payload);
    let filteredOrders = dummyOrders.items;
    // filterOrders(dummyOrders.items, payload.filters);

    // console.log(filteredOrders);

    // Get the total count of filtered orders (before pagination)
    const totalCount = filteredOrders.length;

    // Pagination: apply offset and limit
    const paginatedOrders = filteredOrders.slice(
      payload.pagination.offset,
      payload.pagination.offset + payload.pagination.limit
    );

    // Return the paginated items and the total count of filtered items
    return { total: totalCount, items: paginatedOrders };
  } catch (error) {
    console.log({ source: "getOrders", error });
    return { items: [], total: 0 };
  }
});

export const getOrderById = cache(async (orderId) => {
  cookies(); // Ensure cookies are set for caching

  try {
    // Find the order by ID from the dummy data
    const order = dummyOrders.items.find((item) => item.order_id === orderId);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    return { item: order };
    // In a real-world scenario, you would fetch the order by ID from an API
    // return await fetchOrderByIdFromApi(orderId);
  } catch (error) {
    console.log({ source: "getOrderById", error });
    return { item: null };
  }
});
