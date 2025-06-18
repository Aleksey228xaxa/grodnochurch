'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { createClient } from '@/prismicio'
import { Box, Button, Modal, Paper, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { PrismicNextImage } from '@prismicio/next'
import { Content, ImageField } from '@prismicio/client'

export function CustomImageGallery() {
  const [images, setImages] = useState<ImageField[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: true })

  useEffect(() => {
    const fetchImages = async () => {
      const client = createClient()
      const forChildrenDoc = await client.getSingle<Content.ForChildrenDocument>('for_children')
      const gallery = forChildrenDoc.data.images || []

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
    <>
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
            cursor: 'pointer',
          }}
          onClick={() => setModalOpen(true)}
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
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            sx={arrowBtnStyles('left')}
          >
            {'<'}
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
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

      {/* Модалка */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} closeAfterTransition>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 1,
            outline: 'none',
          }}
        >
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.600',
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>

          {images[selectedIndex] && (
            <Box
              sx={{
                width: { xs: '80vw', sm: '70vw', md: '60vw' },
                height: { xs: '60vh', sm: '65vh', md: '70vh' },
                position: 'relative',
              }}
            >
              <PrismicNextImage
                field={images[selectedIndex]}
                fill
                style={{ objectFit: 'contain', borderRadius: 8 }}
                alt=""
              />
            </Box>
          )}
        </Box>
      </Modal>
    </>
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
