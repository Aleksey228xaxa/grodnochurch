import { createClient } from '@/prismicio'
import AvatarCarousel from './Carousel'
import { ImageFieldImage, FilledLinkToWebField } from '@prismicio/types'
import { Content } from '@prismicio/client'

export default async function AvatarCarouselWrapper() {
  const client = createClient()
  const contact = await client.getSingle<Content.ContactDocument>('contact')

  const avatars = contact.data.human.map((item) => ({
    id: item.foto.id || '',
    imageUrl: item.foto.url || '',
    name: item.name || '',
    email: item.email || '',
    phone: item.telephone || '',
    emailLink: (item.email_link as FilledLinkToWebField)?.url || '',
    telegramLink: (item.telegram_link as FilledLinkToWebField)?.url || '',
    instagramLink: (item.instagram_link as FilledLinkToWebField)?.url || '',
    facebookLink: (item.facebook_link as FilledLinkToWebField)?.url || '',
  }))

  const icons = {
    phone: {
      url: contact.data.telephone_ikon.url || '',
      alt: 'phone icon',
      dimensions: { width: 20, height: 20 }
    } as ImageFieldImage,
    email: {
      url: contact.data.email_ikon.url || '',
      alt: 'email icon',
      dimensions: { width: 24, height: 24 }
    } as ImageFieldImage,
    facebook: {
      url: contact.data.facebook_ikon.url || '',
      alt: 'facebook icon',
      dimensions: { width: 24, height: 24 }
    } as ImageFieldImage,
    telegram: {
      url: contact.data.telegram_ikon.url || '',
      alt: 'telegram icon',
      dimensions: { width: 24, height: 24 }
    } as ImageFieldImage,
    instagram: {
      url: contact.data.instagram_ikon.url || '',
      alt: 'instagram icon',
      dimensions: { width: 24, height: 24 }
    } as ImageFieldImage
  }

  return <AvatarCarousel avatars={avatars} icons={icons} />
}
