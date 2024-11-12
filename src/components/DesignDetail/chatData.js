let chatJson = {
  "T-shirt": [
    {
      question:
        "What part of the T-shirt would you like to choose a material for?",
      type: "select",
      options: ["Body", "Sleeves", "Collar", "Pocket"],
    },
    {
      question: "What material would you like for the {part}?",
      type: "select",
      options: ["Cotton", "Polyester", "Cotton-Poly Blend", "Silk", "Lycra"],
    },
    {
      question: "What is the fabric weight?",
      type: "select",
      options: ["Light", "Medium", "Heavy"],
    },
    {
      question: "What style do you prefer?",
      type: "select",
      options: [
        "Round Neck",
        "V-Neck",
        "Polo",
        "Long Sleeve",
        "Short Sleeve",
        "Tank Top",
      ],
    },
    {
      question: "Which fit would you prefer?",
      type: "select",
      options: ["Regular", "Slim Fit", "Loose Fit"],
    },
    {
      question: "Which sizes are available?",
      type: "multi-select",
      options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    },
    {
      question: "What is the printing type?",
      type: "select",
      options: [
        "Screen Printing",
        "DTG",
        "Heat Transfer",
        "Sublimation",
        "Embroidery",
      ],
    },
  ],
  "Gift Box": [
    {
      question:
        "Which part of the gift box would you like to choose a material for?",
      type: "select",
      options: ["Outer Box", "Inner Lining", "Partitions"],
    },
    {
      question: "What material would you like for the {part}?",
      type: "select",
      options: ["Cardboard", "Kraft Paper", "Corrugated Board", "Rigid Box"],
    },
    {
      question: "What box type do you want?",
      type: "select",
      options: [
        "Lid and Base",
        "Magnetic Closure",
        "Drawer Box",
        "Foldable Box",
      ],
    },
    { question: "Would you like partitions inside the box?", type: "boolean" },
    { question: "Any inserts for the box?", type: "text" },
  ],
  Tin: [
    {
      question: "What part of the tin do you want to choose a material for?",
      type: "select",
      options: ["Body", "Lid", "Base"],
    },
    {
      question: "What material would you like for the {part}?",
      type: "select",
      options: ["Tinplate", "Aluminum", "Stainless Steel"],
    },
    {
      question: "What type of coating?",
      type: "select",
      options: ["Lacquered", "Powder-Coated"],
    },
    {
      question: "What shape do you want for the tin?",
      type: "select",
      options: ["Cylindrical", "Rectangular", "Square", "Custom Shape"],
    },
  ],
};
export default chatJson;
