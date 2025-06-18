'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { createClient } from '@/prismicio'
import { Box, Button, Paper, Typography } from '@mui/material'
import { FilledLinkToWebField } from '@prismicio/types'
import { Content } from '@prismicio/client'
import Image from 'next/image'

function getYoutubeEmbedUrl(url: string | undefined): string | null {
  if (!url) return null
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (!match || !match[1]) return null
  return `https://www.youtube.com/embed/${match[1]}`
}

function getYoutubeId(embedUrl: string): string | null {
  const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export function CustomVideoGallery() {
  const [videos, setVideos] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y' })

  useEffect(() => {
    const fetchVideos = async () => {
      const client = createClient()
      const home = await client.getSingle<Content.HomePageDocument>('home_page')
      const gallery = home.data.video_galery || []

      const urls = gallery
        .map((item: Content.HomePageDocumentDataVideoGaleryItem) =>
          getYoutubeEmbedUrl((item.video_url as FilledLinkToWebField)?.url)
        )
        .filter((url: string | null): url is string => !!url)

      setVideos(urls)
    }

    fetchVideos()
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
      {/* Большое видео */}
      <Paper
        elevation={3}
        sx={{
          width: 628,
          height: 448,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {videos[selectedIndex] ? (
          <iframe
            width="100%"
            height="100%"
            src={videos[selectedIndex]}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          />
        ) : (
          <Typography color="text.secondary" variant="body2">
            Нет видео
          </Typography>
        )}
      </Paper>

      {/* Миниатюры */}
      <Box position="relative" width={264} height={458} overflow="hidden">
        <Box position="absolute" top={-32} left="50%" sx={{ transform: 'translateX(-50%)' }} zIndex={10}>
          <Button
            variant="contained"
            onClick={() => scrollTo(Math.max(selectedIndex - 1, 0))}
          >
            ↑
          </Button>
        </Box>

        <Box ref={emblaRef} className="embla" height="100%">
          <Box className="embla__container" display="flex" flexDirection="column" height="100%">
            {videos.map((embedUrl, index) => {
              const videoId = getYoutubeId(embedUrl)
              return (
                <Box
                  key={index}
                  className="embla__slide"
                  sx={{
                    flexShrink: 0,
                    px: 0.5,
                    cursor: 'pointer',
                    height: 114,
                  }}
                  onClick={() => scrollTo(index)}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      overflow: 'hidden',
                      border: index === selectedIndex ? '2px solid #1976d2' : '2px solid transparent',
                      borderRadius: 1,
                      height: 104,
                      position: 'relative',
                    }}
                  >
                    {videoId ? (
                      <Image
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={`Видео ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 264px"
                        style={{ objectFit: 'cover', pointerEvents: 'none' }}
                      />
                    ) : (
                      <Typography variant="body2" align="center" mt={4}>
                        Нет превью
                      </Typography>
                    )}
                  </Paper>
                </Box>
              )
            })}
          </Box>
        </Box>

        <Box position="absolute" bottom={-32} left="50%" sx={{ transform: 'translateX(-50%)' }} zIndex={10}>
          <Button
            variant="contained"
            onClick={() => scrollTo(Math.min(selectedIndex + 1, videos.length - 1))}
          >
            ↓
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
