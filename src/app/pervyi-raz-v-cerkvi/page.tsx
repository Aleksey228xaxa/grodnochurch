import Title from "../component/pervyi-raz-v-cerkvi/Title"
import Text from "../component/pervyi-raz-v-cerkvi/Text"
import FAQBlock from "../component/pervyi-raz-v-cerkvi/Blocks"
import { createClient } from "@/prismicio"
import { FAQItem } from "../component/pervyi-raz-v-cerkvi/types"
import { Box } from "@mui/material"

export default async function Home() {
  const client = createClient()
  const document = await client.getSingle("first_time")

  const backgroundUrl = document.data.background_image.url;

  const faqs: FAQItem[] = document.data.questions.map((item) => ({
    question: Array.isArray(item.question) ? item.question[0]?.text || '' : item.question || '',
    answer: Array.isArray(item.answer) ? item.answer[0]?.text || '' : item.answer || '',
  }))

  return (
    <Box>
       <Box
      width="100%"
      height={{ xs: "300px", sm: "350px", md: "450px" }}
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
          backgroundColor: "rgba(191, 148, 96, 0.85)", 
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
      <Title />
      <Text />
      </Box>
      </Box>
      <Box mt='40px'>
      <FAQBlock faqs={faqs} />
      </Box>
    </Box>
  )
}


