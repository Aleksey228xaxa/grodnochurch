import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function NeedsText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box width='430px'>{HomePage.data.text_needs}</Box>;
}
