import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function MainSubTitle() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box textAlign='center' color='#fff'><h3>{HomePage.data.subtitle}</h3></Box>;
}
