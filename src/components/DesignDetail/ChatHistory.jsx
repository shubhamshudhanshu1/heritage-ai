"use client";
import React, { useState, useEffect } from "react";
import { Select, Input, Button, List, Avatar, notification } from "antd";
import aiImage from "/public/assets/images/ai.png";
import Image from "next/image";
import { getRandomImage } from "./../../helper/utils";
const { Option } = Select;
const { TextArea } = Input;
let userImage = "https://randomuser.me/api/portraits/women/32.jpg";

let chatJson = {
  "T-shirt": [
    {
      key: "body_material",
      question: "What material would you like for the body of the T-shirt?",
      part: "Body",
      type: "select",
      options: ["Cotton", "Polyester", "Cotton-Poly Blend", "Silk", "Lycra"],
    },
    {
      key: "sleeves_material",
      question: "What material would you like for the sleeves?",
      part: "Sleeves",
      type: "select",
      options: ["Cotton", "Polyester", "Cotton-Poly Blend", "Silk", "Lycra"],
    },
    {
      key: "collar_material",
      question: "What material would you like for the collar?",
      part: "Collar",
      type: "select",
      options: ["Cotton", "Polyester", "Cotton-Poly Blend", "Silk", "Lycra"],
    },
    {
      key: "fabric_weight",
      question: "What is the fabric weight?",
      type: "select",
      options: ["Light", "Medium", "Heavy"],
    },
    {
      key: "style_preference",
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
      key: "available_sizes",
      question: "Which sizes are available?",
      type: "multi-select",
      options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    },
    {
      key: "printing_type",
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
      key: "box_material",
      question: "What material would you like for the gift box?",
      part: "Box",
      type: "select",
      options: ["Cardboard", "Wood", "Metal", "Plastic", "Paper"],
    },
    {
      key: "box_size",
      question: "What size should the gift box be?",
      type: "select",
      options: ["Small", "Medium", "Large", "Custom Size"],
    },
    {
      key: "box_color",
      question: "What color do you want for the gift box?",
      type: "select",
      options: ["Red", "Blue", "Green", "Black", "White", "Custom Color"],
    },
    {
      key: "finishing_type",
      question: "What type of finishing would you prefer?",
      type: "select",
      options: ["Glossy", "Matte", "Textured", "Metallic"],
    },
    {
      key: "printing_option",
      question: "Would you like any custom printing on the gift box?",
      type: "select",
      options: ["No Printing", "Logo", "Pattern", "Custom Text"],
    },
    {
      key: "ribbon_type",
      question: "Do you want a ribbon for the gift box?",
      type: "select",
      options: ["No Ribbon", "Satin Ribbon", "Silk Ribbon", "Organza Ribbon"],
    },
    {
      key: "insert_material",
      question: "What material do you prefer for the insert?",
      part: "Insert",
      type: "select",
      options: ["Foam", "Silk", "Velvet", "None"],
    },
  ],
  "Wedding Card": [
    {
      key: "card_material",
      question: "What material would you like for the wedding card?",
      part: "Card",
      type: "select",
      options: [
        "Cardstock",
        "Vellum",
        "Linen",
        "Pearlescent",
        "Recycled Paper",
      ],
    },
    {
      key: "card_size",
      question: "What size should the wedding card be?",
      type: "select",
      options: ["A5", "A6", "Square", "Custom Size"],
    },
    {
      key: "card_style",
      question: "What style of wedding card are you looking for?",
      type: "select",
      options: ["Traditional", "Modern", "Floral", "Minimalist", "Rustic"],
    },
    {
      key: "printing_method",
      question: "Which printing method would you like to use?",
      type: "select",
      options: [
        "Digital Printing",
        "Foil Stamping",
        "Letterpress",
        "Screen Printing",
        "Embossing",
      ],
    },
    {
      key: "card_color",
      question: "What color theme do you want for the wedding card?",
      type: "select",
      options: ["White", "Ivory", "Gold", "Pastel", "Custom Color"],
    },
    {
      key: "envelope_type",
      question: "Would you like an envelope with the card?",
      type: "select",
      options: [
        "No Envelope",
        "Plain Envelope",
        "Printed Envelope",
        "Custom Lined Envelope",
      ],
    },
    {
      key: "embellishments",
      question: "Do you want any embellishments on the wedding card?",
      type: "multi-select",
      options: ["Ribbon", "Pearls", "Sequins", "Wax Seal", "None"],
    },
  ],
};

