'use client'

import React, { useState } from 'react'
import { Box, Pagination, Paper } from '@mui/material'
import QuestionBlock from './Blocks'
import { ImageField } from '@prismicio/client'

type Block = {
  date: string
  image: ImageField
  title: string
  text: string
  tag: string
}

type Props = {
  blocks: Block[]
}

const ITEMS_PER_PAGE = 4

export default function QuestionBlocksClient({ blocks }: Props) {
  const [page, setPage] = useState(1)

  const pageCount = Math.ceil(blocks.length / ITEMS_PER_PAGE)
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const paginatedBlocks = blocks.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Box
      sx={{
        backgroundColor: '#FFF8F0',
        padding: { xs: 2, md: 4 },
        borderRadius: 4,
        boxShadow: '0px 10px 30px rgba(219, 160, 75, 0.1)',
        maxWidth: '1300px',
        margin: '0 auto',
      }}
    >
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
        {paginatedBlocks.map((block, index) => (
          <QuestionBlock key={index} {...block} />
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt={5}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                borderRadius: '50%',
                color: '#BF9460',
                '&.Mui-selected': {
                  backgroundColor: '#BF9460',
                  color: '#fff',
                },
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  )
}
