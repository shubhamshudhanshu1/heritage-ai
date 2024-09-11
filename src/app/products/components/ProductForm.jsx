"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography, FormControl } from "@mui/material";
import { z } from "zod";
import { PRODUCT_FORM_CONFIG } from "@/schemas/productForm";
import {
  TextInput,
  SelectInput,
  FileInput,
  DateInput,
  SwitchInput,
  CheckboxInput,
} from "@/components/FormInputs";
import { getFormOptionsByType } from "@/constants/formOptions";
import MediaUploadSection from "./MediaUploadSection";
import RichTextEditor from "@/components/common/richTextEditor";
import AttributesSection from "./AttributesSection";
import TraderInformationSection from "./TraderInformationSection";
import HighlightsSection from "./HighlightsSection";
import SizesSection from "./SizesSection";
import VariantsSection from "./VariantsSection";
import BasicInformationSection from "./BasicInformation";

// Create a combined Zod schema for all sections
const createValidationSchema = (sections) => {
  return z.object(
    sections.reduce((schema, section) => {
      section.fields.forEach((field) => {
        schema[field.name] = field.validation;
      });
      return schema;
    }, {})
  );
};

const formConfig = PRODUCT_FORM_CONFIG;
const validationSchema = createValidationSchema(formConfig);

console.log("validationSchema", validationSchema);
const ProductForm = ({ productData, isEditMode }) => {
  const [productDescription, setProductDescription] = useState(""); // State for Rich Text Editor

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      category: "",
      sizeGuide: "",
      // other default values
    },
  });

  const handleCreateProduct = (formData) => {
    console.log("Creating Product:", formData);
  };

  useEffect(() => {
    console.log(register("name").rules);
    console.log(getFormOptionsByType("departments"));
  }, []);

  return (
    <form onSubmit={handleSubmit(handleCreateProduct)} className=" h-full ">
      <div className="flex flex-col h-full flex-1 bg-[#f4f4f4]  ">
        <div className="px-6 flex items-center justify-between p-4 bg-white box-content">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {isEditMode ? "Edit Product" : "Create Product"}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ float: "right" }}>
            Submit
          </Button>
        </div>
        {/* Section 1: Basic Information */}
        <div className="flex flex-wrap p-6 gap-6 flex-1  overflow-auto">
          <div
            style={{ width: "62%" }}
            className={"flex-wrap gap-3 flex flex-col"}>
            <div className="p-4 rounded-lg  bg-white flex flex-col gap-4">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Basic Information
              </Typography>
              <BasicInformationSection control={control} />
            </div>
            <div className="p-4 rounded-lg  bg-white flex flex-col gap-4">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Media
              </Typography>
              <MediaUploadSection />
            </div>
            <div className="p-4 rounded-lg  bg-white flex flex-col gap-4">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Product Description
              </Typography>
              <RichTextEditor
                value={productDescription}
                onChange={setProductDescription}
                placeholder="Write your product description here..."
                containerStyles={{
                  border: "2px solid #ddd", // Custom outer border
                  borderRadius: "10px", // Custom border radius
                  padding: "15px", // Custom padding for outer container
                  backgroundColor: "#ffffff", // Custom background color for the outer container
                }}
                editorStyles={{
                  minHeight: "400px", // Ensure the editor has a minimum height of 400px
                  backgroundColor: "#ffffff", // Custom background color for the editor area
                  border: 0,
                }}
              />
            </div>
            <SizesSection />
            <TraderInformationSection />
            <HighlightsSection />
            <AttributesSection />
            <VariantsSection />
          </div>

          {/* Right Sidebar: Additional Information */}
          <div
            style={{ width: "35%" }}
            className={"flex-wrap  gap-3 flex flex-col"}>
            {/* Section 4: Availability and Other Options */}

            {/* Section 2: Category and Size Guide */}
            <div className="p-4 rounded-lg  bg-white flex flex-col gap-3">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Size Guide
              </Typography>

              <SelectInput
                control={control}
                name="size_guide"
                label="Sizes"
                options={[
                  { label: "Category 1", value: "Size 1" },
                  { label: "Category 2", value: "Size 2" },
                  { label: "Category 3", value: "Size 3" },
                ]}
                errors={errors}
              />

              <SelectInput
                control={control}
                name="sizeGuide"
                label="Size Guide"
                options={[
                  { label: "Size Guide 1", value: "Size Guide 1" },
                  { label: "Size Guide 2", value: "Size Guide 2" },
                ]}
                errors={errors}
              />
            </div>
            <div className="p-4 rounded-lg  bg-white flex flex-col gap-3">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Availability and Other Options
              </Typography>
              <DateInput
                control={control}
                name="availableFrom"
                // label="Available From"
                errors={errors}
              />

              <SwitchInput
                control={control}
                name="isFeatured"
                label="Is Featured"
              />

              <CheckboxInput
                control={control}
                name="isAvailable"
                label="Is Available"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
