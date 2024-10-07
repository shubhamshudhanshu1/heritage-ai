// components/BasicInformationSection.js

import React from "react";
import { SelectInput, TextInput } from "@/components/FormInputs";
import { getFormOptionsByType } from "@/constants/formOptions";

const BasicInformationSection = ({ control }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SelectInput
        control={control}
        name="type"
        label="Type"
        labelPosition="above"
        options={getFormOptionsByType("item_types") || []}
        placeholder="Product Type"
        // rules={{ required: true }}
      />
      <div></div>
      <SelectInput
        control={control}
        name="departments"
        label="Departments"
        options={getFormOptionsByType("departments") || []}
        labelPosition="above"
      />
      <SelectInput
        control={control}
        name="category"
        label="Category"
        options={getFormOptionsByType("departments") || []}
        rules={{
          required: true,
          onChange: (e) => console.log(e.target.value),
        }}
        labelPosition="above"
      />
      <TextInput
        control={control}
        name="name"
        label="Name"
        labelPosition="above"
        placeholder="Product Name"
        rules={{ required: true }}
      />
      <TextInput
        control={control}
        name="slug"
        label="Slug"
        labelPosition="above"
        placeholder="Product Slug"
        // rules={{ required: true }}
      />
      <TextInput
        control={control}
        name="brand"
        label="Brand"
        labelPosition="above"
        placeholder="Brand Name"
        rules={{ required: true }}
      />
      <TextInput
        control={control}
        name="itemCode"
        label="Item Code"
        labelPosition="above"
        placeholder="Item Code"
        rules={{ required: true }}
      />
      <TextInput
        control={control}
        name="netQuantity"
        label="Net Quantity"
        labelPosition="above"
        placeholder="Net Quantity"
        rules={{ required: true }}
      />
      <TextInput
        control={control}
        name="netQuantityUnit"
        label="Net Quantity Unit"
        labelPosition="above"
        placeholder="Net Quantity Unit"
        rules={{ required: true }}
      />
      <TextInput
        control={control}
        name="badge"
        label="Badge"
        labelPosition="above"
        placeholder="Badge"
        // rules={{ required: true }}
      />
      <TextInput
        control={control}
        type="number"
        name="noOfBoxes"
        label="No. of Boxes"
        labelPosition="above"
        placeholder="Number of Boxes"
        // rules={{ required: true }}
      />
    </div>
  );
};

export default BasicInformationSection;
