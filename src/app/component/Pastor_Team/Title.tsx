import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function Title() {
  const client = createClient();
  const HomePage = await client.getSingle("pastoral_teams");

  return <Box><h2>{HomePage.data.title}</h2></Box>;
}
