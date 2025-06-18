import { createClient } from '@/prismicio'
import { Box } from '@mui/material'
import KalendarTitle from './Title'
import { Content } from '@prismicio/client'
import CalendarPageTwo from './KalendarMiniServer'
import CalendarButton from './ButtonTwo'

export default async function CalendarPage() {
  const client = createClient()
  const HomePage = await client.getSingle<Content.NewsEventsDocument>('news_events')

  const allEventGroups = [
    ...(HomePage.data.events || []),
    ...(HomePage.data.conferences || []),
    ...(HomePage.data.happenings || []),
    ...(HomePage.data.training || []),
  ]

  const events = allEventGroups
    .filter((event) => !!event.date)
    .map((event) => ({
      title: event.title || '',
      date: event.date || '',
      format: event.format || false,
      language: event.language || false,
    }))

  return (
    <Box width="100%" height="100%">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: '1540px',
          mx: 'auto',
          px: { xs: '20px', md: '50px' },
          py: '30px',
        }}
      >
        <KalendarTitle />
        <CalendarPageTwo events={events}/>
        <CalendarButton />
      </Box>
    </Box>
  )
}
