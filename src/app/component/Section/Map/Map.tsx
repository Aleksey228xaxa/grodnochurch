import { createClient } from '@/prismicio';
import { notFound } from 'next/navigation';
import ChurchMap from './Image';
import BusRouteButtonWrapper from './ButtonServer';
import MapText from './Text';
import MapTitle from './Title';
import MapSubTitle from './SubTitle';
import { Box } from '@mui/material';

export default async function MapPage() {
  const client = createClient();
  const doc = await client.getSingle('home_page', { fetchOptions: { cache: 'no-store' } });

  if (!doc?.data?.map) {
    return notFound();
  }

  const { latitude, longitude } = doc.data.map;

  return (
    <Box width="100%" height="100%" mt="80px" pb="80px">
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
        gap={4}
        alignItems={{ xs: 'center', md: 'center', lg: 'center' }}
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: '20px', md: '90px' },
          py: '60px',
        }}
      >
        {/* Текстовый блок */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'center', lg: 'left' },
          }}
        >
          <MapTitle />
          <MapSubTitle />
          <MapText />
          <BusRouteButtonWrapper />
        </Box>

        {/* Блок с картой */}
        <Box>
          <ChurchMap latitude={latitude} longitude={longitude} />
        </Box>
      </Box>
    </Box>
  );
}
