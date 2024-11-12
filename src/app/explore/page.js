"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DesignCard from "@/components/DesignCard"; // Adjust path based on your structure

let dummyImage1 = "/public/assets/images/rest.jpg";
let Tea1Image = "/public/assets/images/tea1.png";
let Tea2Image = "/public/assets/images/tea3.png";

// Data for suggested designs
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

const Explore = () => {
  const { data: session } = useSession();
  const [recentDesigns, setRecentDesigns] = useState([]);

  useEffect(() => {
    if (session?.user?.id) {
      // Fetch recent designs from the API
      const fetchRecentDesigns = async () => {
        try {
          const response = await fetch(
            `/api/design/recent?userId=${session.user.id}`
          );
          if (response.ok) {
            const data = await response.json();
            setRecentDesigns(data.data);
          } else {
            console.error("Failed to fetch recent designs");
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching recent designs:",
            error
          );
        }
      };

      fetchRecentDesigns();
    }
  }, [session]);

  return (
    <div className="p-8 bg-background-muted h-full flex flex-col items-center rounded-lg">
      <div>
        <div className="w-full max-w-2xl">
          <h5 className="text-[18px] font-semibold mb-4 text-secondary-dark">
            Recent Designs
          </h5>
          <div className="space-y-4 mt-6">
            {recentDesigns.length > 0 ? (
              recentDesigns.map((design, index) => (
                <DesignCard
                  key={index}
                  image={design.previewImages?.[0] || dummyImage1} // Use the first image or a placeholder
                  title={design.title}
                  description={design.description}
                  link={`/design/${design._id}`} // Link to the specific design page
                />
              ))
            ) : (
              <p>No recent designs found.</p>
            )}
          </div>
        </div>

        {recentDesigns.length > 0 && (
          <div className="w-full max-w-2xl mt-8">
            <h5 className="text-[18px] font-semibold mb-4 text-secondary-dark">
              Suggested Designs
            </h5>
            <div className="space-y-4 mt-6">
              {recentDesigns.length > 0 ? (
                recentDesigns.map((design, index) => (
                  <DesignCard
                    key={index}
                    image={design.previewImages?.[0] || dummyImage1} // Use the first image or a placeholder
                    title={design.title}
                    description={design.description}
                    link={`/design/${design._id}`} // Link to the specific design page
                  />
                ))
              ) : (
                <p>No recent designs found.</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-secondary-light max-w-2xl">
          Design and manufacture India-inspired products with our AI assistant.
          <br />
          Bring your culturally-rich ideas to life!
        </div>
      </div>
    </div>
  );
};

export default Explore;
