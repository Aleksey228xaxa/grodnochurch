'use client'

import { Button } from "@mui/material"
import { useRouter } from "next/navigation"
import React from "react"

const ButtonFirstTime: React.FC = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/pervyi-raz-v-cerkvi')
  }

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        color: '#000',
        border: '3px solid #000',
        fontFamily:'Inter, sans-serif',
        px: 2,
        py: 1,
        fontSize: { xs: "0.7rem", sm: "0.9rem" },
        ":hover": {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      перейти в раздел первый раз в церкви
    </Button>
  )
}

export default ButtonFirstTime
