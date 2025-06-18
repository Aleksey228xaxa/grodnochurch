import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function Title() {
  const client = createClient();
  const HomePage = await client.getSingle('contact');

  return <Box color='#fff'><h3>{HomePage.data.title}</h3></Box>;
}
