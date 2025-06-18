import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function QuoteText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box>{HomePage.data.quote_text}</Box>;
}
