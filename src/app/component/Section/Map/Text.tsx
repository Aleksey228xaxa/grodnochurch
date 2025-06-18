import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function MapText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box mt='20px' maxWidth='520px'>{HomePage.data.text_map}</Box>;
}
