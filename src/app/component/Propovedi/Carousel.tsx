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
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : null
}

function extractYoutubeId(embedUrl: string): string | null {
  const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export function CustomVideoGallery() {
  const [videos, setVideos] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: true })

  useEffect(() => {
    const fetchVideos = async () => {
      const client = createClient()
      const Sermons = await client.getSingle<Content.SermonsDocument>('sermons')
      const gallery = Sermons.data.video_galery || []

      const urls = gallery
        .map((item: Content.HomePageDocumentDataVideoGaleryItem) =>
          getYoutubeEmbedUrl((item.video_url as FilledLinkToWebField)?.url)
        )
        .filter((url: string | null): url is string => !!url)

      setVideos(urls)
    }

    fetchVideos()
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const nextIndex = () => {
    if (videos.length === 0) return
    scrollTo((selectedIndex + 1) % videos.length)
  }

  const prevIndex = () => {
    if (videos.length === 0) return
    scrollTo((selectedIndex - 1 + videos.length) % videos.length)
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column"
      px="40px"
      sx={{
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box 
        display="flex" 
        gap={2} 
        alignItems="center"
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          justifyContent: 'center',
        }}
      >
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

          <Button
            onClick={prevIndex}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: '#BF9460',
              color: 'white',
              minWidth: 40,
              height: 40,
              borderRadius: '50%',
              '&:hover': { backgroundColor: '#a97e50' },
            }}
          >
            {'<'}
          </Button>

          <Button
            onClick={nextIndex}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: '#BF9460',
              color: 'white',
              minWidth: 40,
              height: 40,
              borderRadius: '50%',
              '&:hover': { backgroundColor: '#a97e50' },
            }}
          >
            {'>'}
          </Button>
        </Paper>

        <Box 
          position="relative" 
          width={{ xs: 0, md: 264 }} 
          height={{ xs: 0, md: 448 }} 
          overflow="hidden"
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Box ref={emblaRef} className="embla" height="100%">
            <Box className="embla__container" display="flex" flexDirection="column" height="100%">
              {videos.map((embedUrl, index) => {
                const videoId = extractYoutubeId(embedUrl)
                return (
                  <Box
                    key={index}
                    className="embla__slide"
                    sx={{ flexShrink: 0, px: 0.5, cursor: 'pointer', height: 114 }}
                    onClick={() => scrollTo(index)}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        overflow: 'hidden',
                        border: index === selectedIndex ? '3px solid #BF9460' : '2px solid transparent',
                        borderRadius: 1,
                        height: 104,
                        position: 'relative',
                      }}
                    >
                      {videoId ? (
                        <Image
                          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                          alt="video thumbnail"
                          width={264}
                          height={104}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <Box height="100%" display="flex" alignItems="center" justifyContent="center">
                          <Typography color="text.secondary" variant="caption">
                            Нет превью
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display="flex" gap={2} mt="40px" justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }}>
        <Button
          variant="contained"
          sx={{
            color: '#FFF',
            backgroundColor: '#BF9460',
            border: '2px solid #BF9460',
            fontFamily: 'Inter, sans-serif',
            boxShadow: 'none',
          }}
          onClick={() => {
            const currentVideoUrl = videos[selectedIndex]?.replace('embed/', 'watch?v=')
            if (currentVideoUrl) {
              window.open(currentVideoUrl, '_blank', 'noopener,noreferrer')
            }
          }}
        >
          Смотреть YouTube
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: '#BF9460',
            backgroundColor: 'rgba(219, 160, 75, 0)',
            border: '3px solid #BF9460',
            fontFamily: 'Inter, sans-serif',
            ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          }}
          onClick={() =>
            window.open('https://www.youtube.com/@grodnochurch', '_blank', 'noopener,noreferrer')
          }
        >
          Подписаться
        </Button>
      </Box>
    </Box>
  )
}