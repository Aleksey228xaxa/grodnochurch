import { createClient } from "@/prismicio";
import { Box } from "@mui/material";
import Logo from "./Logo";
import Slogan from "./Slogan";
import Adress from "./Adress";
import ButtonDonate from "./Button_donate";

export default async function Menu() {
  const client = createClient();
  const menuOne = await client.getSingle("menu_one");

  return (
    <Box sx={{ backgroundColor: "white", px: { xs: "40px", md: "50px" } }}>
      <Box
        sx={{
          maxWidth: "1240px",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Logo document={menuOne} />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            mt: "10px",
            gap: "10px",
            ml: "20px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "720px",
              "@media (max-width:740px)": {
                visibility: "hidden",
                width: 0,
                height: 0,
              },
            }}
          >
            <Slogan />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Box sx={{ "@media (max-width:960px)": {
                display:'none'
              },}}>
            <Adress />
            </Box>
            <ButtonDonate />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
