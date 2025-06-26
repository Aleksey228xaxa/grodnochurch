import { Box } from "@mui/material";
import CalendarDisplay from "../component/Section/Kalendar/KalendarDisplay";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import Title from "./Title";

export const dynamic = "force-dynamic";

export default async function Home() {
  const client = createClient({
    fetch: (url, options = {}) => fetch(url, { ...options, cache: "no-store" }),
  })
  const HomePage = await client.getSingle<Content.NewsEventsDocument>('news_events')
  const document = await client.getSingle("calendar")

  const backgroundUrl = document.data.background_image?.url;

  const allEventGroups = [
    ...(HomePage.data.events || []),
    ...(HomePage.data.conferences || []),
    ...(HomePage.data.happenings || []),
    ...(HomePage.data.training || []),
  ]

  const events = allEventGroups
    .filter((event) => !!event.date)
    .map((event) => ({
      title: event.title || '',
      date: event.date || '',
      format: event.format || false,
      language: event.language || false,
    }))

  return (
    <Box>
      <Box
        width="100%"
        height={{ xs: "200px", md: "350px" }}
        m="0"
        p="0"
        sx={{
          position: "relative", 
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: { xs: "100%", md: "1522px" },
          mx: "auto",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: { xs: "100%", md: "1520px" },
            backgroundColor: "rgba(191, 148, 96, 0.9)", 
            zIndex: 1,
          }}
        />
        <Box
          height='100%'
          display="flex"
          sx={{
            position: "absolute",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            top: { xs: "40px", md: "80px" },
            left: { xs: "20px", md: "150px" },
            zIndex: 2,
            color: '#fff',
            fontSize: { xs: "24px", md: "32px" },
          }}
        >
          <Title />
        </Box>
      </Box>
      <Box mt={{ xs: "40px", md: "80px" }}>
        <CalendarDisplay events={events} />
      </Box>
    </Box>
  );
}


