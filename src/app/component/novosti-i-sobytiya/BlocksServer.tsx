import { createClient } from '@/prismicio'
import { ImageField, KeyTextField, TimestampField } from '@prismicio/client'
import { Box } from '@mui/material'
import NewsSection from './Nav'
import { Content } from '@prismicio/client'

interface NewsItem {
  date: TimestampField
  image: ImageField
  title: KeyTextField
  text: KeyTextField
  tag: KeyTextField
}

type Block = {
  date: string
  image: ImageField
  title: string
  text: string
  tag: string
}

function toStringOrEmpty(field: KeyTextField): string {
  return field ?? ''
}

function toISOStringOrEmpty(date: TimestampField): string {
  return date ? new Date(date).toISOString() : ''
}

function mapBlocks(items: NewsItem[]): Block[] {
  return items.map(item => ({
    date: toISOStringOrEmpty(item.date),
    image: item.image,
    title: toStringOrEmpty(item.title),
    text: toStringOrEmpty(item.text),
    tag: toStringOrEmpty(item.tag),
  }))
}

export default async function NewsBlocksWrapper() {
  const client = createClient()
  const doc = await client.getSingle<Content.NewsEventsDocument>('news_events')

  const allGroups = {
    events: mapBlocks(doc.data.events || []),
    conferences: mapBlocks(doc.data.conferences || []),
    training: mapBlocks(doc.data.training || []),
    happenings: mapBlocks(doc.data.happenings || []),
  }

  return (
    <Box>
      <NewsSection allGroups={allGroups} />
    </Box>
  )
}
