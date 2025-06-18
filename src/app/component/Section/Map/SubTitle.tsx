import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function MapSubTitle() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box mt='20px'  fontFamily='Inter, sans-serif' fontSize='24px'>{HomePage.data.subtitle_map}</Box>;
}
