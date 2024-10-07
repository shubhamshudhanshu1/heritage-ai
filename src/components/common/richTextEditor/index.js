// components/RichTextEditor.js

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  toolbarOptions = null, // Allow custom toolbar options
  readOnly = false,
  editorStyles = {}, // Accept custom styles via props for the editor area
  containerStyles = {}, // Accept custom styles via props for the outer container
  ...rest
}) => {
  // Default toolbar options
  const defaultToolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ align: [] }],
    ["link", "image"], // link and image, video
    ["clean"], // remove formatting button
  ];

  // Custom ReactQuill modules to apply styles to the editor
  const modules = {
    toolbar: toolbarOptions || defaultToolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };

  // Default styles for the editor container
  const defaultContainerStyles = {
    border: "1px solid #ccc", // Outer border
    borderRadius: "8px", // Rounded corners for the container
    padding: "10px", // Padding around the editor
    backgroundColor: "#fff", // Background color for the container
  };

  // Default styles for the editor area inside ReactQuill
  const defaultEditorStyles = {
    minHeight: "400px", // Minimum height for the editor area
    backgroundColor: "#fff", // Background color for the editor area
    border: "none", // Remove inner border of the editor area
  };

  return (
    <div style={{ ...defaultContainerStyles, ...containerStyles }}>
      {" "}
      {/* Outer container with customizable styles */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        modules={modules}
        style={{ ...defaultEditorStyles, ...editorStyles }} // Editor-specific styles directly
        {...rest} // Spread the rest of the props to the ReactQuill component
      />
    </div>
  );
};

export default RichTextEditor;
