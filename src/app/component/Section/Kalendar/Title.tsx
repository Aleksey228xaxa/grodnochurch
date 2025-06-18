import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function KalendarTitle() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box><h3>{HomePage.data.title_kalendar}</h3></Box>;
}
