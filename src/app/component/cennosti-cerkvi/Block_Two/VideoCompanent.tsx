'use client'

import { motion } from 'framer-motion'
import { Box } from '@mui/material'

type Props = {
  videoUrl: string
}

export default function VideoPlayer({ videoUrl }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={6}
      px={2}
    >
      <motion.video
        controls
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.03 }}
        style={{
          width: '100%',
          maxWidth: 550,
          maxHeight: 450,
          borderRadius: 12,
          backgroundColor: '#000',
          cursor: 'pointer',
          objectFit: 'cover',
        }}
        key={videoUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        Твой браузер не поддерживает видео.
      </motion.video>
    </Box>
  )
}
