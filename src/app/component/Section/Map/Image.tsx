'use client'

import { Box, Card, useMediaQuery } from '@mui/material'

type ChurchMapProps = {
  latitude: number
  longitude: number
}

export default function ChurchMap({ latitude, longitude }: ChurchMapProps) {
  const isMobile = useMediaQuery('(max-width:630px)')
  const mapSrc = `https://yandex.by/map-widget/v1/?ll=${longitude}%2C${latitude}&z=16&pt=${longitude},${latitude},pm2rdm`

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2,
        px: isMobile ? '20px' : 0
      }}
    >
      <Card
        sx={{
          width: isMobile ? '100%' : 400,
          height: isMobile ? 300 : 400,
          borderRadius: '10%',
          overflow: 'hidden',
          boxShadow: '0px 10px 30px rgba(191, 148, 96, 0.3)',
        }}
      >
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allow="geolocation" 
          allowFullScreen
          loading="lazy"
        ></iframe>
      </Card>
    </Box>
  )
}
