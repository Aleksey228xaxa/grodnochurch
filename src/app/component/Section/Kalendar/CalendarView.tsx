import { createClient } from '@/prismicio';
import { GetServerSideProps } from 'next';
import CalendarClient from './CalendarCell';
import { Content } from '@prismicio/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createClient();
  const HomePage = await client.getSingle<Content.NewsEventsDocument>('news_events');
  const allEventGroups = [
    ...(HomePage.data.events || []),
    ...(HomePage.data.conferences || []),
    ...(HomePage.data.happenings || []),
    ...(HomePage.data.training || []),
  ];

  // Преобразуем события
  const events = allEventGroups
    .filter((event) => !!event.date)
    .map((event) => ({
      title: event.title || '',
      date: event.date || '',
      format: event.format || false,
      language: event.language || false,
    }));

  return {
    props: {
      events,
    },
  };
};

interface Props {
  events: { title: string; date: string; format: boolean; language: boolean }[];
}

export default function CalendarPage({ events }: Props) {
  return (
    <div>
      <h1>Календарь событий</h1>
      <CalendarClient events={events} />
    </div>
  );
}
