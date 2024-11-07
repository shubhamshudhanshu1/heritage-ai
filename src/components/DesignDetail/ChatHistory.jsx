import { useDesign } from "./DesignContext";
import aiImage from "/public/assets/images/ai.jpg";
import Image from "next/image";
const userImage = "https://randomuser.me/api/portraits/women/32.jpg";

const ChatHistory = () => {
  const {
    designData: { chatHistory = [] },
  } = useDesign();

  return (
    <div>
      <div className="space-y-4">
        {chatHistory?.map((chat, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 text-xs  ${
              chat.isAI ? "bg-[#F3F9F8] px-2 py-4 rounded-lg" : ""
            }`}
          >
            {chat.isAI ? (
              <Image
                src={aiImage}
                alt="AI avatar"
                width={10}
                height={10}
                className="rounded-full w-10 h-10"
              />
            ) : (
              <Image
                src={userImage}
                alt="User avatar"
                height={10}
                width={10}
                className="rounded-full w-10 h-10"
              />
            )}
            <div className="text-gray-700 text-sm">{chat.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
