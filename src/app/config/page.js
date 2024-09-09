import IframeComponent from "@/components/common/iframe";
import Sidebar from "@/components/settings/sideBar";
import React from "react";

function Settings() {
  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar />
      {/* <div className="w-full">
        <IframeComponent
          src="http://localhost:3000" // Replace with the URL of the website you want to load
          title="Example Website"
          width="100%"
          height="800px" // Adjust height as needed
        />
      </div> */}
    </div>
  );
}

export default Settings;
