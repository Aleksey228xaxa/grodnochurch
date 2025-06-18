import { Box, Button } from "@mui/material";
import MainText from "./Text";
import MainTitle from "./Title";
import MainSubTitle from "./SubTitle";
import { createClient } from "@/prismicio";
import Link from "next/link";

export default async function Main() {
  const client = createClient();
  const document = await client.getSingle("home_page");
  const backgroundUrl = document.data.background_image.url;

  return (
    <Box
      width="100%"
      minHeight={{ xs: "400px", sm: "500px", md: "550px" }}
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        mx: "auto",

        // Центрируем контент по вертикали и горизонтали
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Затемнение */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      {/* Контент */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1240px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
    pb: { xs: 6, sm: 8 },
          textAlign: "center",
          color: "white",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mt: { xs: 0, sm: 2 },
            width: "100%",
            maxWidth: 600,
          }}
        >
          {/* Основные заголовки */}
          <MainTitle/>
          <MainSubTitle/>

          {/* Текст с адаптивным размером и ограничением по ширине */}
          <Box
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              lineHeight: 1.5,
              color: "white",
              mb: 4,
              px: { xs: 2, sm: 0 },
              mx: "auto",
            }}
          >
            <MainText />
          </Box>

          {/* Кнопки */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/kalendar" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  color: "#FFF",
                  backgroundColor: "#BF9460",
                  border: "2px solid #BF9460",
                  fontFamily: "Inter, sans-serif",
                  boxShadow: "none",
                  px: 2,
                  py: 1,
                  fontSize: { xs: "0.7rem", sm: "0.9rem" },
                }}
              >
                Расписание
              </Button>
            </Link>
            <Button
              variant="outlined"
              component="a"
              href="https://www.youtube.com/@grodnochurch/streams"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#FFF",
                backgroundColor: "transparent",
                border: "3px solid #FFF",
                fontFamily: "Inter, sans-serif",
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                px: 2,
                py: 1,
                fontSize: { xs: "0.7rem", sm: "0.9rem" },
              }}
            >
              Трансляции
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
