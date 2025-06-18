import { createClient } from '@/prismicio'
import { notFound } from 'next/navigation'
import { Box } from '@mui/material'
import MapSubTitle from '../Section/Map/SubTitle'
import MapText from '../Section/Map/Text'
import BusRouteButtonWrapper from '../Section/Map/ButtonServer'
import ChurchMap from '../Section/Map/Image'

export default async function MapPage() {
  const client = createClient()
  const doc = await client.getSingle('home_page', {
    fetchOptions: { cache: 'no-store' }
  })

  const mapData = doc?.data?.map

  if (!mapData?.latitude || !mapData?.longitude) {
    return notFound()
  }

  return (
    <Box width="100%" height="100%" mt={2.5} pb={5}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'center', md: 'center' }}
        gap={{ xs: 3, md: 4 }}
        sx={{
          maxWidth: { xs: '100%', sm: '90%', md: '1120px' },
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 6.25 },
          py: { xs: 2, sm: 3, md: 3.75 },
        }}
      >
        <Box 
          display="flex" 
          flexDirection="column"
          width={{ xs: '100%', md: 'auto' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <MapSubTitle />
          <MapText />
          <BusRouteButtonWrapper />
        </Box>
        <Box 
          width={{ xs: '100%', md: '50%' }}
          height={{ xs: '300px', sm: '400px', md: '500px' }}
        >
          <ChurchMap latitude={mapData.latitude} longitude={mapData.longitude} />
        </Box>
      </Box>
    </Box>
  )
}
