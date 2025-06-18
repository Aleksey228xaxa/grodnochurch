
'use client'
import { Box, Button} from '@mui/material'

type BusRoute = {
  route_name: string
  route_link: string
}

export default function BusRouteButton({ routes }: { routes: BusRoute[] }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, gap: 2 }}>
      {routes.map((route, index) => (
        <Button
          key={index}
          variant="outlined"
          onClick={() => window.open(route.route_link, '_blank')}
          sx={{
            color:'#BF9460',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            border: '3px solid #BF9460',
          }}
        >
          {route.route_name}
        </Button>
      ))}
    </Box>
  )
}
