'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Box } from '@mui/material';
import { createClient } from '@/prismicio';
import type { ImageField } from '@prismicio/client';

type GalleryItem = {
  image: ImageField;
};

export default function EmblaCarousel() {
  const [images, setImages] = useState<ImageField[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplay = useRef(
    Autoplay(
      {
        delay: 4000,
        stopOnInteraction: false,
        rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement!,
      }
    )
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false }, [autoplay.current]);

  // Fetch images from Prismic
  useEffect(() => {
    const fetchImages = async () => {
      const client = createClient();
      const home = await client.getSingle('home_page');
      const gallery = (home.data.image_galery || []) as GalleryItem[];
      const validImages = gallery
        .map((item) => item.image)
        .filter((image): image is ImageField => Boolean(image?.url));
      setImages(validImages);
    };

    fetchImages();
  }, []);


  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', position: 'relative' }}>
      <Box
        ref={emblaRef}
        onMouseEnter={() => autoplay.current?.stop()}
        onMouseLeave={() => autoplay.current?.play()}
        sx={{ overflow: 'hidden', borderRadius: 2 }}
      >
        <Box sx={{ display: 'flex' }}>
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 100%',
                minWidth: 90,
                height: 400,
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Добавляем точки навигации */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: index === selectedIndex ? '#BF9460' : '#D9C3B0',
              cursor: 'pointer',
            }}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </Box>
    </Box>
  );
}
