'use client'

import { useState } from 'react'
import { Box, Button, ButtonGroup } from '@mui/material'
import NewsBlock from './Blocks'
import { ImageField } from '@prismicio/client'

type Block = {
  date: string
  image: ImageField
  title: string
  text: string
  tag: string
}

type Props = {
  allGroups: {
    events: Block[]
    conferences: Block[]
    training: Block[]
    happenings: Block[]
  }
}

const labels = {
  events: 'События',
  conferences: 'Конференции',
  training: 'Обучение',
  happenings: 'Мероприятия',
} as const

type GroupKey = keyof typeof labels

export default function NewsSection({ allGroups }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<GroupKey>('events')

  const blocks = allGroups[selectedGroup]

  return (
    <Box 
      width={{ xs: '100%', sm: '90%', md: '80%' }} 
      mx="auto"
      px={{ xs: 2, sm: 3, md: 4 }}
    >
      {/* Меню выбора */}
      <Box 
        display="flex" 
        justifyContent="center"
        sx={{
          overflowX: { xs: 'auto', md: 'visible' },
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <ButtonGroup
          sx={{
            mb: 4,
            borderRadius: 0,
            backgroundColor: 'transparent',
            boxShadow: '0 4px 12px rgba(191, 148, 96, 0.2)',
            flexDirection: { xs: 'row', sm: 'row' },
            flexWrap: { xs: 'nowrap', sm: 'nowrap' },
            '& .MuiButton-root': {
              fontWeight: 600,
              color: '#5a4127',
              textTransform: 'none',
              fontFamily: 'Inter, sans-serif',
              borderColor: '#bf9460',
              borderRight: 'none',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              px: { xs: 1, sm: 2 },
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: '#bf9460',
                backgroundColor: '#f5e6d4',
              },
            },
            '& .MuiButton-root:not(:last-of-type)': {
              borderRight: '1px solid #bf9460',
            },
            '& .MuiButton-root:first-of-type': {
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            },
            '& .MuiButton-root:last-of-type': {
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            },
            '& .MuiButton-root:last-of-type:not(.MuiButton-contained)': {
              borderRight: '1px solid #bf9460',
            },
            '& .MuiButton-contained': {
              backgroundColor: '#bf9460',
              color: '#fff',
              borderColor: '#bf9460',
              '&:hover': {
                backgroundColor: '#a4773f',
              },
            },
          }}
        >
          {Object.entries(labels).map(([key, label]) => (
            <Button
              key={key}
              onClick={() => setSelectedGroup(key as GroupKey)}
              variant={selectedGroup === key ? 'contained' : 'outlined'}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      {/* Карточки */}
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <Box
          display="flex"
          flexWrap="wrap"
          sx={{
            gap: {
              xs: '10px',
              sm: '10px',
              md: '10px',
              lg: '14px',
              xl: '10px'
            },
            justifyContent: {xs: 'center', sm: 'center', md: 'center', lg: 'flex-start'},
            width: { xs: '100%', sm: '100%', md: '100%', lg: '1240px' },

          }}
        >
          {blocks.map((block, index) => (
            <NewsBlock key={index} {...block} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
