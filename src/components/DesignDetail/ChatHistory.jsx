"use client";
import React, { useState } from "react";
import { Select, Input, Button, Typography, List, Avatar, Space } from "antd";
import aiImage from "/public/assets/images/ai.png";
import Image from "next/image";

const { Option } = Select;
const { TextArea } = Input;
let userImage = "https://randomuser.me/api/portraits/women/32.jpg";

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

const ChatbotDesignSelector = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      isAI: true,
      message:
        "Hello! I'd be happy to help you design something. What would you like to design today?",
    },
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [designType, setDesignType] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [responses, setResponses] = useState({});
  const handleDesignTypeSelect = (value) => {
    setDesignType(value);
    setCurrentStep(chatJson[value][0]);
    setChatHistory((prev) => [
      ...prev,
      { isAI: false, message: `I want to design a ${value}.` },
      { isAI: true, message: chatJson[value][0].question },
    ]);
  };

  const handleAnswerSubmit = (answer) => {
    const updatedResponses = { ...responses, [currentStepIndex]: answer };
    setResponses(updatedResponses);

    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < chatJson[designType].length) {
      const nextStep = chatJson[designType][nextStepIndex];
      setCurrentStep(nextStep);
      setCurrentStepIndex(nextStepIndex);
      setChatHistory((prev) => [
        ...prev,
        { isAI: false, message: answer },
        { isAI: true, message: nextStep.question },
      ]);
    } else {
      setChatHistory((prev) => [
        ...prev,
        { isAI: false, message: answer },
        {
          isAI: true,
          message: `Thank you for providing all the details for your ${designType} design!`,
        },
      ]);
      // Call API to save data when all steps are completed
      saveDesignData();
    }
  };

  // Function to send data to API
  const saveDesignData = async () => {
    try {
      const response = await fetch("/api/saveDesign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user123", // Replace with actual user ID if available
          designType,
          specifications: responses,
        }),
      });
      const data = await response.json();
      if (data.success) {
        notification.success({
          message: "Design Saved",
          description: "Your design details were successfully saved!",
        });
      } else {
        throw new Error(data.message || "Failed to save design.");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error.message || "An error occurred while saving the design.",
      });
    }
  };

  const renderInput = () => {
    if (!currentStep) return null;

    if (currentStep.type === "select" || currentStep.type === "multi-select") {
      return (
        <Select
          mode={currentStep.type === "multi-select" ? "multiple" : undefined}
          placeholder={currentStep.question}
          style={{ width: "100%" }}
          onChange={(value) => handleAnswerSubmit(value)}
        >
          {currentStep.options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      );
    } else if (currentStep.type === "boolean") {
      return (
        <Select
          placeholder={currentStep.question}
          style={{ width: "100%" }}
          onChange={(value) => handleAnswerSubmit(value)}
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      );
    } else if (currentStep.type === "text") {
      return (
        <TextArea
          placeholder={currentStep.question}
          rows={3}
          onPressEnter={(e) => handleAnswerSubmit(e.target.value)}
        />
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* <Typography.Title level={4}>Design Assistant Chatbot</Typography.Title> */}
      <div className="mt-4 flex flex-col gap-5">
        <List
          className="chat-history"
          dataSource={chatHistory}
          renderItem={(chat, index) => {
            if (chat.isAI) {
              <List.Item key={index} className={`flex items-start space-x-3`}>
                <Image
                  src={aiImage}
                  alt="Avatar"
                  width={35}
                  height={35}
                  style={"100%"}
                />
                <div className="text-gray-700 text-sm">{chat.message}</div>
              </List.Item>;
            }
            return (
              <List.Item key={index} className={`flex items-start space-x-3`}>
                <Image
                  src={userImage}
                  alt="Avatar"
                  width={35}
                  height={35}
                  style={"100%"}
                />
                <div className="text-gray-700 text-sm">{chat.message}</div>
              </List.Item>
            );
          }}
        />
        <Space direction="vertical" size="middle" className="mt-4">
          {!designType && (
            <Select
              placeholder="Select an item to design"
              onChange={handleDesignTypeSelect}
              style={{ width: "100%" }}
            >
              {Object.keys(chatJson).map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          )}
          {designType && currentStep && renderInput()}
        </Space>
      </div>
    </div>
  );
};

export default ChatbotDesignSelector;
