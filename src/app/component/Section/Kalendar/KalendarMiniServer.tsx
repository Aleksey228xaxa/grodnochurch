import { createClient } from '@/prismicio';
import { GetServerSideProps } from 'next';
import CalendarClientTwo from './KalendarMini';
import { Content } from '@prismicio/client';
import { Box } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createClient()
  const HomePage = await client.getSingle<Content.NewsEventsDocument>('news_events')

  const allEventGroups = [
    ...(HomePage.data.events || []),
    ...(HomePage.data.conferences || []),
    ...(HomePage.data.happenings || []),
    ...(HomePage.data.training || []),
  ];

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
  events: { title: string; date: string; format: boolean; language: boolean;}[];
}

export default function CalendarPageTwo({ events }: Props) {
  return (
    <Box>
      <CalendarClientTwo events={events} /> 
    </Box>
  );
}
