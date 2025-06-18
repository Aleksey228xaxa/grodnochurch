import { createClient } from '@/prismicio';
import Pastor_Team_Client from './Blocks';


export default async function Pastor_Team() {
  const client = createClient();
  const data = await client.getSingle('pastoral_teams');

  const team = data.data.list.map((item) => ({
    name: item.name || '',
    position: item.job || '',
    image: item.image,
    quote: item.quote || '',
    main_info: item.main_info || '',
    biography: item.biography || '',
    family: item.family || '',
    hobby: item.hobby || '',
  }));

  return <Pastor_Team_Client team={team} />;
}
