'use client'

import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Box,
  IconButton,
  ButtonBase,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { createClient } from '@/prismicio'
import { Content } from '@prismicio/client'
import { FilledLinkToWebField } from '@prismicio/types'

type VideoItem = {
  id: string
  videoUrl: string
}

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const getYoutubeEmbedUrl = (url: string | undefined): string | null => {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export default function VideoCarousel() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // <600px
  const isTablet = useMediaQuery(theme.breakpoints.down('md')) // <900px
  const isVerySmallScreen = useMediaQuery('(max-width:459px)')

  const itemsPerSlide = isMobile ? 1 : isTablet ? 4 : 6

  const slides = chunkArray(videos, itemsPerSlide)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    const fetchVideos = async () => {
      const client = createClient()
      const home = await client.getSingle<Content.HomePageDocument>('home_page')
      const gallery = home.data.video_galery || []

      const videoUrls = gallery
        .map((item: Content.HomePageDocumentDataVideoGaleryItem, index: number) => {
          const embedUrl = getYoutubeEmbedUrl((item.video_url as FilledLinkToWebField)?.url)
          return embedUrl ? { id: `video-${index}`, videoUrl: embedUrl } : null
        })
        .filter((v): v is VideoItem => !!v)

      setVideos(videoUrls)
    }

    fetchVideos()
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect, itemsPerSlide])

  const handleOpenModal = (url: string) => {
    setSelectedVideoUrl(url)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedVideoUrl(null)
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {/* Стрелки управления */}
        {!isVerySmallScreen && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1,
              pointerEvents: 'none',
            }}
          >
            <IconButton
              onClick={scrollPrev}
              sx={{ bgcolor: '#BF9460', color: '#fff', pointerEvents: 'auto' }}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton
              onClick={scrollNext}
              sx={{ bgcolor: '#BF9460', color: '#fff', pointerEvents: 'auto' }}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Box>
        )}

        <Box ref={emblaRef}>
          <Box sx={{ display: 'flex' }}>
            {slides.map((slide, index) => (
              <Box
                key={index}
                sx={{
                  flex: '0 0 100%',
                  display: 'grid',
                  gridTemplateColumns: isMobile
                    ? '1fr'
                    : isTablet
                    ? '1fr 1fr'
                    : '1fr 1fr 1fr',
                  gridTemplateRows: isMobile ? 'auto' : '1fr 1fr',
                  gap: 2,
                  p: { xs: 2, sm: 3, md: 4 },
                }}
              >
                {slide.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      width: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      bgcolor: 'black',
                    }}
                    onClick={() => handleOpenModal(item.videoUrl)}
                  >
                    <iframe
                      src={item.videoUrl}
                      title={item.id}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                    />
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Навигационные точки */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          {slides.map((_, i) => (
            <ButtonBase
              key={i}
              onClick={() => scrollTo(i)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: i === selectedIndex ? '#BF9460' : '#D9C3B0',
                mx: 0.5,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Модальное окно с видео */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          {selectedVideoUrl && (
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
              <iframe
                src={selectedVideoUrl}
                title="Modal Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
