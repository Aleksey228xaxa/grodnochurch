import React, { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { asLink } from "@prismicio/helpers";
import { LinkField, KeyTextField } from "@prismicio/types";

interface MenuItem {
  title: KeyTextField;
  url: LinkField;
  isclickable?: boolean;
  submenu?: {
    data: {
      menu_items: SubMenuItem[];
    };
  };
}

interface SubMenuItem {
  title: KeyTextField;
  url: LinkField;
}

interface MenuData {
  data: {
    menu_item: MenuItem[];
  };
}

interface Props {
  menuData: MenuData;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  handleNavigate: (url?: string | null) => void;
}

const DrawerMenu: React.FC<Props> = ({
  menuData,
  drawerOpen,
  setDrawerOpen,
  handleNavigate,
}) => {
  // Храним индекс раскрытого подменю, или null если ничего не открыто
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const toggleSubmenu = (index: number) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      sx={{
        zIndex: 9999,
        '& .MuiDrawer-paper': {
          zIndex: 9999,
        },
      }}
      PaperProps={{
        sx: {
          width: { xs: '80vw', sm: 280 },
          maxWidth: '100%',
          bgcolor: "#f5f0e6",
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          p: 2,
          position: "relative",
          zIndex: 9999,
        },
      }}
    >
      <Box
        role="presentation"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <List sx={{ flexGrow: 1 }}>
          {menuData?.data?.menu_item?.map((item: MenuItem, index: number) => {
            const hasSubmenu = item.submenu?.data?.menu_items && item.submenu.data.menu_items.length > 0;
            const isOpen = openSubmenuIndex === index;

            return (
              <Box key={index} sx={{ position: "relative" }}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (hasSubmenu) {
                        toggleSubmenu(index);
                      } else if (item.isclickable) {
                        handleNavigate(asLink(item.url) ?? "#");
                        setDrawerOpen(false);
                      }
                    }}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      color: "#4a403a",
                      fontWeight: "600",
                      cursor: hasSubmenu ? "pointer" : "pointer",
                      "&:hover": {
                        bgcolor: hasSubmenu ? "#e0d6c7" : "#bf9460",
                        color: hasSubmenu ? "#4a403a" : "#fff",
                      },
                    }}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>

                {/* Подменю раскрывается внутри Collapse */}
                {hasSubmenu && item.submenu && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 4 }}>
                      {item.submenu.data.menu_items.map((sub: SubMenuItem, subIndex: number) => (
                        <ListItem key={subIndex} disablePadding>
                          <ListItemButton
                            onClick={() => {
                              handleNavigate(asLink(sub.url) ?? "#");
                              setDrawerOpen(false);
                            }}
                            sx={{
                              borderRadius: 1,
                              mb: 0.5,
                              color: "#6b5e4a",
                              fontWeight: "500",
                              fontSize: "0.9rem",
                              "&:hover": {
                                bgcolor: "#d9c3a2",
                                color: "#3e2f1c",
                              },
                            }}
                          >
                            <ListItemText primary={sub.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
