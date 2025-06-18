'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { createClient } from '@/prismicio'
import {
  Box,
  IconButton,
  Typography,
  Paper,
} from '@mui/material'
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import { ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

interface GalleryItem {
  image: ImageField
}

export function CustomGallery() {
  const [images, setImages] = useState<ImageField[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y' })

  useEffect(() => {
    const fetchImages = async () => {
      const client = createClient()
      const home = await client.getSingle('home_page')
      const gallery = (home.data.image_galery || []) as GalleryItem[]
      const validImages = gallery
        .map((item) => item.image)
        .filter((image): image is ImageField => Boolean(image?.url))

      setImages(validImages)
    }

    fetchImages()
  }, [])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index)
        setSelectedIndex(index)
      }
    },
    [emblaApi]
  )

  return (
    <Box display="flex" gap={2}>
      <Box position="relative" width={264} height={458} overflow="hidden">
        <Box position="absolute" top={-32} left="50%" sx={{ transform: 'translateX(-50%)' }} zIndex={10}>
          <IconButton
            onClick={() => scrollTo(Math.max(selectedIndex - 1, 0))}
            sx={{
              backgroundColor: '#e5e7eb',
              boxShadow: 2,
              '&:hover': { backgroundColor: '#d1d5db' },
            }}
          >
            <ArrowDropUp fontSize="large" />
          </IconButton>
        </Box>

        <Box ref={emblaRef} height="100%" className="embla">
          <Box display="flex" flexDirection="column" height="100%" className="embla__container">
            {images.map((image, index) => (
              <Box
                key={index}
                flexShrink={0}
                width="100%"
                onClick={() => scrollTo(index)}
                sx={{ cursor: 'pointer', paddingX: '4px', boxSizing: 'border-box' }}
                className="embla__slide"
              >
                <Paper
                  elevation={index === selectedIndex ? 3 : 1}
                  sx={{
                    border: '2px solid',
                    borderColor: index === selectedIndex ? 'primary.main' : 'transparent',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <PrismicNextImage
                    field={image}
                    alt=""
                    style={{ width: '100%', height: 104, objectFit: 'cover' }}
                  />
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>

        <Box position="absolute" bottom={-32} left="50%" sx={{ transform: 'translateX(-50%)' }} zIndex={10}>
          <IconButton
            onClick={() => scrollTo(Math.min(selectedIndex + 1, images.length - 1))}
            sx={{
              backgroundColor: '#e5e7eb',
              boxShadow: 2,
              '&:hover': { backgroundColor: '#d1d5db' },
            }}
          >
            <ArrowDropDown fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          width: 628,
          height: 448,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        {images[selectedIndex] ? (
          <PrismicNextImage
            field={images[selectedIndex]}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Нет изображения
          </Typography>
        )}
      </Paper>
    </Box>
  )
}
