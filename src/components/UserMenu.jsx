// components/UserMenu.js
import React from "react";
import { Dropdown, Avatar, Menu, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

// Sample user data - replace with actual user data from props or context
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
};

const UserMenu = () => {
  // Define menu items
  const menuItems = (
    <Menu
      items={[
        {
          key: "user-info",
          label: (
            <div className="flex flex-col items-start px-4 py-2">
              <Typography.Text strong>{user.name}</Typography.Text>
              <Typography.Text type="secondary">{user.email}</Typography.Text>
            </div>
          ),
          disabled: true, // Info only, not clickable
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          label: (
            <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer">
              <LogoutOutlined />
              <span>Logout</span>
            </div>
          ),
          onClick: () => handleLogout(),
        },
      ]}
    />
  );

  // Handle logout action
  const handleLogout = () => {
    // Implement your logout functionality here
    console.log("Logging out...");
  };

  return (
    <Dropdown overlay={menuItems} trigger={["click"]} placement="bottomRight">
      <UserOutlined className="text-xl" />
      {/* <Avatar
        icon={<UserOutlined className="text-xl" />}
        className="cursor-pointer"
        style={{ backgroundColor: "transaparent", color: "#ffffff" }} // Customize Avatar color to match theme
      /> */}
    </Dropdown>
  );
};

export default UserMenu;
