import React from "react";
import AddSchema from "../addSchema";

function GlobalSettings() {
  const handleAddSchema = () => {};
  return (
    <div>
      <AddSchema onClose={() => () => {}} onAddSchema={handleAddSchema} />
    </div>
  );
}

export default GlobalSettings;
