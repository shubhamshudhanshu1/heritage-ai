"use client";
import React from "react";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppstoreOutlined,
  CloudFilled,
  CommentOutlined,
} from "@ant-design/icons";
import { resolvedConfig } from "../../tailwind.config";
import dynamic from "next/dynamic";

// Use dynamic imports for specific components

const recentDesigns = [
  {
    key: "/design/tea-tin",
    label: "Tea tin design",
    tag: "Bandhani",
  },
  {
    key: "/design/gift-box",
    label: "Festive gift box designs",
    tag: "Gond art",
  },
  {
    key: "/design/wedding-invite",
    label: "Wedding invitation design",
    tag: "Tanjore painting",
  },
];

const iconsMap = {
  "my-orders": <AppstoreOutlined />, // Example icon
  "my-account": <AppstoreOutlined />,
  support: <AppstoreOutlined />,
  explore: <AppstoreOutlined />,
  "design-details": <AppstoreOutlined />,
};

const Sidebar = ({ allowedModules = [] }) => {
  const pathname = usePathname(); // Get the current pathname
  const primaryColor = resolvedConfig.theme.colors.primary.DEFAULT;
  const backgroundColor = resolvedConfig.theme.colors.background.DEFAULT;
  const secondaryColor = resolvedConfig.theme.colors.secondary.DEFAULT;

  // Filter the menu items based on allowed modules
  const filteredMenuItems = allowedModules.map((module) => {
    console.log({ module });
    return {
      key: module.route,
      label: module.name,
      icon: iconsMap[module.slug],
      ...module.config,
    };
  });

  console.log({ filteredMenuItems, allowedModules });

  return (
    <div className="h-full p-6 w-72">
      {/* Menu Title */}
      <h3 className="text-sm font-semibold text-secondary mb-4">Menu</h3>

      {/* Main Menu */}
      <Menu
        mode="vertical"
        selectedKeys={[pathname]} // Use pathname from Next.js router
        className="border-none"
        style={{ paddingRight: "0", borderInlineEnd: "none" }} // Remove right border and padding
      >
        {filteredMenuItems.map((item) => {
          const isSelected = pathname === item.key;
          const styles = {
            backgroundColor: isSelected ? primaryColor : "",
            color: isSelected ? backgroundColor : secondaryColor,
            boxShadow: isSelected ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "",
            borderRadius: "1000px",
            padding: "8px 16px",
            marginBottom: "8px",
            height: "auto",
            lineHeight: "normal",
          };

          if (item.show === false) {
            return null;
          }
          return (
            <Menu.Item key={item.key} style={styles}>
              <Link
                href={item.key} // Next.js uses 'href' instead of 'to'
                className="flex items-center text-base font-medium space-x-3"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                    isSelected ? "border-background" : "bg-background-muted"
                  }`}
                >
                  {item.icon &&
                    React.cloneElement(item.icon, {
                      style: {
                        fontSize: "16px",
                        color: isSelected ? backgroundColor : secondaryColor,
                      },
                    })}
                </div>
                <span
                  className={isSelected ? "text-background" : "text-secondary"}
                >
                  {item.label}
                </span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>

      {/* Recent Designs Section */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-secondary mb-4 flex justify-between items-center">
          Recent Designs
          <AppstoreOutlined
            className="text-secondary"
            style={{ fontSize: "16px" }}
          />
        </h3>

        <div className="space-y-4 flex flex-col gap-2">
          {recentDesigns.map((design) => (
            <Link key={design.key} href={design.key}>
              <div className="flex items-center p-3 rounded-md border border-border hover:bg-background-muted transition">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border bg-background-muted">
                  <CommentOutlined
                    className="text-secondary"
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <span className="text-xs border border-tag text-primary font-semibold px-2 py-1 rounded-full">
                    {design.tag}
                  </span>

                  <div className="text-xs leading-4 mt-2">{design.label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
