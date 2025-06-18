import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function QuoteStatusText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box color='grey'>{HomePage.data.quote_post}</Box>;
}
