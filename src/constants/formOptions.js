export const getFormOptionsByType = (type) => {
  switch (type) {
    case "item_types":
      return [
        { value: "standard", label: "Standard" },
        { value: "set", label: "Set" },
        { value: "composite", label: "Composite" },
        { value: "digital", label: "Digital" },
      ];

    case "identifier_type":
      return [
        { value: "ean", label: "EAN" },
        { value: "alu", label: "ALU" },
        { value: "upc", label: "UPC" },
        { value: "sku_code", label: "SKU" },
        { value: "isbn", label: "ISBN" },
      ];

    case "net_quantity_unit":
      return [
        { value: "kg", label: "kilogram" },
        { value: "g", label: "gram" },
        { value: "L", label: "litre" },
        { value: "ml", label: "millilitre" },
        { value: "m", label: "metre" },
        { value: "cm", label: "centimetre" },
        { value: "nos", label: "number" },
        { value: "pack", label: "pack" },
      ];

    case "manufacturer":
      return [
        { value: "Importer", label: "Importer" },
        { value: "Packer", label: "Packer" },
        { value: "Manufacturer", label: "Manufacturer" },
        { value: "Marketer", label: "Marketer" },
      ];

    case "departments":
      return [
        { value: "Grocery", label: "Grocery" },
        { value: "Electronics", label: "electronics" },
      ];

    default:
      return [];
  }
};
