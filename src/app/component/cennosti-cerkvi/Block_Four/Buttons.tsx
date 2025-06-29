import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { Button, ButtonProps } from '@mui/material'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

const commonButtonSx = {
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  touchAction: 'manipulation',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  padding: 0,
  margin: 0,
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  cursor: 'pointer',
  minWidth: 'unset',
  zIndex: 1,
  color: '#BF9460',

  '&:disabled': {
    color: 'var(--detail-high-contrast)',
    cursor: 'default',
    opacity: 0.3,
  },

  '& svg': {
    width: '28px',
    height: '28px',
    transition: 'background-color 0.3s ease',
    borderRadius: '50%',
    padding: '4px',
  },

  '&:hover:not(:disabled) svg': {
    backgroundColor: 'rgba(var(--text-high-contrast-rgb-value), 0.12)',
  },
}

export const PrevButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <Button type="button" {...restProps} sx={commonButtonSx}>
      <svg viewBox="0 0 532 532" fill="currentColor">
        <path d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z" />
      </svg>
      {children}
    </Button>
  )
}

export const NextButton: React.FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props

  return (
    <Button type="button" {...restProps} sx={commonButtonSx}>
      <svg viewBox="0 0 532 532" fill="currentColor">
        <path d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z" />
      </svg>
      {children}
    </Button>
  )
}
