import defaultImage from "/public/assets/images/rest.jpg";
import tea1 from "/public/assets/images/tea1.png";
import tea2 from "/public/assets/images/tea3.png";

export const mockDesignsData = [
  {
    id: "tea-tin",
    title: "Tea Tin Design",
    description: "Design a tea tin for my Assam tea brand.",
    image: tea1,
    status: "Draft",
    chatHistory: [
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message: "Hi, I want to design a tea tin for my Assam tea brand.",
      },
      {
        avatar: "", // AI avatar
        isAI: true,
        message:
          "Hello! I’d be happy to help you design a tea tin for your Assam tea. Let’s start with some basics. What shape and size would you like for your tin?",
      },
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message:
          "I’m thinking of a cylindrical tin, about 4 inches tall and 3 inches in diameter.",
      },
      {
        avatar: "", // AI avatar
        isAI: true,
        message:
          "Great choice! A cylindrical tin is classic and practical. Now, let’s talk about the design style. Would you prefer something traditional, modern, or a blend of both?",
      },
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message:
          "I’d like a blend of traditional and modern. Something that showcases Assam’s tea heritage but looks contemporary.",
      },
      {
        avatar: "", // AI avatar
        isAI: true,
        message:
          "Excellent! A fusion of traditional and modern styles can create a unique and appealing design. For Assam tea, we could incorporate elements like tea leaves, the one-horned rhinoceros (Assam’s state animal), or patterns inspired by Assamese textiles. What colors would you like to use?",
      },
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message:
          "I like the idea of using the rhino. For colors, maybe deep green and gold?",
      },
      {
        avatar: "", // AI avatar
        isAI: true,
        message:
          "Deep green and gold would work beautifully for an Assam tea tin. I suggest using a matte deep green as the base color with gold for the rhino silhouette and other design elements. How does that sound?",
      },
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message:
          "That sounds perfect! Can we add some Assamese textile patterns around the edges?",
      },
      {
        avatar: "", // AI avatar
        isAI: true,
        message:
          "Absolutely! Adding Assamese textile patterns would add a unique cultural touch. I’ll start drafting a design with those elements. Is there anything else you’d like to add?",
      },
    ],
    previews: [
      {
        label: "Option A",
        description: "Cylindrical tin with green tea leaves design",
        image: tea1,
        price: "₹15",
        units: "22",
        delivery: "12",
      },
      {
        label: "Option B",
        description:
          "Rectangular tin with traditional Assamese design in green",
        image: tea2,
        price: "₹15",
        units: "22",
        delivery: "12",
      },
    ],
    bomDetails: {
      materials: [
        {
          part: "Main Body",
          description: "Material: Tinplate (steel sheet coated with tin)",
          dimensions: "4 inches height, 3 inches diameter",
          thickness: "0.20 mm - 0.25 mm",
        },
        {
          part: "Lid",
          description: "Material: Tinplate",
          type: "Sealed lid for tight sealing",
        },
        {
          part: "Base",
          description: "Material: Tinplate",
        },
        {
          part: "Printing Materials",
          description: "Food-safe ink for external designs",
        },
        {
          part: "Coatings",
          description: "Inner lacquer coating (food-grade) to preserve tea",
          additional: "Outer protective coating",
        },
        {
          part: "Label Material",
          description: "Water-resistant material for branding and information",
        },
        {
          part: "Packaging Material",
          description:
            "Cardboard box for outer packaging to protect during shipping",
        },
      ],
      manufacturingSteps: [
        "Cutting and forming tinplate sheets into cylindrical shape",
        "Welding of the body and base",
        "Applying inner lacquer coating",
        "Printing designs on the exterior",
        "Applying outer protective coating",
      ],
      manufacturers: [
        {
          name: "Larsan Tin Printers",
          location: "Pondicherry",
          priceRange: "₹38-40",
          minOrder: "300 units",
          delivery: "10 days",
          experience: "8 years",
          jobs: "30 jobs",
          rating: 4.5,
        },
        {
          name: "VM Can Industries",
          location: "New Delhi",
          priceRange: "₹18-24",
          minOrder: "500 units",
          delivery: "16 days",
          experience: "16 years",
          jobs: "90 jobs",
          rating: 4,
        },
        {
          name: "Maharashtra Metal Works Pvt Ltd",
          location: "Mumbai",
          priceRange: "₹5-15",
          minOrder: "50 units",
          delivery: "26 days",
          experience: "35 years",
          jobs: "120 jobs",
          rating: 3.5,
        },
      ],
    },
  },
  {
    id: "gift-box",
    title: "Festive Gift Box Design",
    description: "Create a Diwali gift box with traditional elements.",
    image: defaultImage,
    status: "Draft",
    chatHistory: [
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message: "I need a gift box design for Diwali gifts.",
      },
      {
        avatar: "",
        isAI: true,
        message:
          "What size and shape are you thinking of? And any specific theme?",
      },
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message:
          "A square box, about 8 inches wide. I want it to look festive with a blend of traditional and modern elements.",
      },
    ],
    previews: [
      {
        label: "Option A",
        description: "Box with floral Diwali patterns in gold and maroon",
        image: "https://placehold.co/200x300",
        price: "₹20",
        units: "50",
        delivery: "15",
      },
      {
        label: "Option B",
        description: "Box with geometric traditional designs in green and gold",
        image: "https://placehold.co/200x300",
        price: "₹25",
        units: "40",
        delivery: "10",
      },
    ],
    bomDetails: {
      materials: [
        {
          part: "Main Body",
          description: "Cardboard material with festive Diwali pattern",
          dimensions: "8 inches by 8 inches",
          thickness: "2 mm",
        },
        {
          part: "Printing Materials",
          description: "Gold and maroon food-safe ink for external designs",
        },
        {
          part: "Coatings",
          description: "Glossy finish to enhance festive look",
        },
        {
          part: "Packaging Material",
          description: "Outer box for protection during shipping",
        },
      ],
      manufacturingSteps: [
        "Cutting and forming cardboard sheets",
        "Printing festive designs on the exterior",
        "Applying glossy finish",
        "Assembling the box",
      ],
      manufacturers: [
        {
          name: "Diwali Box Manufacturers",
          location: "Jaipur",
          priceRange: "₹12-20",
          minOrder: "100 units",
          delivery: "14 days",
          experience: "10 years",
          jobs: "50 jobs",
          rating: 4,
        },
      ],
    },
  },
  {
    id: "wedding-invite",
    title: "Yoga Mat Design",
    description: "Design mats representing self-discovery and mindfulness.",
    image: tea2,
    status: "In Progress",
    chatHistory: [
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message: "I'd like to design a yoga mat that promotes mindfulness.",
      },
      {
        avatar: "",
        isAI: true,
        message: "That sounds wonderful! Do you have any color preferences?",
      },
      {
        avatar: "https://placehold.co/40x40",
        isAI: false,
        message:
          "Soft blue and white, with symbols representing balance and self-discovery.",
      },
    ],
    previews: [
      {
        label: "Option A",
        description: "Mat with subtle mandala design in soft blue",
        image: "https://placehold.co/200x300",
        price: "₹30",
        units: "30",
        delivery: "20",
      },
      {
        label: "Option B",
        description: "Mat with a minimalistic balance symbol in white and blue",
        image: "https://placehold.co/200x300",
        price: "₹35",
        units: "25",
        delivery: "18",
      },
    ],
    bomDetails: {
      materials: [
        {
          part: "Mat Material",
          description: "Eco-friendly foam with non-slip surface",
          dimensions: "6 feet by 2 feet",
          thickness: "5 mm",
        },
        {
          part: "Printing Materials",
          description: "Non-toxic ink for designs",
        },
      ],
      manufacturingSteps: [
        "Cutting and shaping foam material",
        "Printing mindfulness symbols",
        "Applying non-slip coating",
        "Quality control checks",
      ],
      manufacturers: [
        {
          name: "Mindful Mats Co.",
          location: "Bangalore",
          priceRange: "₹80-120",
          minOrder: "200 units",
          delivery: "25 days",
          experience: "5 years",
          jobs: "25 jobs",
          rating: 4.3,
        },
      ],
    },
  },
];

