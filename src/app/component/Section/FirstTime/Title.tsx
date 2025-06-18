import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function FirstTimeTitle() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box color='#000' fontFamily='Inter, sans-serif'><h3>{HomePage.data.title_first_time}</h3></Box>;
}
