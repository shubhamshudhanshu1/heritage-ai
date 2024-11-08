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

const menuItems = [
  {
    key: "/myOrders",
    label: "My Orders",
    icon: <OrderedListOutlined />,
  },
  {
    key: "/myAccount",
    label: "My Account",
    icon: <UserOutlined />,
  },
  {
    key: "/support",
    label: "Support",
    icon: <AppstoreOutlined />,
  },
  {
    key: "/explore",
    label: "Explore",
    icon: <StarOutlined />,
    extraClasses: "mt-4",
  },
  {
    key: "/design",
    show: false,
    label: "Design Details",
    icon: <StarOutlined />,
    extraClasses: "mt-4",
    config: {
      showHeader: false,
      showSidebar: false,
    },
  },
];

let publicRoutes = ["/auth/signin", "/auth/register"];

export default function ClientLayout({ children, session }) {
  const pathname = usePathname();
  let activeRoute = menuItems.find((item) => pathname.includes(item.key));
  let { showHeader = true, showSidebar = true } = activeRoute?.config || {};
  let isPublicRoute = publicRoutes.includes(pathname);
  if (!isPublicRoute && !session) {
    redirect("/auth/signin");
  }

  let allowedModules = session?.user?.role?.allowedModules || [];

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
                    <Sidebar menuItems={menuItems} />
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
