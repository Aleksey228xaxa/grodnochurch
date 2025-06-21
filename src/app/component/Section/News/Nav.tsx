'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import { ImageField } from '@prismicio/client'
import QuestionBlock from './Bloks'

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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  if (isMobile) {
    return (
      <Box mt={4}>
        <Box
          ref={emblaRef}
          sx={{
            overflow: 'hidden',
            maxWidth: '430px',
            mx: 'auto',
            height: '600px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              backfaceVisibility: 'hidden',
              touchAction: 'pan-y',
              height: '100%',
            }}
          >
            {blocks.map((block, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: '0 0 100%',
                  minWidth: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <QuestionBlock {...block} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Точки навигации */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 2,
          }}
        >
          {blocks.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => scrollTo(idx)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: selectedIndex === idx ? '#BF9460' : '#F8F1E9',
                border: '1px solid #BF9460',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: selectedIndex === idx ? '#BF9460' : '#E8D5C0',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    )
  }

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
