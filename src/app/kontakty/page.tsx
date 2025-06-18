import { Box } from "@mui/material";
import AvatarCarouselWrapper from "../component/kontakty/CarouselServer";
import Title from "../component/kontakty/Title";
import MapPage from "../component/kontakty/Map";


export default function KontaktyPage() {
  return (
    <Box>
    <Box
   width="100%"
   height={{ xs: "200px", md: "350px" }}
   m="0"
   p="0"
   sx={{
     position: "relative", 
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
       backgroundColor: "rgba(191, 148, 96, 1)", 
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
        <MapPage/>    
        <Box maxWidth='1540px' sx={{ mt:{xs:'80px', md:'0px' },pb:'40px'}}>
        <AvatarCarouselWrapper /> 
        </Box> 
    </Box>
  );
}