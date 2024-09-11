import "server-only";

import { cache } from "react";

import { cookies } from "next/headers";
import { dummyProducts } from "@/dummyData/products";

export const getProducts = cache(async (searchParams) => {
  cookies();

  try {
    const { page = "1", pageSize = "10" } = searchParams;

    const payload = {
      paginationRequest: {
        offset: (Number(page) - 1) * Number(pageSize),
        limit: Number(pageSize),
      },
    };

    return { items: dummyProducts.items };
    //// call api to get data
  } catch (error) {
    console.log({ source: "getProducts", error });
    return { items: [], total: 0 };
  }
});

export const getProductById = cache(async (productId) => {
  cookies(); // Ensure cookies are set for caching

  try {
    // Find the product by ID from dummy data
    const product = dummyProducts.items.find(
      (item) => item.item_code === productId
    );

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    return { item: product };
    // In a real-world scenario, make an API call to get the product by ID
    // return await fetchProductByIdFromApi(productId);
  } catch (error) {
    console.log({ source: "getProductById", error });
    return { item: null }; // Return null or handle error response accordingly
  }
});
