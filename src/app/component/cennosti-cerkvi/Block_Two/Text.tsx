'use client'

import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FAQItem } from './types'

type Props = {
  faqs: FAQItem[]
}

export default function FAQBlock({ faqs }: Props) {
  return (
    <Container sx={{ py: 4, maxWidth: '1000px !important' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          gridAutoFlow: 'row dense',
          justifyContent: 'center',
          minWidth: { xs: '100%', md: 620 },
        }}
      >
        {faqs.map((item, index) => {
          const isLastOdd =
            faqs.length % 2 === 1 && index === faqs.length - 1

          return (
            <AnimatedFAQItem
              key={index}
              item={item}
              sx={{
                gridColumn: isLastOdd ? '2 / 3' : undefined,
                justifySelf: isLastOdd ? 'end' : index % 2 === 0 ? 'start' : 'end',
                width: { xs: '100%', md: 500 },
                height: { xs: 'auto', md: 250 },
                display: 'flex',
              }}
              delay={index * 0.15}
            />
          )
        })}
      </Box>
    </Container>
  )
}

function AnimatedFAQItem({
  item,
  sx,
  delay,
}: {
  item: FAQItem
  sx?: object
  delay: number
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Box ref={ref} sx={{ ...sx }}>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
        whileHover={{ scale: 1.03 }}
        style={{
          width: '100%',
          height: '100%',
          transition: 'transform 0.1s ease-in-out',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: '#F8F1E9',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1">{item.text}</Typography>
        </Paper>
      </motion.div>
    </Box>
  )
}
