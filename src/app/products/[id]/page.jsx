import React from "react";
import { getProductById } from "@/data/products";

import ProductForm from "../components/ProductForm";

const EditProductPage = async ({ params }) => {
  const { id } = params;

  const productData = {
    name: `Product ${id}`,
    description: "A sample description.",
    price: "100",
  };
  const productDetails = await getProductById(id);

  /// getProductById  and pass to form
  return <ProductForm isEditMode={true} productData={productDetails.item} />;
};

export default EditProductPage;
