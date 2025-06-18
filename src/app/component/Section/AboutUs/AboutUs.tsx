import { Box, Button } from "@mui/material";
import AboutUsTitle from "./Title";
import AboutUsText from "./Text";
import EmblaCarousel from "./CarouselTwo";
import Link from "next/link";

export default async function AboutUs() {
  return (
    <Box width="100%" height="100%" pb="40px">
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          maxWidth: "1140px",
          mx: "auto",
          px: { xs: "16px", sm: "24px", md: "50px" },
          py: { xs: "30px", md: "50px" },
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          mt={{ xs: "20px", md: "30px" }}
          gap={{ xs: "32px", md: "80px" }}
        >
          <Box
            textAlign={{ xs: "center", md: "left" }}
            maxWidth={{ xs: "100%", md: "50%" }}
          >
            <AboutUsTitle />
            <AboutUsText />
            <Link href="/cennosti-cerkvi" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  color: "#FFF",
                  backgroundColor: "#BF9460",
                  border: "2px solid #BF9460",
                  fontFamily: "Inter, sans-serif",
                  boxShadow: "none",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Подробнее
              </Button>
            </Link>
          </Box>
          <Box
            maxWidth={{ xs: "100%", md: "50%" }}
            width="100%"
            sx={{
              height: { xs: "200px", sm: "250px", md: "300px" },
              overflow: "hidden",
            }}
          >
            <EmblaCarousel />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
