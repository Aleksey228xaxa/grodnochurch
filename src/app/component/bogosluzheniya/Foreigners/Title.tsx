import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function SermonsTitle() {
  const client = createClient();
  const Sermons = await client.getSingle('foreign_students');

  return <Box textAlign='center'><h3>{Sermons.data.title}</h3></Box>;
}
