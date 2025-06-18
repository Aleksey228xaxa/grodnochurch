import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function TitleTwo() {
  const client = createClient();
  const ChurchValues = await client.getSingle("church_values");

  return <Box color='#FFF'><h3>{ChurchValues.data.titleaboutus}</h3></Box>;
}
