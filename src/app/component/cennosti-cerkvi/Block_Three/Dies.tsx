'use client'

import { useRef } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import { KeyTextField } from '@prismicio/client'
import { motion, useInView } from 'framer-motion'

type BeliefItem = {
  text: KeyTextField
}

type BeliefsClientProps = {
  items: BeliefItem[]
}

export default function BeliefsClient({ items }: BeliefsClientProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        padding: 2,
        justifyContent: 'center',
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          whileHover={{
            scale: 1.05,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
          style={{ borderRadius: '12px' }}
        >
          <Card
            sx={{
              width: 200,
              height: 300,
              backgroundColor: '#F8F1E9',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
            }}
            elevation={4}
          >
            <CardContent>
              <Typography color='#BF9460' fontSize='16px' fontWeight="bold" mb={1}>
                {index + 1}
              </Typography>
              <Typography fontSize='16px'>
                {item.text}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Box>
  )
}
