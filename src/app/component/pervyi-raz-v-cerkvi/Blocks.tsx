'use client'

import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FAQItem } from './types'

type Props = {
  faqs: FAQItem[]
}

export default function FAQBlock({ faqs }: Props) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {faqs.map((item, index) => (
          <AnimatedFAQItem
            key={index}
            item={item}
            align={index % 2 === 0 ? 'left' : 'right'}
            delay={index * 0.15}
          />
        ))}
      </Box>
    </Container>
  )
}

function AnimatedFAQItem({
  item,
  align,
  delay,
}: {
  item: FAQItem
  align: 'left' | 'right'
  delay: number
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: align === 'left' ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
        style={{ width: '60%', minWidth: '300px' }}
      >
        <Paper elevation={3} sx={{ p: 3, backgroundColor:'#F8F1E9' }}>
          <Box mb={1}>
            <Typography variant="h6" sx={{color:'#BF9460'}}>
              {item.question}
            </Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body1">{item.answer}</Typography>
        </Paper>
      </motion.div>
    </Box>
  )
}
