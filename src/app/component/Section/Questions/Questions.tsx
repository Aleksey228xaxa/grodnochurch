import { Box } from "@mui/material";
import QuestionsTitle from "./Title";
import QuestionsSection from "./FormsServer";


export default async function Questions() {
  return (
    <Box width='100%' height='100%' maxWidth='1520px' mx='auto' mt='80px' sx={{backgroundColor:'#F8F1E9'}}>
        <Box
      display="flex"
      flexDirection="column"
      sx={{
        px: { xs: "20px", md: "50px" },
        py: "30px",
      }}
    >
         <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        <QuestionsTitle/>
        <Box mt='40px'>
        <QuestionsSection/>
        </Box>
        </Box>
    </Box>
    </Box>
  );
}
