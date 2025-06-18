import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function Adress() {
  const client = createClient();
  const HomePage = await client.getSingle('contact');

  return <Box>{HomePage.data.adress}</Box>;
}
