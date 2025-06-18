'use client'

import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Box, Avatar, IconButton, Typography } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { PrismicImage } from '@prismicio/react'
import { ImageFieldImage } from '@prismicio/types'

interface AvatarData {
  id: string
  imageUrl: string
  name: string
  email: string
  phone: string
  emailLink?: string
  telegramLink?: string
  instagramLink?: string
  facebookLink?: string
}

interface AvatarCarouselProps {
  avatars: AvatarData[]
  icons: IconSet
}
interface IconSet {
  phone: ImageFieldImage
  email: ImageFieldImage
  facebook: ImageFieldImage
  telegram: ImageFieldImage
  instagram: ImageFieldImage
}

const styles = {
  container: {
    maxWidth: { xs: '100%', sm: '90%', md: '800px' },
    mx: 'auto',
    px: { xs: 2, sm: 3, md: 4 },
    height: { xs: 'auto', md: '400px' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Inter', sans-serif",
    color: '#000',
    position: 'relative',
  },
  carouselWrapper: {
    position: 'relative',
    width: '100%',
    mb: { xs: 2, md: 3 },
    px: { xs: '40px', sm: '40px', md: '40px' },
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    zIndex: 2,
    transform: 'translateY(-50%)',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(191, 148, 96, 0.2)',
    width: { xs: 36, md: 48 },
    height: { xs: 36, md: 48 },
    transition: 'background-color 0.3s, color 0.3s',
    color: '#bf9460',
    '&:hover': {
      backgroundColor: '#bf9460',
      color: 'white',
      boxShadow: '0 6px 16px rgba(191, 148, 96, 0.5)',
    },
  },
  arrowLeft: {
    left: { xs: 0, sm: 0, md: 0 },
  },
  arrowRight: {
    right: { xs: 0, sm: 0, md: 0 },
  },
  emblaViewport: {
    overflow: 'hidden',
  },
  emblaContainer: {
    display: 'flex',
  },
  avatarBox: {
    flex: { xs: '0 0 100%', sm: '0 0 33.333%', md: '0 0 25%' },
    scrollSnapAlign: 'start',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: { xs: 1, md: 1.5 },
    cursor: 'pointer',
  },
  avatar: (selected: boolean) => ({
    width: { 
      xs: selected ? 140 : 120,
      sm: selected ? 150 : 130,
      md: selected ? 160 : 130 
    },
    height: { 
      xs: selected ? 140 : 120,
      sm: selected ? 150 : 130,
      md: selected ? 160 : 130 
    },
    transition: 'width 0.6s ease, height 0.6s ease, box-shadow 0.6s ease, border 0.6s ease',
    boxShadow: selected
      ? '0 8px 20px rgba(191, 148, 96, 0.6)'
      : '0 2px 6px rgba(0,0,0,0.15)',
    border: selected ? '3px solid #bf9460' : 'none',
    borderRadius: '50%',
  }),
  currentAvatarBox: {
    mt: { xs: 2, md: 4 },
    textAlign: 'center',
    maxWidth: { xs: '100%', sm: '500px', md: '600px' },
    px: { xs: 2, md: 0 },
  },
  contactRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    mt: 1,
    fontSize: { xs: '0.875rem', md: '1rem' },
  },
  contactLink: {
    cursor: 'pointer',
    transition: 'opacity 0.3s',
    '&:hover': {
      opacity: 0.7,
    },
  },
  socialIconsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: { xs: 2, md: 3 },
    mt: { xs: 1.5, md: 2 },
  },
}

export default function AvatarCarousel({ avatars, icons }: AvatarCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  const onAvatarClick = useCallback((index: number) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }, [emblaApi])

  const currentAvatar = avatars[selectedIndex]

  return (
    <Box sx={styles.container}>
      <Box sx={styles.carouselWrapper}>
        <IconButton onClick={scrollPrev} sx={{ ...styles.arrowButton, ...styles.arrowLeft }}>
          <ArrowBackIos />
        </IconButton>

        <Box ref={emblaRef} sx={styles.emblaViewport}>
          <Box sx={styles.emblaContainer}>
            {avatars.map((avatar, index) => (
              <Box
                key={avatar.id}
                sx={styles.avatarBox}
                onClick={() => onAvatarClick(index)}
              >
                <Avatar
                  src={avatar.imageUrl}
                  alt={`Avatar ${index + 1}`}
                  sx={styles.avatar(index === selectedIndex)}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <IconButton onClick={scrollNext} sx={{ ...styles.arrowButton, ...styles.arrowRight }}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {currentAvatar && (
        <Box sx={styles.currentAvatarBox}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>{currentAvatar.name}</Typography>

          <Box sx={styles.contactRow}>
            <Box sx={{ width: 20, height: 20 }}>
              <PrismicImage
                field={icons.phone}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Typography>{currentAvatar.phone}</Typography>
          </Box>

          <Box
            sx={styles.contactRow}
            component="a"
            href={currentAvatar.emailLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentAvatar.emailLink && (
              <Box sx={{ width: 24, height: 24 }}>
                <PrismicImage
                  field={icons.email}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
            )}
            <Typography>{currentAvatar.email}</Typography>
          </Box>

          <Box sx={styles.socialIconsRow}>
            {currentAvatar.facebookLink && (
              <Box
                component="a"
                href={currentAvatar.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ...styles.contactLink, width: 24, height: 24 }}
              >
                <PrismicImage
                  field={icons.facebook}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
            )}
            {currentAvatar.telegramLink && (
              <Box
                component="a"
                href={currentAvatar.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ...styles.contactLink, width: 24, height: 24 }}
              >
                <PrismicImage
                  field={icons.telegram}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
            )}
            {currentAvatar.instagramLink && (
              <Box
                component="a"
                href={currentAvatar.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ...styles.contactLink, width: 24, height: 24 }}
              >
                <PrismicImage
                  field={icons.instagram}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
