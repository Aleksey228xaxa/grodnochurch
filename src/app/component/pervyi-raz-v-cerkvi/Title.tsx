import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function Title() {
  const client = createClient();
  const FirstTime = await client.getSingle("first_time");

  return <Box color='#fff' maxWidth='900px'><h3>{FirstTime.data.title}</h3></Box>;
}
