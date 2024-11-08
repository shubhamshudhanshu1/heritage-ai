// components/UserMenu.js
import React from "react";
import { Dropdown, Menu, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";

const UserMenu = ({ userDetails }) => {
  const menuItems = (
    <Menu
      items={[
        {
          key: "user-info",
          label: (
            <div className="flex flex-col items-start px-4 py-2">
              <Typography.Text strong>
                {userDetails.companyName ||
                  `${userDetails.firstName} ${userDetails.lastName}`}
              </Typography.Text>
              <Typography.Text type="secondary">
                {userDetails.email}
              </Typography.Text>
            </div>
          ),
          disabled: true,
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
  const handleLogout = async () => {
    console.log("Logging out...");
    await signOut();
  };

  return (
    <Dropdown overlay={menuItems} trigger={["click"]} placement="bottomRight">
      <UserOutlined className="text-xl" />
    </Dropdown>
  );
};

export default UserMenu;
