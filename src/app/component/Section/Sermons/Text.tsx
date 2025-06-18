import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function SermonsText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box color='#fff' textAlign='center' fontFamily='Inter, sans-serif' fontSize='24px'>{HomePage.data.text_sermons}</Box>;
}
