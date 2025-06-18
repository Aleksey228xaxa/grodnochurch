import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function TitleFour() {
  const client = createClient();
  const ChurchValues = await client.getSingle("church_values");

  return <Box><h3>{ChurchValues.data.titleforwhat}</h3></Box>;
}