export const manufacturersdata = [
  {
    name: "Larsan Tin Printers",
    location: "Pondicherry",
    price: "₹38-40",
    minUnits: 300,
    delivery: 10,
    experience: "8 years",
    jobs: "30 jobs",
    rating: "4.5/5",
    description:
      "Larsan Tin Printers manufactures a variety of tin containers, emphasizing on quality and custom solutions.",
  },
  {
    name: "VM Can Industries",
    location: "New Delhi",
    price: "₹18-24",
    minUnits: 500,
    delivery: 16,
    experience: "16 years",
    jobs: "90 jobs",
    rating: "4/5",
    description:
      "VM Can Industries is engaged in manufacturing various tin containers including tea, coffee, packaging tins, and metal containers, focusing on quality and durability.",
  },
  {
    name: "Maharashtra Metal Works Pvt Ltd",
    location: "Mumbai",
    price: "₹5-15",
    minUnits: 50,
    delivery: 26,
    experience: "35 years",
    jobs: "189 jobs",
    rating: "3.5/5",
    description:
      "Maharashtra Metal Works Pvt Ltd specializes in manufacturing high-quality metal containers, including Aerosol cans, and customized cans, with a commitment to environment.",
  },
];

export const Tea1Image = tea1;
export const Tea2Image = tea2;
export const DefaultImage = defaultImage;
