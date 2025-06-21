'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { PrismicNextImage } from '@prismicio/next';
import { Content } from '@prismicio/client';

interface Props {
  timeline: Content.HistoryDocumentDataBlockItem[];
}

export default function VerticalTimelineProgress({ timeline }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const stepHeight = 550;
  const totalHeight = timeline.length * stepHeight + 160;

  const firstDot = stepHeight / 2 - 170;
  const lastDot = (timeline.length - 1) * stepHeight + stepHeight / 2;

  const clampedProgress = Math.min(lastDot, Math.max(firstDot, progress));
  const clampedHeight = clampedProgress - firstDot;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || typeof window === 'undefined') return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(1, Math.max(0, (windowHeight - top) / (windowHeight + height)));
      setProgress(scrollProgress * totalHeight);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [totalHeight]);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: `${totalHeight}px`,
        position: 'relative',
        px: 4,
      }}
    >
      {/* Левая колонка с линией */}
      <Box
        sx={{
          position: 'relative',
          width: '40px',
          height: '82%',
          top: 80,
        }}
      >
        {/* Светлая линия (бывшая серая) */}
        <Box
          sx={{
            position: 'absolute',
            top: 120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 5,
            height: '85%',
            bgcolor: '#F8F1E9',
            borderRadius: 2,
          }}
        />

        {/* Линия прогресса */}
        <Box
          sx={{
            position: 'absolute',
            top: `${firstDot}px`,
            left: '50%',
            transform: 'translateX(-40%)',
            width: 5,
            height: `${clampedHeight}px`,
            bgcolor: '#BF9460',
            borderRadius: 2,
            transition: 'height 0.2s ease-out',
            zIndex: 1,
            maxHeight: '86%',
          }}
        />

        {/* Точки */}
        {timeline.map((_, index) => {
          const top = index * stepHeight + stepHeight / 2 - 160;
          const isActive = progress >= top;
          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: `${top}px`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 22,
                height: 22,
                borderRadius: '50%',
                bgcolor: isActive ? '#BF9460' : '#F8F1E9',
                border: '2px solid white',
                zIndex: 2,
              }}
            />
          );
        })}
      </Box>

      {/* Контент */}
      <Box sx={{ flex: 1, pl: 4, mt: 22 }}>
        {timeline.map((item, index) => {
          const top = index * stepHeight + stepHeight / 2 - 160;
          const isActive = progress >= top;
          return (
            <Box key={index} maxWidth="500px" height="555px" mt="0px">
              <Typography
                variant="h6"
                color={isActive ? '#BF9460' : '#F8F1E9'}
                gutterBottom
              >
                {item.data}
              </Typography>

              {item.image && (
                <Box my={2}>
                  <PrismicNextImage field={item.image} alt="" width={500} height={300} />
                </Box>
              )}

              <Typography variant="body1" color={isActive ? 'black' : '#F8F1E9'}>
                {item.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
