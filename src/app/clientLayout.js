"use client";
import * as React from "react";
import { Provider } from "react-redux";
import { usePathname, redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import store from "@/redux/store";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import {
  AppstoreOutlined,
  UserOutlined,
  OrderedListOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./globals.css";

const iconsMap = {
  "my-orders": {
    icon: <OrderedListOutlined />,
    config: { showHeader: true, showSidebar: true },
  },
  "my-account": {
    icon: <UserOutlined />,
    config: { showHeader: true, showSidebar: true },
  },
  support: {
    icon: <AppstoreOutlined />,
    config: { showHeader: true, showSidebar: true },
  },
  explore: {
    icon: <StarOutlined />,
    config: { showHeader: true, showSidebar: true },
  },
  "design-details": {
    icon: <StarOutlined />,
    config: { showHeader: false, showSidebar: false },
  },
};

let publicRoutes = ["/auth/signin", "/auth/register"];

export default function ClientLayout({ children, session }) {
  const pathname = usePathname();

  // Filter allowed modules based on session
  let allowedModules = session?.user?.role?.allowedModules || [];
  let menuItems = allowedModules.map((module) => ({
    key: module.route,
    label: module.name,
    icon: iconsMap[module.slug]?.icon,
    config: { ...iconsMap[module.slug]?.config, ...module.config },
  }));

  let activeRoute = menuItems.find((item) => pathname.includes(item.key));
  let { showHeader = true, showSidebar = true } = activeRoute?.config || {};
  let isPublicRoute = publicRoutes.includes(pathname);

  if (!isPublicRoute && !session) {
    redirect("/auth/signin");
  }

  return (
    <SessionProvider>
      <Provider store={store}>
        <div className="h-screen flex flex-col overflow-scroll">
          {/* Header at the top */}
          {isPublicRoute ? (
            <div>
              <div>
                <Header session={session} />
              </div>
              <div className="m-10">{children}</div>
            </div>
          ) : (
            <>
              {showHeader && (
                <div>
                  <Header session={session} />
                </div>
              )}

              {/* Main Content Area with Sidebar and Children */}
              <div className="flex flex-1">
                {showSidebar && (
                  <div className="w-64">
                    <Sidebar allowedModules={allowedModules} />
                  </div>
                )}
                <div className="flex-1 p-8 overflow-auto">{children}</div>
              </div>
            </>
          )}
        </div>
      </Provider>
    </SessionProvider>
  );
}
