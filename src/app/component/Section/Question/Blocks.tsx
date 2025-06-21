'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Card, CardContent, Button, Modal, Backdrop, useMediaQuery } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import { ImageField } from '@prismicio/client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

type Props = {
  date: string
  image: ImageField
  title: string
  text: string
  tag: string
}

function formatDate(dateStr: string) {
  const dateObj = new Date(dateStr)
  return dateObj.toLocaleDateString('ru-RU') // 21.05.2025
}

function formatTime(dateStr: string) {
  const dateObj = new Date(dateStr)
  return dateObj.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) // 18:00
}

export default function NewsBlock({ date, image, title, text, tag }: Props) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box display="flex">
        <Card
          onClick={handleOpen}
          sx={{
            position: 'relative',
            width: 280,
            height: 470,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'none',
            borderBottomRightRadius: '16px',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              padding: 0,
            }}
          >
            {/* Верхняя панель */}
            <Box display="flex" justifyContent="space-between" alignItems="center" m="5px 10px 0px 10px">
              <Typography variant="overline" color="text.secondary">
                {formatDate(date)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(date)}
              </Typography>
            </Box>

            {/* Картинка */}
            {image && (
              <Box sx={{ my: 1 }}>
                <PrismicNextImage
                  field={image}
                  alt=''
                  width={280}
                  height={190}
                  style={{ borderRadius: 4, objectFit: 'cover', margin: 0, minHeight: '190px' }}
                />
              </Box>
            )}

            <Box height='200px'>
              {/* Заголовок */}
              <Typography variant="h6" noWrap p={2}>
                {title}
              </Typography>

              {/* Текст */}
              <Typography
                variant="body2"
                sx={{
                  px: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: 'vertical',
                  mb: 2, // <-- отступ снизу перед кнопкой
                }}
              >
                {text}
              </Typography>
            </Box>

            {/* Нижняя панель */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={1}
              mt="auto"
            >
              <Typography color="primary" variant="caption">
                {tag}
              </Typography>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpen()
                }}
                sx={{
                  backgroundColor: '#BF9460',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: '16px',
                  minWidth: 'unset',
                  boxShadow: 'none',
                  textTransform: 'none',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  zIndex: 100,
                  pointerEvents: 'auto',
                  '&:hover': {
                    backgroundColor: '#BF9460',
                  },
                }}
              >
                Читать
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Модалка */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 500 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 'none',
            p: 4,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h5" mb={2}>
            {title}
          </Typography>

          {image && (
            <Box mb={2}>
              <PrismicNextImage
                field={image}
                alt=''
                width={480}
                height={270}
                style={{ borderRadius: 6, width: '100%', height: 'auto' }}
              />
            </Box>
          )}

          <Typography variant="body1" mb={2} sx={{ whiteSpace: 'pre-line' }}>
            {text}
          </Typography>

          <Box display='flex' justifyContent='space-between'>
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              Дата: {formatDate(date)}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              Время: {formatTime(date)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              color: "#FFF",
              backgroundColor: "#BF9460",
              border: "2px solid #BF9460",
              fontFamily: "Inter, sans-serif",
              boxShadow: 'none'
            }}
            onClick={handleClose}
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export function QuestionBlocksSwiper({ blocks }: { blocks: Props[] }) {
  const isMobile = useMediaQuery('(max-width:630px)')
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              backfaceVisibility: 'hidden',
              touchAction: 'pan-y',
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
                }}
              >
                <NewsBlock {...block} />
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

  // Десктоп: сетка
  return (
    <Box display="flex" flexWrap="wrap" gap="30px" justifyContent="center" mt="40px" maxWidth="1520px" mx="auto">
      {blocks.map((block, idx) => (
        <Box key={idx}>
          <NewsBlock {...block} />
        </Box>
      ))}
    </Box>
  )
}
