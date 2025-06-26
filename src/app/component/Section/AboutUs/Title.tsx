export const dynamic = "force-dynamic";

import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function AboutUsTitle() {
  const client = createClient({
    fetch: (url, options = {}) =>
      fetch(url, { ...options, cache: "no-store" }),
  });
  const HomePage = await client.getSingle("home_page");

  return <Box><h2>{HomePage.data.titleaboutus}</h2></Box>;
}
