import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function NeedsText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box
    sx={{
      width: '100%',
      maxWidth: 430,
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      boxSizing: 'border-box',
    }}
  >
    {HomePage.data.text_needs}
  </Box>;
}
