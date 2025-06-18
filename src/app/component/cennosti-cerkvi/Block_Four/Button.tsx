import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { Box, BoxProps } from '@mui/material';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type DotButtonProps = BoxProps<'button'> & {
  index: number;
  selectedIndex: number;
  onDotButtonClick: (index: number) => void;
};

export const DotButton: React.FC<DotButtonProps> = ({
  index,
  selectedIndex,
  onDotButtonClick,
  ...rest
}) => {
  const isActive = index === selectedIndex;

  return (
    <Box
      component="button"
      type="button"
      onClick={() => onDotButtonClick(index)}
      sx={{
        width: '0.8rem',
        height: '0.8rem',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 0.15rem',
        cursor: 'pointer',
        border: 'none',
        padding: 0,
        '&:focus': {
          outline: 'none',
        },
      }}
      {...rest}
    >
      <Box
        sx={{
          width: '0.8rem',
          height: '0.8rem',
          borderRadius: '50%',
          border: '1px solid #BF9460',
          backgroundColor: isActive ? '#BF9460' : '#F8F1E9',
          transition: 'all 0.3s ease',
        }}
      />
    </Box>
  );
};
