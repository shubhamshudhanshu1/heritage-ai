"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const ProductsPage = ({ products = [] }) => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    console.log(products);
  }, []);

  return (
    <div className="p-6 gap-6 flex flex-col">
      <div class="font-inter flex-1 p-5 px-6 border border-gray-300 rounded-sm flex bg-white min-h-[200px]">
        <div className="flex flex-col gap-4" style={{ flex: 0.65 }}>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mb-4 color-gray-500">
            Use this section to create single or bulk products, of any brand and
            category. Fill the product information, description, attributes and
            media. Preview and get your new product live at the drop of a hat!
            Moreover, you can effortlessly edit and configure these new
            products.
          </p>
          <div className="flex gap-2 mb-4">
            <Link href="/products/create" passHref legacyBehavior>
              <Button variant="contained" color="primary">
                Create
              </Button>
            </Link>
            <Button variant="outlined">Import</Button>
            <Button variant="outlined">Export</Button>
          </div>
        </div>
        <div style={{ flex: 0.35 }}>
          <div className="" style={{ height: "100%" }}>
            <Image
              src="/illustration.png"
              width={400}
              height={175}
              alt=""
              className="h-full"
            />
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <TextField
          className="flex-1"
          label="Search by product name, slug or GTIN value"
          variant="outlined"
          fullWidth
        />
        <FormControl className="min-w-[200px]">
          <InputLabel>Brand</InputLabel>
          <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Independence">Independence</MenuItem>
            {/* Add more brands as needed */}
          </Select>
        </FormControl>
        <FormControl className="min-w-[200px]">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="basmati--rice--l3">Basmati Rice</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
      </div>

      <div>
        {products &&
          products.map((product) => (
            <Link
              key={product.code}
              href={`/products/${product.item_code}`}
              passHref
              legacyBehavior>
              <div className="text-black flex items-center justify-between p-4 mb-4 border rounded shadow-sm hover:shadow-md cursor-pointer">
                <div className="flex gap-3">
                  <div className="h-16 w-16 align-center">
                    <Image
                      src={product.brand.logo?.url}
                      alt="product-image"
                      height={60}
                      width={100}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm">{product.brand.name}</p>
                    <p className="text-sm">
                      Item Code:{" "}
                      <span className="text-blue-600">{product.item_code}</span>
                    </p>
                    <p className="text-sm">Category: {product.category_slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/products/${product.item_code}`}
                    passHref
                    legacyBehavior>
                    <Button variant="outlinedx" color="primary">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductsPage;
