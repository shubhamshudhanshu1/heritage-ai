"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentDesignsByUserId } from "@/redux/slices/designSlice"; // Adjust the import path if necessary
import DesignCard from "@/components/DesignCard"; // Adjust path based on your structure

const Explore = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  // Get recent designs from Redux store
  const recentDesigns = useSelector((state) => state.design.recentDesigns);
  const status = useSelector((state) => state.design.status);
  const error = useSelector((state) => state.design.error);

  useEffect(() => {
    if (session?.user?.id) {
      // Dispatch thunk to fetch recent designs
      dispatch(getRecentDesignsByUserId());
    }
  }, [session, dispatch]);

  return (
    <div className="p-8 bg-background-muted h-full flex flex-col items-center rounded-lg">
      <div>
        <div className="w-full max-w-2xl">
          <h5 className="text-[18px] font-semibold mb-4 text-secondary-dark">
            Recent Designs
          </h5>
          <div className="space-y-4 mt-6">
            {status === "loading" && <p>Loading recent designs...</p>}
            {status === "failed" && (
              <p className="text-red-500">Failed to load designs: {error}</p>
            )}
            {recentDesigns.length > 0 ? (
              recentDesigns.map((design) => (
                <DesignCard key={design._id} design={design} />
              ))
            ) : (
              <p>No recent designs found.</p>
            )}
          </div>
        </div>

        {/* <div className="w-full max-w-2xl mt-8">
          <h5 className="text-[18px] font-semibold mb-4 text-secondary-dark">
            Suggested Designs
          </h5>
          <div className="space-y-4 mt-6">
            {recentDesigns.length > 0 ? (
              recentDesigns.map((design) => (
                <DesignCard key={`suggested-${design._id}`} design={design} />
              ))
            ) : (
              <p>No suggested designs available.</p>
            )}
          </div>
        </div> */}

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
