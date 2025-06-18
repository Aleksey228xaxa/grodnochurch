import { createClient } from "@/prismicio";
import { Box, Typography } from "@mui/material";

export default async function SermonsText() {
  const client = createClient();
  const Sermons = await client.getSingle('sermons');

  return (
    <Box 
      sx={{
        textAlign: 'center',
        maxWidth: '1040px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 }, // Адаптивные отступы по бокам
        color: '#fff',
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: '1rem',    // для мобильных
            sm: '1.1rem',  // для планшетов
            md: '1.2rem',  // для десктопов
          },
          lineHeight: {
            xs: 1.5,
            sm: 1.6,
            md: 1.7,
          },
          fontWeight: {
            xs: 400,
            sm: 400,
            md: 400,
          },
        }}
      >
        {Sermons.data.text}
      </Typography>
    </Box>
  );
}
