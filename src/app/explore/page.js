import DesignCard from "@/components/DesignCard"; // Adjust path based on your structure

let dummyImage1 = "/public/assets/images/rest.jpg";
let Tea1Image = "/public/assets/images/tea1.png";
let Tea2Image = "/public/assets/images/tea3.png";
// Data for recent and suggested designs
const recentDesigns = [
  {
    title: "Tea tin design",
    description: "Design a tea tin for my Darjeeling first flush tea.",
    image: Tea1Image,
    link: "/design/tea-tin",
  },
  {
    title: "Festive gift box design",
    description: "Create a Diwali gift box with traditional elements.",
    image: Tea2Image,
    link: "/design/gift-box",
  },
  {
    title: "Wedding invitation design",
    description: "Design a wedding invitation for a South Indian wedding.",
    image: dummyImage1,
    link: "/design/wedding-invitation",
  },
];

const suggestedDesigns = [
  {
    title: "Restaurant menu designs",
    description: "Design a menu for my fusion restaurant.",
    image: dummyImage1,
    link: "/design/tea-tin",
  },
  {
    title: "Yoga mat and accessory designs",
    description: "Design mats representing self-discovery.",
    image: dummyImage1,
    link: "/design/wedding-invitation",
  },
];

const Explore = () => (
  <div className="p-8 bg-background-muted h-full flex flex-col items-center rounded-lg">
    <div>
      <div className="w-full max-w-2xl">
        <h5 className="text-[18px] font-semibold mb-4 text-secondary-dark">
          Recent Designs
        </h5>
        <div className="space-y-4 mt-6">
          {recentDesigns.map((design, index) => (
            <DesignCard
              key={index}
              image={design.image}
              title={design.title}
              description={design.description}
              link={design.link}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <h5 className="text-[18px] font-semibold mb-4 text-secondary-dark">
          Suggested Designs
        </h5>
        <div className="space-y-4 mt-6">
          {suggestedDesigns.map((design, index) => (
            <DesignCard
              key={index}
              image={design.image}
              title={design.title}
              description={design.description}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-secondary-light max-w-2xl">
        Design and manufacture India-inspired products with our AI assistant.
        <br />
        Bring your culturally-rich ideas to life!
      </div>
    </div>
  </div>
);

export default Explore;
