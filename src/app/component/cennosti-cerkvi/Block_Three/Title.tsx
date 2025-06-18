import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function TitleThree() {
  const client = createClient();
  const ChurchValues = await client.getSingle("church_values");

  return <Box><h3>{ChurchValues.data.titleourfaith}</h3></Box>;
}
