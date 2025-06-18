import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { Box } from "@mui/material";

export default async function Slogan() {
  const client = createClient();
  const menuOne = await client.getSingle("menu_one");

  return (
    <Box
      sx={{
        maxWidth: "720px",
        width: "100%",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        lineHeight: "1.2",
        fontSize: "16px",
        color: "black",
        fontFamily: "Inter, sans-serif",

        // адаптация при экранах <1360px
        "@media (max-width:1360px)": {
          maxWidth: "100%", // ширина родителя
        },
      }}
    >
      <PrismicRichText field={menuOne.data.slogan} />
    </Box>
  );
}
