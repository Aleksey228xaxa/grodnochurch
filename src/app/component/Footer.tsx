import { createClient } from "@/prismicio";
import { Link, Box } from "@mui/material";
import Logo from "./Menu/Logo";
import Slogan from "./Menu/Slogan";
import Adress from "./Menu/Adress";
import Contacts from "./Contacts/Contacts";
import Social from "./Social/Social";
import FooterText from "./FooterText/Footer_Text";
import { asLink } from "@prismicio/helpers";

export default async function Footer() {
  const client = createClient();

  const menuOne = await client.getSingle("menu_one");
  const menuTwo = await client.getSingle("menu_two");
  const aboutAs = await client.getSingle("submenu_item");
  const worship = await client.getSingle("submenu_item_two");

  return (
    <footer>
      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          px: { xs: "20px", md: "50px" },
          py: "30px",
          backgroundColor: "#F8F1E9",
          fontFamily: "Inter, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Верхняя секция */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", lg: "center" },
            gap: { xs: "20px", lg: 0 },
          }}
        >
          {/* Логотип, слоган, адрес */}
          <Box sx={{ display: "flex", gap: { xs: "20px", md: "90px" }, alignItems: "center" }}>
            <Logo document={menuOne} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Slogan />
              <Adress />
            </Box>
          </Box>

          {/* Контакты и соцсети — на всех экранах */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: "80px", md: "80px", lg: "220px" },
            }}
          >
            <Contacts />
            <Social />
          </Box>
        </Box>

        {/* Соцсети + Платёжные иконки — ТОЛЬКО на маленьких экранах */}
        {/* Ссылки меню и подменю — только для >=1200px */}
        <Box
          sx={{
            mt: "30px",
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
          }}
        >
          {/* Главное меню */}
          <Box sx={{ display: "flex", gap: "37px" }}>
            {menuTwo.data.menu_item.map((item, index) => {
              const MenuTwoUrl = asLink(item.url) || "#";
              return (
                <Link
                  key={index}
                  href={MenuTwoUrl}
                  rel="noopener noreferrer"
                  sx={{ textDecoration: "none", color: "#000" }}
                >
                  {item.title}
                </Link>
              );
            })}
          </Box>

          {/* Подменю и платёжные системы */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              mt: "15px",
            }}
          >
            <Box sx={{ display: "flex", gap: "160px" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {aboutAs.data.menu_items.map((item, index) => {
                  const aboutAsUrl = asLink(item.url) || "#";
                  return (
                    <Link
                      key={index}
                      href={aboutAsUrl}
                      rel="noopener noreferrer"
                      sx={{ textDecoration: "none", color: "#000" }}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  pr: "50px",
                }}
              >
                {worship.data.menu_items.map((item, index) => {
                  const worshipUrl = asLink(item.url) || "#";
                  return (
                    <Link
                      key={index}
                      href={worshipUrl}
                      rel="noopener noreferrer"
                      sx={{ textDecoration: "none", color: "#000" }}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </Box>
            </Box>

          </Box>
        </Box>

        {/* Нижняя линия и текст */}
        <Box sx={{ mt: "20px", borderTop: "1px solid #BF9460", pt: "20px" }}>
          <FooterText />
        </Box>
      </Box>
    </footer>
  );
}
