import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function MainTitle() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box textAlign='center' color='#fff'><h1>{HomePage.data.title}</h1></Box>;
}
