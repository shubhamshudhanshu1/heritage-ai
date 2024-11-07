import {
  PlusOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "/public/assets/images/logo.jpg";
import Image from "next/image";
import dynamic from "next/dynamic";
import UserMenu from "@/components/UserMenu";
// Use dynamic imports for specific components
const Button = dynamic(() => import("antd/es/button"), { ssr: false });

const Header = ({ toggleSidebar }) => (
  <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
    {/* Left Section: Hamburger, Logo, and Title */}
    <div className="flex items-center space-x-3">
      {/* <MenuOutlined onClick={toggleSidebar} className="text-xl cursor-pointer" /> */}
      {/* Hamburger Icon */}
      <Image src={logo} alt="Heritage AI Logo" className="w-10 h-10" />
      <h1 className="text-2xl font-semibold m-0">Heritage AI</h1>
    </div>

    {/* Right Section: Actions */}
    <div className="flex items-center space-x-4">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="bg-primary px-4 py-4 rounded-[100px] hover:!bg-primary-dark"
      >
        New Design
      </Button>
      <QuestionCircleOutlined className="text-xl" />
      <UserMenu />
    </div>
  </div>
);

export default Header;
