import React from "react";

const IframeComponent = ({ src, title, width = "100%", height = "600px" }) => {
  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      style={{ border: "none" }}
    />
  );
};

export default IframeComponent;
