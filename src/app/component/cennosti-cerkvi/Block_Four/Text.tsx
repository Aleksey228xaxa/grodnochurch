import { createClient } from "@/prismicio";
import { Box } from "@mui/material";
import { PrismicRichText } from "@prismicio/react";

export default async function TextFour() {
  const client = createClient();
  const ChurchValues = await client.getSingle("church_values");

  return (
    <Box maxWidth='1020px' mt='40px'><PrismicRichText field={ChurchValues.data.textforwhat} /></Box>
  );
}
