"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Divider,
  Tooltip,
  Collapse,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  IconX,
  IconArrowsCross,
  IconArrowsRight,
  IconChevronDown,
  IconChevronRight,
  IconMenu2,
  IconMenu4,
} from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import { menuItems } from "./menuConfig";
import { useSidebar } from "./AppShell";

const drawerWidth = 260;

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { sidebarOpen, setSidebarOpen, mobileDrawerOpen, setMobileDrawerOpen } =
    useSidebar();

  const [open, setOpen] = useState(Boolean(sidebarOpen));
  const [hoverOpen, setHoverOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(open);
    }
  }, [open, setSidebarOpen, isMobile]);

  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (key, parentKey = "") => {
    setOpenGroups((prev) => {
      const next = { ...prev };

      if (next[key]) {
        next[key] = false;
        Object.keys(next).forEach((k) => {
          if (k !== key && k.startsWith(key + "::")) next[k] = false;
        });
        return next;
      }

      const getParent = (k) => {
        const parts = k.split("::");
        return parts.slice(0, -1).join("::");
      };

      Object.keys(next).forEach((k) => {
        if (getParent(k) === parentKey) next[k] = false;
      });

      const parts = key.split("::");
      let acc = "";
      for (let i = 0; i < parts.length - 1; i++) {
        acc = acc ? acc + "::" + parts[i] : parts[i];
        next[acc] = true;
      }

      next[key] = true;
      return next;
    });
  };

  const handleNavigate = (path) => {
    if (!path) return;
    router.push(path);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
    if (!isMobile && !open && hoverOpen) {
      setHoverOpen(false);
    }
  };

  const renderItems = (items, depth = 0, parentKey = "") => (
    <List disablePadding sx={{ px: open || hoverOpen ? 1 : 0.5 }}>
      {items.map((item, idx) => {
        const localKey = item.id || `${item.label}-${idx}`;
        const key = parentKey ? `${parentKey}::${localKey}` : localKey;
        const active = item.path && pathname === item.path;
        const hasChildren = !!item.children?.length;
        const paddingLeft = depth * 2;
        const collapsed = !open && !hoverOpen;

        const button = (
          <ListItemButton
            key={key}
            selected={active}
            onClick={() => {
              if (hasChildren) {
                toggleGroup(key, parentKey);
              } else {
                handleNavigate(item.path);
              }
            }}
            sx={{
              pl: collapsed ? 1 : paddingLeft + 1.5,
              pr: 1.5,
              py: 1,
              mb: 0.5,
              minHeight: 40,
              borderRadius: 1,
              justifyContent: collapsed ? "center" : "flex-start",
              transition: "all 0.18s ease-in-out",
              "&:hover": { backgroundColor: "action.hover" },
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": { backgroundColor: "primary.dark" },
                "& .MuiListItemIcon-root": { color: "primary.contrastText" },
              },
              "& .MuiListItemIcon-root": {
                minWidth: 20,
                mr: open || hoverOpen ? 1.5 : 0,
                color: active ? "primary.contrastText" : "text.secondary",
                justifyContent: "center",
              },
              "& .MuiListItemText-primary": {
                fontSize: "0.875rem",
                fontWeight: active ? 600 : 500,
              },
            }}
          >
            {item.icon && <ListItemIcon sx={{ minWidth: 20 }}>{item.icon}</ListItemIcon>}
            {(open || hoverOpen) && <ListItemText primary={item.label} />}
            {(open || hoverOpen) && hasChildren && (
              <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                {openGroups[key] ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
              </Box>
            )}
          </ListItemButton>
        );

        return (
          <React.Fragment key={key}>
            {collapsed ? (
              <Tooltip title={item.label} placement="right" arrow>
                {button}
              </Tooltip>
            ) : (
              button
            )}

            {hasChildren && (open || hoverOpen) && (
              <Collapse in={Boolean(openGroups[key])} timeout="auto" unmountOnExit>
                {renderItems(item.children, depth + 1, key)}
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : open || hoverOpen ? "space-between" : "center",
          alignItems: "center",
          px: isMobile ? 2 : open || hoverOpen ? 2 : 1,
          minHeight: 64,
          backgroundColor: "background.paper",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {(open || isMobile || hoverOpen) && (
          <Box sx={{ fontWeight: 700, fontSize: "1.1rem", color: "primary.main", letterSpacing: 0.5 }}>
            SnowHacks
          </Box>
        )}

        <Tooltip title={isMobile ? "Close menu" : open ? "Collapse sidebar" : "Expand sidebar"} placement="right">
          <IconButton
            onClick={() => {
              if (isMobile) {
                setMobileDrawerOpen(false);
              } else {
                setOpen((o) => !o);
                setHoverOpen(false);
              }
            }}
            size="small"
            sx={{
              backgroundColor: "action.hover",
              transition: "all 0.18s ease-in-out",
              "&:hover": { backgroundColor: "action.selected" },
            }}
          >
            {isMobile ? (
              <IconX size={20} />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.3s ease-in-out",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {open ? <IconArrowsRight size={20} /> : <IconArrowsCross size={20} />}
              </Box>
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Divider />

      <Box sx={{ py: 1, overflowY: "auto", overflowX: "hidden", flex: 1 }}>{renderItems(menuItems)}</Box>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  const currentWidth = open ? drawerWidth : hoverOpen ? drawerWidth : 64;

  return (
    <Drawer
      variant="permanent"
      open
      onMouseEnter={() => !open && setHoverOpen(true)}
      onMouseLeave={() => !open && setHoverOpen(false)}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: currentWidth,
          transition: "width 0.2s ease-in-out",
          overflowX: "hidden",
          boxSizing: "border-box",
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open || hoverOpen ? "space-between" : "center",
          alignItems: "center",
          px: open || hoverOpen ? 2 : 1,
          minHeight: 64,
          backgroundColor: "background.paper",
          transition: "all 0.2s ease-in-out",
          position: "relative",
          zIndex: 11,
        }}
      >
        {(open || hoverOpen) && (
          <Box sx={{ fontWeight: 700, fontSize: "1.1rem", color: "primary.main", letterSpacing: 0.5 }}>
            SnowHacks
          </Box>
        )}
        <IconButton
          onClick={() => {
            setOpen((o) => !o);
            setHoverOpen(false);
          }}
          size="small"
          sx={{
            transition: "all 0.18s ease-in-out",
            "&:hover": { backgroundColor: "action.selected" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease-in-out",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {open ? <IconMenu2 size={20} /> : <IconMenu4 size={20} />}
          </Box>
        </IconButton>
      </Toolbar>

      <Box
        sx={{
          py: 1,
          overflowY: "auto",
          overflowX: "hidden",
          flex: 1,
          scrollbarWidth: "thin",
          scrollbarColor: (theme) =>
            `${theme.palette.action.hover} transparent`,
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.2)",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.4)"
                : "rgba(0,0,0,0.4)",
          },
        }}
      >
        {renderItems(menuItems)}
      </Box>
    </Drawer>
  );
}
