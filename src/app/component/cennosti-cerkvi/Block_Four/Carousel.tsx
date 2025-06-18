'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { createClient } from '@/prismicio'
import { ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { DotButton, useDotButton } from './Button'
import { NextButton, PrevButton, usePrevNextButtons } from './Buttons'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'

const TWEEN_FACTOR_BASE = 0.2

export default function EmblaCarouselFromPrismic() {
  const [images, setImages] = useState<ImageField[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    const fetchImages = async () => {
      const client = createClient()
      const home = await client.getSingle('home_page')
      const gallery = (home.data.image_galery || []) as { image: ImageField }[]
      const validImages = gallery
        .map((item) => item.image)
        .filter((image): image is ImageField => Boolean(image?.url))

      setImages(validImages)
    }

    fetchImages()
  }, [])

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map((node) => {
      return node.querySelector('.embla__parallax__layer') as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback((api: EmblaCarouselType) => {
    const engine = api.internalEngine()
    const scrollProgress = api.scrollProgress()
    const slidesInView = api.slidesInView()

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (!slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              diffToTarget = scrollSnap - (sign === -1 ? 1 : -1) * (1 - scrollProgress)
            }
          })
        }

        const translate = diffToTarget * -tweenFactor.current * 100
        const tweenNode = tweenNodes.current[slideIndex]
        if (tweenNode) tweenNode.style.transform = `translateX(${translate}%)`
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax)
  }, [emblaApi, tweenParallax, setTweenNodes, setTweenFactor])

  return (
    <Box sx={{ maxWidth: '48rem', margin: 'auto', mt:'80px' }}>
      <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
        <Box sx={{
          display: 'flex',
          touchAction: 'pan-y pinch-zoom',
          marginLeft: '-1rem'
        }}>
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                transform: 'translate3d(0, 0, 0)',
                flex: '0 0 80%',
                minWidth: 0,
                paddingLeft: '1rem',
              }}
            >
              <Box sx={{ borderRadius: '1.8rem', overflow: 'hidden', height: '19rem' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <PrismicNextImage
                    field={image}
                    className="embla__parallax__layer"
                    alt=""
                    style={{
                      borderRadius: '1.8rem',
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      flex: '0 0 calc(115% + 2rem)',
                      maxWidth: 'none'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Стрелки с точками между ними */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
          gap: '0rem',
        }}
      >
        {/* Левая стрелка */}
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />

        {/* Точки внутри стрелок */}
        <Box sx={{ display: 'flex', gap: '0.4rem' }}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              index={index}
              selectedIndex={selectedIndex}
              onDotButtonClick={onDotButtonClick}
            />
          ))}
        </Box>

        {/* Правая стрелка */}
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </Box>
    </Box>
  )
}
