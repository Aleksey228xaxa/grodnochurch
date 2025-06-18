import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function Footer() {
  const client = createClient();
  const ChurchValues = await client.getSingle("church_values");

  return <Box maxWidth='1040px' fontSize='16px' fontFamily='Inter, sans-serif' textAlign='center'>{ChurchValues.data.footer}</Box>;
}
