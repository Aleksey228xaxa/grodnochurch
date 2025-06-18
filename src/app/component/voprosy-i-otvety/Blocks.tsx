'use client'
import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, Button, Modal, Backdrop } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import { ImageField } from '@prismicio/client'

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
          sx={{
            position: 'relative',
            width: 280,
            height: 470,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 10px 30px rgba(219, 160, 75, 0.3)',
             borderBottomRightRadius: '16px',
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
                  style={{ borderRadius: 4, objectFit: 'cover', margin: 0, minHeight: '190px',maxHeight: '190px' }}
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
  onClick={handleOpen}
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
    zIndex: 1,
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
            boxShadow: 24,
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
                style={{ borderRadius: 6, width: '100%', maxHeight: '270px'}}
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
                  boxShadow:'none'    
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
