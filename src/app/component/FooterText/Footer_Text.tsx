import { createClient } from "@/prismicio";
import { Box } from "@mui/material";
import { PrismicRichText } from "@prismicio/react";

export default async function FooterText() {
  const client = createClient();
  const FooterData = await client.getSingle("footer");

  return (
    <Box sx={{fontSize:'12px', textAlign:'center'}}>
      <PrismicRichText field={FooterData.data.footer_text} />
    </Box>
  );
}
