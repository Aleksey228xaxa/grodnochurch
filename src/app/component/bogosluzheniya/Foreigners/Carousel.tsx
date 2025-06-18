'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { createClient } from '@/prismicio'
import { Box, Button, Paper, Typography } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import { Content, ImageField } from '@prismicio/client'

export function CustomImageGallery() {
  const [images, setImages] = useState<ImageField[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: true })

  useEffect(() => {
    const fetchImages = async () => {
      const client = createClient()
      const generalDoc = await client.getSingle<Content.ForeignStudentsDocument>('foreign_students')
      const gallery = generalDoc.data.images || []

      const imageFields = gallery
        .map((item) => item.image)
        .filter((img): img is ImageField => !!img && !!img.url)

      setImages(imageFields)
    }

    fetchImages()
  }, [])

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi || images.length === 0) return
      const safeIndex = ((index % images.length) + images.length) % images.length
      emblaApi.scrollTo(safeIndex)
      setSelectedIndex(safeIndex)
    },
    [emblaApi, images.length]
  )

  const prev = () => scrollTo(selectedIndex - 1)
  const next = () => scrollTo(selectedIndex + 1)

  return (
    <Box 
      display="flex" 
      gap={2}
      px="40px"
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        justifyContent: 'center',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Главное изображение */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', md: 728 },
          height: { xs: 300, md: 448 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: 2,
          position: 'relative',
          bgcolor: '#000',
          p: 0,
          cursor: 'default',
        }}
      >
        {images[selectedIndex] ? (
          <PrismicNextImage
            field={images[selectedIndex]}
            fill
            style={{ objectFit: 'cover' }}
            alt=""
          />
        ) : (
          <Typography color="white" variant="body2">
            Нет изображений
          </Typography>
        )}

        <Button
          onClick={prev}
          sx={arrowBtnStyles('left')}
        >
          {'<'}
        </Button>

        <Button
          onClick={next}
          sx={arrowBtnStyles('right')}
        >
          {'>'}
        </Button>
      </Paper>

      {/* Вертикальный скролл */}
      <Box 
        position="relative" 
        width={264} 
        height={448} 
        overflow="hidden"
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Box ref={emblaRef} className="embla" height="100%">
          <Box className="embla__container" display="flex" flexDirection="column" height="100%">
            {images.map((image, index) => (
              <Box
                key={index}
                sx={{ flexShrink: 0, px: 0.5, cursor: 'pointer', height: 114 }}
                onClick={() => scrollTo(index)}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    overflow: 'hidden',
                    border:
                      index === selectedIndex
                        ? '2px solid #BF9460'
                        : '2px solid transparent',
                    borderRadius: 1,
                    height: 104,
                    position: 'relative',
                  }}
                >
                  <PrismicNextImage
                    field={image}
                    fill
                    style={{ objectFit: 'cover' }}
                    alt=""
                  />
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const arrowBtnStyles = (side: 'left' | 'right') => ({
  position: 'absolute',
  [side]: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: '#BF9460',
  color: '#fff',
  minWidth: 40,
  height: 40,
  borderRadius: '50%',
  fontWeight: 'bold',
  fontSize: 20,
  lineHeight: 1,
  '&:hover': {
    backgroundColor: '#a97e50',
  },
})
