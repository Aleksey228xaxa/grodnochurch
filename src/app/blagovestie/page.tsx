import { Box } from "@mui/material";
import Title from "../component/bogosluzheniya/Evangelism/Title";
import { CustomImageGallery } from "../component/bogosluzheniya/Evangelism/Carousel";
import Text from "../component/bogosluzheniya/Evangelism/Text";
import { createClient } from "@/prismicio";



export default async function KontaktyPage() {
  const client = createClient()
      const document = await client.getSingle("evangelism")
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
       <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt='80px'>
        <CustomImageGallery/>
        </Box>
        <Box mt='80px' maxWidth='1020px' mx='auto' display='flex' justifyContent='center' pb='80px'sx={{
          pr: { xs: "40px", md: "0px" },
          pl: { xs: "40px", md: "0px" },
        }}>
        <Text/>
        </Box>
    </Box>
  );
}

