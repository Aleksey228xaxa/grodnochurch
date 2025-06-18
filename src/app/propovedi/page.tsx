import { Box } from "@mui/material";
import { CustomVideoGallery } from "../component/Propovedi/Carousel";
import SermonsText from "../component/Propovedi/Text";
import SermonsTitle from "../component/Section/Sermons/Title";
import { createClient } from "@/prismicio";




export default async function Home() {
    const client = createClient()
    const document = await client.getSingle("sermons")
  
   const backgroundUrl = document.data.background_image?.url;
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
          backgroundColor: "rgba(191, 148, 96, 0.8)", 
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
        }}
      >
      <SermonsTitle/>
          <Box mt='20px'>
      <SermonsText/>
    </Box>
      </Box>
      </Box>
      <Box maxWidth='1000px' mx={'auto'} mt='40px' pb='80px'>
      <CustomVideoGallery/>
      </Box>
    </Box>
  );
}
