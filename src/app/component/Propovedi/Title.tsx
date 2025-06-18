import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function SermonsTitle() {
  const client = createClient();
  const Sermons = await client.getSingle('sermons');

  return <Box color='#fff'><h2>{Sermons.data.title}</h2></Box>;
}
