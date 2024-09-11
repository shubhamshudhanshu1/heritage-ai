import { getProducts } from "@/data/products";
import ProductsPage from "./ProductsPage";

export default async function ProductListing({ searchParams }) {
  const productsList = await getProducts(searchParams);
  const paginationData = {};

  console.log({ productsList });

  return (
    <div className="flex h-full flex-col gap-3 overflow-auto">
      <ProductsPage
        products={productsList.items}
        paginationData={paginationData}
      />
    </div>
  );
}
