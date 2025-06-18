import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function QuestionsText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box maxWidth='430px'>{HomePage.data.text_questions}</Box>;
}
