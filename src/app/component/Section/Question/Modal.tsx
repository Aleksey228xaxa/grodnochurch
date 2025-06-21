'use client'

import React, { useEffect } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { ImageField } from '@prismicio/client'
import QuestionBlock from './Blocks'
import dynamic from 'next/dynamic'

// Динамический импорт Swiper компонентов
const Swiper = dynamic(() => import('swiper/react').then(mod => ({ default: mod.Swiper })), { ssr: false })
const SwiperSlide = dynamic(() => import('swiper/react').then(mod => ({ default: mod.SwiperSlide })), { ssr: false })

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

  useEffect(() => {
    // Инициализация Swiper модулей только на клиенте
    if (typeof window !== 'undefined') {
      import('swiper').then((SwiperCore) => {
        import('swiper/modules').then(({ Autoplay, EffectFade, Pagination }) => {
          SwiperCore.default.use([Autoplay, EffectFade, Pagination])
        })
      })
    }
  }, [])

  if (isMobile) {
    return (
      <Box mt={4}>
        <style>{`
          .swiper-pagination {
            position: static !important;
            margin-top: 20px !important;
            text-align: center !important;
          }
          .swiper-pagination-bullet {
            background: #BF9460 !important;
            opacity: 0.5 !important;
          }
          .swiper-pagination-bullet-active {
            opacity: 1 !important;
          }
        `}</style>
        <Swiper
          effect="fade"
          centeredSlides={true}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          speed={700}
          pagination={{ clickable: true }}
          style={{ width: '100%', maxWidth: 430 }}
        >
          {blocks.map((block, idx) => (
            <SwiperSlide key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                  transform: 'translateZ(0)',
                  boxShadow: 'none',
                  background: 'none',
                }}
              >
                <QuestionBlock {...block} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
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
