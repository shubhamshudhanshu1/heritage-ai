"use client";
import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import theme from "../theme/index";
import { Provider } from "react-redux";
import { useRouter, usePathname, redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "@/redux/store";
import Logout from "../components/logout";
import GroupIcon from "@mui/icons-material/Group";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SettingsIcon from "@mui/icons-material/Settings";
import { blue, grey } from "@mui/material/colors"; // Import colors
import WidgetsIcon from "@mui/icons-material/Widgets";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import CategoryIcon from "@mui/icons-material/Category";

const drawerWidth = 240;

// Drawer styling
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

// Icons mapping
const icons = {
  Tenants: <AddBusinessIcon />,
  People: <GroupIcon />,
  Config: <SettingsIcon />,
  Blocks: <WidgetsIcon />,
  Components: <CallToActionIcon />,
  Orders: <WidgetsIcon />,
  Products: <CategoryIcon />,
};

// Menu items configuration
export const listItemsConfig = [
  { text: "Config", route: "/config", icon: <AddBusinessIcon /> },
  { text: "Schema", route: "/settingSchema", icon: <SettingsIcon /> },
];

let publicRoutes = ["/auth/signin", "/auth/register"];

export default function ClientLayout({ children, session }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const router = useRouter();

  // Redirect to login if not authenticated
  let isPublicRoute = publicRoutes.includes(pathname);
  if (!isPublicRoute && !session) {
    redirect("/auth/signin");
  }

  // Get allowed modules from session
  let allowedModules = session?.user?.role?.allowedModules || [];

  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
          />
          {isPublicRoute ? (
            <Box className="w-screen h-screen flex flex-col space-between items-center align-middle pt-20 bg-inherit">
              {children}
            </Box>
          ) : (
            <Box sx={{ display: "flex" }} className="bg-inherit">
              <CssBaseline />
              <AppBar position="fixed" open={open}>
                <div className="flex justify-between items-center px-4">
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={[
                        {
                          marginRight: 5,
                        },
                        open && { display: "none" },
                      ]}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                      Admin - {session?.user?.tenant}
                    </Typography>
                  </Toolbar>
                  <div>
                    <Logout />
                  </div>
                </div>
              </AppBar>
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  {allowedModules.map((item) => (
                    <ListItem
                      key={item.name}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <ListItemButton
                        sx={[
                          { minHeight: 48, px: 2.5 },
                          open
                            ? { justifyContent: "initial" }
                            : { justifyContent: "center" },
                        ]}
                        onClick={() => router.push(item.route)}
                      >
                        <ListItemIcon
                          sx={[
                            { minWidth: 0, justifyContent: "center" },
                            open ? { mr: 3 } : { mr: "auto" },
                          ]}
                        >
                          {React.cloneElement(icons[item.name], {
                            style: {
                              color: pathname.includes(item.route)
                                ? blue[500]
                                : grey[700], // Active route gets blue, inactive grey
                            },
                          })}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
              <Box component="main" className="overflow-hidden w-full">
                <DrawerHeader />
                <div
                  style={{
                    height: "calc(100vh - 64px)",
                    padding: "20px",
                    overflow: "scroll",
                  }}
                >
                  {children}
                </div>
              </Box>
            </Box>
          )}
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
