import { createClient } from '@/prismicio'
import BusRouteButton from './Button'
import { Box } from '@mui/material'

export default async function BusRouteButtonWrapper() {
  const client = createClient()
  const doc = await client.getSingle('home_page')

  const routes = doc.data.map_button
    .map((item) => {
      const name = item.map_button_text
      const link = item.map_button_link

      if (!name || !link || !('url' in link) || !link.url) return null

      return {
        route_name: name,
        route_link: link.url,
      }
    })
    .filter((route): route is { route_name: string; route_link: string } => route !== null)

  return(
    <Box display='flex' sx={{ justifyContent: { xs: 'center', md: 'center', lg: 'flex-start' } }}>
    <BusRouteButton routes={routes}/>
    </Box>
  )
}
