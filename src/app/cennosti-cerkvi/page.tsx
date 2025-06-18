import TitleTwo from "../component/cennosti-cerkvi/Block_Two/Title";
import TitleThree from "../component/cennosti-cerkvi/Block_Three/Title";
import TitleFour from "../component/cennosti-cerkvi/Block_Four/Tilte";
import TextFour from "../component/cennosti-cerkvi/Block_Four/Text";
import Footer from "../component/cennosti-cerkvi/Block_Five/Footer";
import EmblaCarouselFromPrismic from "../component/cennosti-cerkvi/Block_Four/Carousel";
import { createClient } from "@/prismicio";
import { FAQItem } from "../component/cennosti-cerkvi/Block_Two/types";
import FAQBlock from "../component/cennosti-cerkvi/Block_Two/Text";
import { Box } from "@mui/material";
import VideoBlock from "../component/cennosti-cerkvi/Block_Two/VideoComponentServer";
import BeliefsServer from "../component/cennosti-cerkvi/Block_Three/DiesServer";




export default async function Home() {
  const client = createClient()
    const document = await client.getSingle("church_values")
    const backgroundUrl = document.data.background_image.url;
  
    const faqs: FAQItem[] = document.data.cards.map((item) => ({
      text: Array.isArray(item.textaboutus) ? item.textaboutus[0]?.text || '' : item.textaboutus || '',
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
      <TitleTwo />
      </Box>
      </Box>
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mt='80px'>
         <FAQBlock faqs={faqs} />
               <VideoBlock/>
               </Box>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mt='80px'>
      <TitleThree/>
      <BeliefsServer/>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mt='80px'>
        <TitleFour/>
        <TextFour/>
        <EmblaCarouselFromPrismic/>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mt='40px' pb='40px'>
      <Footer/>
      </Box>
    </Box>
  );
}
