import { createClient } from "@/prismicio";
import { Box } from "@mui/material";
import { PrismicRichText } from "@prismicio/react";


export default async function Adress() {
  const client = createClient();
  const menuOne = await client.getSingle("menu_one");

  return (
    <Box width="230px" sx={{ color: "#000", lineHeight: "1.2", fontSize: "16px", fontFamily: 'Inter, sans-serif'}}>
      <PrismicRichText field={menuOne.data.adress} />
    </Box>
  );
}