const ChatbotDesignSelector = ({ handleChange, savedData }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [designType, setDesignType] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [responses, setResponses] = useState({});
  const [inputValue, setInputValue] = useState(null);

  console.log({ savedData });
  // Load saved data if available
  useEffect(() => {
    if (savedData) {
      setChatHistory(
        savedData.chatHistory || [
          {
            isAI: true,
            message:
              "Hello! I'd be happy to help you design something. What would you like to design today?",
          },
        ]
      );
      setCurrentStepIndex(savedData.currentStepIndex || 0);
      setDesignType(savedData.designType || null);
      setResponses(savedData.specifications || {});
      if (
        savedData.designType &&
        savedData.currentStepIndex < chatJson[savedData.designType]?.length
      ) {
        setCurrentStep(
          chatJson[savedData.designType][savedData.currentStepIndex]
        );
      }
    }
  }, [savedData]);

  const handleDesignTypeSelect = (value) => {
    setDesignType(value);
    const newStep = chatJson[value][0];
    setCurrentStep(newStep);
    const updatedChatHistory = [
      ...chatHistory,
      { isAI: false, message: `I want to design a ${value}.` },
      { isAI: true, message: newStep.question },
    ];
    setChatHistory(updatedChatHistory);
    handleChange({
      designType: value,
      specifications: responses,
      chatHistory: updatedChatHistory,
      currentStepIndex: 0,
    });
  };

  const handleAnswerSubmit = (answer) => {
    const updatedResponses = { ...responses, [currentStep.key]: answer };
    setResponses(updatedResponses);

    const updatedChatHistory = [
      ...chatHistory,
      { isAI: false, message: answer },
    ];
    setChatHistory(updatedChatHistory);

    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < chatJson[designType].length) {
      const nextStep = chatJson[designType][nextStepIndex];
      setCurrentStep(nextStep);
      setCurrentStepIndex(nextStepIndex);
      updatedChatHistory.push({ isAI: true, message: nextStep.question });
    } else {
      updatedChatHistory.push({
        isAI: true,
        message: `Thank you for providing all the details for your ${designType} design!`,
      });
      setCurrentStep(null); // No further steps
    }
    setInputValue(null); // Reset the input value after submission
    setChatHistory(updatedChatHistory);

    // Send the updated payload to the parent
    handleChange({
      designType,
      specifications: updatedResponses,
      chatHistory: updatedChatHistory,
      currentStepIndex: nextStepIndex,
    });
  };

  // Handle generating an image
  const handleGenerateImage = () => {
    const newGeneratedImage = {
      src: getRandomImage(designType), // Random image from the function
      alt: `Generated Design for ${designType}`,
    };

    // Update responses to include the generated image
    const updatedResponses = {
      ...responses,
      generatedImages: [
        ...(responses.generatedImages || []),
        newGeneratedImage,
      ],
    };
    setResponses(updatedResponses);

    // Send the updated payload to the parent component
    handleChange({
      designType,
      specifications: updatedResponses,
      chatHistory,
      currentStepIndex,
    });

    // Notification for image generation
    notification.info({
      message: "Image has been generated and added to the gallery.",
    });
  };

  const renderInput = () => {
    if (!currentStep) return null;

    if (currentStep.type === "select" || currentStep.type === "multi-select") {
      return (
        <Select
          mode={currentStep.type === "multi-select" ? "multiple" : undefined}
          placeholder={currentStep.question}
          style={{ width: "100%" }}
          value={inputValue}
          onChange={(value) => {
            setInputValue(value);
            handleAnswerSubmit(value);
          }}
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
          value={inputValue}
          onChange={(value) => {
            setInputValue(value);
            handleAnswerSubmit(value);
          }}
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={(e) => handleAnswerSubmit(e.target.value)}
        />
      );
    }
  };

  const resetChat = () => {
    const resetChatHistory = [
      {
        isAI: true,
        message:
          "Hello! I'd be happy to help you design something. What would you like to design today?",
      },
    ];
    setChatHistory(resetChatHistory);
    setCurrentStepIndex(0);
    setDesignType(null);
    setCurrentStep(null);
    setResponses({});
    setInputValue(null);
    handleChange({
      designType: null,
      specifications: {},
      chatHistory: resetChatHistory,
      currentStepIndex: 0,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mt-4 flex flex-col gap-5">
        <div className="max-h-[500px] overflow-y-auto pr-3">
          <List
            className="chat-history"
            dataSource={chatHistory}
            renderItem={(chat, index) => {
              if (chat.isAI) {
                return (
                  <List.Item
                    key={index}
                    style={{ borderBlockEnd: "unset !important" }}
                    className={`flex items-start space-x-3 mb-4 !bg-[#F3F9F8] !p-3 rounded-[20px] !border-0`}
                  >
                    <Image
                      src={aiImage}
                      alt="Avatar"
                      width={35}
                      height={35}
                      style={{ borderRadius: "100%" }}
                    />
                    <div className="text-gray-700 text-sm">{chat.message}</div>
                  </List.Item>
                );
              }
              return (
                <List.Item
                  key={index}
                  style={{ borderBlockEnd: "unset !important" }}
                  className={`flex items-start mb-4 space-x-3`}
                >
                  <Image
                    src={userImage}
                    alt="Avatar"
                    width={35}
                    height={35}
                    style={{ borderRadius: "100%" }}
                  />
                  <div className="text-gray-700 text-sm">{chat.message}</div>
                </List.Item>
              );
            }}
          />
        </div>
        <div className="mt-4 w-full flex flex-col items-end">
          {!designType && (
            <Select
              placeholder="Select an item to design"
              onChange={handleDesignTypeSelect}
              className="w-full"
              value={inputValue}
            >
              {Object.keys(chatJson).map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          )}
          {designType && currentStep && renderInput()}
          {!currentStep && designType && (
            <Button
              type="primary"
              className="self-end mt-4"
              onClick={handleGenerateImage}
            >
              Generate Image
            </Button>
          )}
          <Button type="text" className="ml-0 mt-4" onClick={resetChat}>
            Reset Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDesignSelector;
