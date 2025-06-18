import { createClient } from '@/prismicio'
import { Content } from '@prismicio/client'

export const getCarouselSlides = async () => {
  const client = createClient()
  const document = await client.getSingle<Content.ChurchValuesDocument>("church_values")

  return document.data.image_galery.map((item) => ({
    imageUrl: item.image.url || '',
    alt: item.image.alt || 'Slide image',
  }))
}
