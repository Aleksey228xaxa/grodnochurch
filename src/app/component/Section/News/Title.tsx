import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function NewsTitle() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box><h3>{HomePage.data.title_news}</h3></Box>;
}
