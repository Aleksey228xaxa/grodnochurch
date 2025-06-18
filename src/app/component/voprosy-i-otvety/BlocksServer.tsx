// app/your-page/QuestionBlocksWrapper.tsx
import { createClient } from '@/prismicio'
import { ImageField } from '@prismicio/client'
import QuestionBlocksClient from './Modal'

type BlockQuestion = {
  date: string
  image: ImageField
  title: string
  text: string
  tag: string
}

export default async function QuestionBlocksWrapper() {
  const client = createClient()
  const doc = await client.getSingle('questions_answer')

  const blocks = (doc.data.block as BlockQuestion[]).map((item) => ({
    date: item.date,
    image: item.image,
    title: item.title,
    text: item.text,
    tag: item.tag,
  }))

  return <QuestionBlocksClient blocks={blocks} />
}
