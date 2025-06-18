import { createClient } from '@/prismicio'
import BeliefsClient from './Dies'

export default async function BeliefsServer() {
  const client = createClient()
  const doc = await client.getSingle('church_values')
  const items = doc.data.dies || []

  return <BeliefsClient items={items} />
}
