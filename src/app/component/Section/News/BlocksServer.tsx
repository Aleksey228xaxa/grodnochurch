import { createClient } from '@/prismicio'
import { ImageField } from '@prismicio/client'
import QuestionBlocksResponsive from './Nav'

type BlockQuestion = {
  date: string
  image: ImageField
  title: string
  text: string
  tag: string
}

export default async function QuestionBlocksWrapper() {
  const client = createClient()
  const doc = await client.getSingle('news_events')

  const blocks = (doc.data.events as BlockQuestion[])
    .slice(0, 4)
    .map((item) => ({
      date: item.date,
      image: item.image,
      title: item.title,
      text: item.text,
      tag: item.tag,
    }))

  return <QuestionBlocksResponsive blocks={blocks} />
}
