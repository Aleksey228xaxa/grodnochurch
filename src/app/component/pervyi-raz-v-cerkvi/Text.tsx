import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function Text() {
  const client = createClient();
  const FirstTime = await client.getSingle("first_time");

  return <Box color='#fff' textAlign='center' maxWidth='800px'>{FirstTime.data.text}</Box>;
}
