'use client'

import React, { useState } from 'react'
import { Box, useMediaQuery, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { ImageField } from '@prismicio/client'
import QuestionBlock from './Blocks'

type Block = {
  date: string
  image: ImageField
  title: string
  text: string
  tag: string
}

type Props = {
  blocks: Block[]
}

export default function QuestionBlocksResponsive({ blocks }: Props) {
  const isMobile = useMediaQuery(`(max-width:630px)`)

  const [index, setIndex] = useState(0)

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : blocks.length - 1))
  }

  const handleNext = () => {
    setIndex((prev) => (prev < blocks.length - 1 ? prev + 1 : 0))
  }

  if (isMobile) {
    // Карусель на экранах < 630px
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={4}
        gap={2}
      >
        <IconButton onClick={handlePrev}  sx={{ bgcolor: '#BF9460', color: '#fff', pointerEvents: 'auto' }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box>
          <QuestionBlock {...blocks[index]} />
        </Box>

        <IconButton onClick={handleNext}  sx={{ bgcolor: '#BF9460', color: '#fff', pointerEvents: 'auto' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    )
  }

  // Сетка с переносом на больших экранах
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap="30px"
      justifyContent="center"
      mt="40px"
      maxWidth="1520px"
      mx="auto"
    >
      {blocks.map((block, idx) => (
        <Box key={idx}>
          <QuestionBlock {...block} />
        </Box>
      ))}
    </Box>
  )
}
