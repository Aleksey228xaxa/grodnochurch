"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { asLink } from "@prismicio/helpers";
import { MenuTwoDocument } from "./types";
import DrawerMenu from "./Drawer";

interface Props {
  menuData: MenuTwoDocument;
}

const MenuClient: React.FC<Props> = ({ menuData }) => {
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
  const [submenuAnchors, setSubmenuAnchors] = useState<{ [key: number]: HTMLElement | null }>({});
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1100px)");

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrolled(window.scrollY > 130);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleMenuClose = (index: number) => {
    setAnchorEl((prev) => ({ ...prev, [index]: null }));
  };

  const handleSubmenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSubmenuAnchors((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleSubmenuClose = (index: number) => {
    setSubmenuAnchors((prev) => ({ ...prev, [index]: null }));
  };

  const handleNavigate = (url?: string | null) => {
    router.push(url ?? "#");
    setDrawerOpen(false);
  };

  return (
    <Box width="100%">
      <AppBar
        position={scrolled ? "fixed" : "sticky"}
        sx={{
          top: 0,
          transition: "top 0.3s, position 0.3s",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "#BF9460",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {isMobile ? (
            <>
              {/* Гамбургер справа с отступами */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  position: "absolute",
                  right: 8,
                  px: { xs: "25px", md: "50px" },
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* Drawer слева */}
<DrawerMenu
  menuData={menuData}
  drawerOpen={drawerOpen}
  setDrawerOpen={setDrawerOpen}
  handleNavigate={handleNavigate}
/>


            </>
          ) : (
            <Box display="flex" gap="25px">
              {menuData?.data?.menu_item?.map((item, index) => (
                <Box key={index}>
                  <Button
                    onMouseEnter={(event) => handleMenuOpen(event, index)}
                    onClick={() =>
                      item.isclickable &&
                      handleNavigate(asLink(item.url) ?? "#")
                    }
                    sx={{ color: "#fff", textTransform: "none" }}
                  >
                    {item.title}
                  </Button>

                  {item.submenu?.data?.menu_items &&
                    Array.isArray(item.submenu.data.menu_items) && (
                      <Menu
                        anchorEl={anchorEl[index]}
                        open={Boolean(anchorEl[index])}
                        onClose={() => handleMenuClose(index)}
                        onMouseLeave={() => handleMenuClose(index)}
                      >
                        {item.submenu.data.menu_items.map((sub, subIndex) => (
                          <MenuItem
                            key={subIndex}
                            onClick={() =>
                              handleNavigate(asLink(sub.url) ?? "#")
                            }
                            onMouseEnter={(event) =>
                              handleSubmenuOpen(event, subIndex)
                            }
                          >
                            {sub.title}

                            {sub.submenu_item_two?.data?.menu_items &&
                              Array.isArray(
                                sub.submenu_item_two.data.menu_items
                              ) && (
                                <Menu
                                  anchorEl={submenuAnchors[subIndex]}
                                  open={Boolean(submenuAnchors[subIndex])}
                                  onClose={() => handleSubmenuClose(subIndex)}
                                  onMouseLeave={() =>
                                    handleSubmenuClose(subIndex)
                                  }
                                >
                                  {sub.submenu_item_two.data.menu_items.map(
                                    (sub2, sub2Index) => (
                                      <MenuItem
                                        key={sub2Index}
                                        onClick={() =>
                                          handleNavigate(asLink(sub2.url) ?? "#")
                                        }
                                      >
                                        {sub2.title}
                                      </MenuItem>
                                    )
                                  )}
                                </Menu>
                              )}
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                </Box>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuClient;
