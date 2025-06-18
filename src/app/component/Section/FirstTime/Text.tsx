import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function FirstTimeText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box display='flex'  fontFamily='Inter, sans-serif' justifyContent='center' textAlign='center' maxWidth='1200px'>{HomePage.data.text_first_time}</Box>;
}
