'use client'

import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function CalendarButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/kalendar');
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        color: "#FFF",
        backgroundColor: "#BF9460",
        border: "2px solid #BF9460",
        fontFamily: "Inter, sans-serif",   
        boxShadow:'none',
        px: 2,
        py: 1,
        fontSize: { xs: "0.7rem", sm: "0.9rem" },   
      }}
    >
      Все события
    </Button>
  )
}