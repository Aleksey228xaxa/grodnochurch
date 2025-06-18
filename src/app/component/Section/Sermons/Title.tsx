import { createClient } from "@/prismicio";
import { Box } from "@mui/material";

export default async function SermonsTitle() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  return <Box color='#fff' textAlign='center' sx={{ fontSize: {
    xs: '56px',    // для мобильных
    sm: '72px',  // для планшетов
    md: '74px',  // для десктопов
  },}}>{HomePage.data.title_sermons}</Box>;
}
