import { Box } from "@mui/material";
import NewsBlocksWrapper from "../component/novosti-i-sobytiya/BlocksServer";
import Title from "../component/novosti-i-sobytiya/Title";


export default async function KontaktyPage() {

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

      <Box
        sx={{
          width: '100%',
          mt: '80px',
          pb: '80px',
        }}>
      <NewsBlocksWrapper />
      </Box>
    </Box>
  );
}
