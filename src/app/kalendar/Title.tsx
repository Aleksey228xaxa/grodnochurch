import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function Title() {
  const client = createClient();
  const HomePage = await client.getSingle('calendar');

  return <Box color='#FFF' fontFamily='Inter, sans-serif'><h3>{HomePage.data.title}</h3></Box>;
}
