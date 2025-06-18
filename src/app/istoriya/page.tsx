import { Box } from "@mui/material";
import Blocks from "../component/Istoriya/BlocksServer";
import Title from "../component/Istoriya/Title";
import { createClient } from "@/prismicio";
import TitleThree from "../component/cennosti-cerkvi/Block_Three/Title";
import BeliefsServer from "../component/cennosti-cerkvi/Block_Three/DiesServer";




export default async function Home() {
  const client = createClient()
      const document = await client.getSingle("history")
      const backgroundUrl = document.data.background_image.url;
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
      <Title/>
      </Box>
      </Box>
      <Box display='flex' maxWidth='1100px' mx='auto'>
      <Blocks/>
      </Box>
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mt='80px' mb='80px'>
            <TitleThree/>
            <BeliefsServer/>
            </Box>
    </Box>
  );
}
