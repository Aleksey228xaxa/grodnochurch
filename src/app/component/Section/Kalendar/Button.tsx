'use client'

import { Button } from '@mui/material'

interface ToggleCalendarButtonProps {
  showFirst: boolean
  toggleCalendar: () => void
}

export default function ToggleCalendarButton({
  showFirst,
  toggleCalendar,
}: ToggleCalendarButtonProps) {
  return (
    <Button variant="contained" sx={{
                  color: "#FFF",
                  backgroundColor: "#BF9460",
                  border: "2px solid #BF9460",
                  fontFamily: "Inter, sans-serif",   
                  boxShadow:'none'    
                }} onClick={toggleCalendar}>
      {showFirst ? 'Переключиться на мини-календарь' : 'Переключиться на расширенный календарь'}
    </Button>
  )
}
