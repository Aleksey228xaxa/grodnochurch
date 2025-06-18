import { Box } from "@mui/material";
import Title from "../component/Pastor_Team/Title";
import Pastor_Team from "../component/Pastor_Team/BlocksServer";
import { createClient } from "@/prismicio";





export default async function Home() {
       const client = createClient()
            const document = await client.getSingle("pastoral_teams")
            const backgroundUrl = document.data.background_image.url;
        return (
          <Box>
             <Box
            width="100%"
            height="450px"
            m="0"
            p="0"
            sx={{
              position: "relative", 
              backgroundImage: `url(${backgroundUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maxWidth:"1522px",
              mx: "auto",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                maxWidth:"1520px",
                backgroundColor: "rgba(191, 148, 96, 0.6)", 
                zIndex: 1,
              }}
            />
             <Box
              height='100%'
              display="flex"
              flexDirection='column'
              alignItems="center"
              justifyContent="center"
              sx={{
                maxWidth: "1240px",
                mx: "auto",
                position: "relative",
                zIndex: 2,
                color: '#fff',
              }}
            >
        <Title/>
        </Box>
        </Box>
        <Pastor_Team/>
    </Box>

  );
}
