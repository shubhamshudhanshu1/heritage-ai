import { z } from "zod";

export const PRODUCT_FORM_CONFIG = [
  {
    section: "Basic Information",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        validation: z.string().min(1, "Name is required"),
      },
      {
        name: "slug",
        label: "Name",
        type: "text",
        validation: z.string().min(4, "Slug is required"),
      },
      {
        name: "brand",
        label: "Name",
        type: "text",
        validation: z.string().min(1, "Brand is required"),
      },
      {
        name: "itemCode",
        label: "Name",
        type: "text",
        validation: z.string().min(1, " Item Code is  Required"),
      },
      {
        name: "netQuantity",
        label: "Name",
        type: "text",
        validation: z.string().min(1, "Required"),
      },
      {
        name: "netQuantityUnit",
        label: "Name",
        type: "text",
        validation: z.string().min(4, " Validation Failed"),
      },
      {
        name: "departments",
        label: "Description",
        type: "text",
        validation: z.string().min(1, "Department is required"),
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Category 1", "Category 2", "Category 3"],
        validation: z.string().min(1, "Category is required"),
      },
      {
        name: "type",
        label: "Category",
        type: "select",
        options: ["Category 1", "Category 2", "Category 3"],
        validation: z.string().min(1, "Category is required"),
      },
    ],
  },
  {
    section: "Media",
    fields: [
      {
        name: "images",
        label: "Images",
        type: "file",
        validation: z.array(z.any()),
      },
      {
        name: "videos",
        label: "Videos",
        type: "file",
        validation: z.array(z.any()),
      },
    ],
  },
  {
    section: "Product Availability",
    fields: [
      {
        name: "available",
        label: "Available",
        type: "switch",
        validation: z.boolean(),
      },
      {
        name: "publishDate",
        label: "Publish Date",
        type: "date",
        validation: z.date(),
      },
    ],
  },
  {
    section: "Pricing",
    fields: [
      {
        name: "price",
        label: "Price",
        type: "number",
        validation: z.number().positive("Price must be greater than 0"),
      },
    ],
  },
  {
    section: "Return Configuration",
    fields: [
      {
        name: "isReturnable",
        label: "Enable this product to be returned",
        type: "checkbox",
        validation: z.boolean(),
      },
    ],
  },
  {
    section: "Product Bundle",
    fields: [
      {
        name: "productBundle",
        label: "Product Bundle",
        type: "text",
        validation: z.string().optional(),
      },
    ],
  },
  {
    section: "Size Guide",
    fields: [
      {
        name: "sizeGuide",
        label: "Size Guide",
        type: "select",
        options: ["Size Guide 1", "Size Guide 2"],
        validation: z.string().optional(),
      },
    ],
  },
  // Add more sections and fields as per the screenshot...
];
