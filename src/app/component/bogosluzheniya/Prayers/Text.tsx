import { createClient } from "@/prismicio";
import { Box } from "@mui/material";
import { PrismicRichText } from "@prismicio/react";

export default async function Text() {
  const client = createClient();
  const HomePage = await client.getSingle('interchurch_prayers');

  return (
    <Box>
      <PrismicRichText field={HomePage.data.text} />
    </Box>
  );
}
