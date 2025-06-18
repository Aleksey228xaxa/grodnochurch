'use client'

import { useState } from 'react'
import CalendarClient from './CalendarCell'
import CalendarClientTwo from './KalendarMini'
import ToggleCalendarButton from './Button'
import { Box } from '@mui/material'

interface Event {
  title: string
  date: string
  format: boolean
  language: boolean
}

export default function CalendarDisplay({ events }: { events: Event[] }) {
  const [showFirst, setShowFirst] = useState(true)
  const toggleCalendar = () => setShowFirst((prev) => !prev)

  return (
    <>
    <Box maxWidth='1240px' mx='auto'>
      {showFirst ? (
        <CalendarClient events={events} />
      ) : (
        <CalendarClientTwo events={events} />
      )}
    <Box display='flex' justifyContent='center' mt='20px' pb='80px'>
      <ToggleCalendarButton showFirst={showFirst} toggleCalendar={toggleCalendar} />
    </Box>
    </Box>
    </>
  )
}
