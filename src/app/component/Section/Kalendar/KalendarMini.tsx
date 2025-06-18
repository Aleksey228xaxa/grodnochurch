'use client'

import {
  Box,
  IconButton,
  Typography,
  Paper,
  Divider,
  useMediaQuery,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useState } from 'react'

interface EventItem {
  title: string
  date: string
  format: boolean
  language: boolean
}

interface CalendarClientProps {
  events: EventItem[]
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

function getDayLabel(date: Date) {
  return date
    .toLocaleDateString('ru-RU', { weekday: 'short' })
    .toUpperCase()
}

function getDateRange(start: Date, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const newDate = new Date(start)
    newDate.setDate(start.getDate() + i)
    return newDate
  })
}

export default function CalendarClientTwo({ events }: CalendarClientProps) {
  const [currentStartDate, setCurrentStartDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const isWideScreen = useMediaQuery('(min-width:1100px)')
  const isMediumScreen = useMediaQuery('(min-width:780px) and (max-width:1099px)')
  const isVerySmallScreen = useMediaQuery('(max-width:459px)')
  const visibleDays = isWideScreen ? 15 : isMediumScreen ? 10 : 7

  const dateRange = getDateRange(currentStartDate, visibleDays)

  const eventsForSelectedDate = events
    .map((event) => {
      const dateObj = new Date(event.date)
      return {
        ...event,
        date: formatDate(dateObj),
        time: dateObj.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
    })
    .filter((event) => event.date === selectedDate)

  const goBack = () => {
    const newStart = new Date(currentStartDate)
    newStart.setDate(newStart.getDate() - 7)
    setCurrentStartDate(newStart)
  }

  const goForward = () => {
    const newStart = new Date(currentStartDate)
    newStart.setDate(newStart.getDate() + 7)
    setCurrentStartDate(newStart)
  }

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        fontSize={{ xs: '14px', sm: '16px' }}
        fontFamily="Inter, sans-serif"
        fontWeight={400}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          {currentStartDate.toLocaleDateString('ru-RU', {
            month: 'long',
            year: 'numeric',
          })}
        </Typography>
      </Box>

      <Box
        display="flex"
        gap={1}
        overflow="auto"
        mb={2}
        justifyContent="center"
        flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
      >
        {!isVerySmallScreen && (
          <IconButton onClick={goBack} sx={{ color: '#DBA04B' }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        )}

        {dateRange.map((date) => {
          const dateStr = formatDate(date)
          const isSelected = dateStr === selectedDate
          return (
            <Paper
              key={dateStr}
              elevation={isSelected ? 3 : 1}
              onClick={() => setSelectedDate(dateStr)}
              sx={{
                p: 1,
                cursor: 'pointer',
                minWidth: { xs: 40, sm: 56 },
                textAlign: 'center',
                backgroundColor: isSelected ? '#BF9460' : '#F8F1E9',
                color: isSelected ? 'white' : 'black',
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" sx={{ textTransform: 'uppercase' }}>
                {getDayLabel(date)}
              </Typography>
              <Typography variant="h6">{date.getDate()}</Typography>
            </Paper>
          )
        })}

        {!isVerySmallScreen && (
          <IconButton onClick={goForward} sx={{ color: '#DBA04B' }}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ backgroundColor: '#D9C3B0' }} />

      <Box mt={2}>
        {eventsForSelectedDate.length > 0 ? (
          eventsForSelectedDate.map((event, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {event.time}
              </Typography>
              <Typography variant="body1">{event.title}</Typography>
              <Typography variant="body2" color="#DBA04B">
                {event.format ? 'Онлайн' : 'Офлайн'}
              </Typography>
              <Typography variant="body2" color="#DBA04B">
                {event.language ? 'RU' : 'EN'}
              </Typography>
              <Divider sx={{ my: 1, backgroundColor: '#D9C3B0' }} />
            </Box>
          ))
        ) : (
          <Typography color="#D9C3B0">Нет событий на эту дату</Typography>
        )}
      </Box>
    </Box>
  )
}
