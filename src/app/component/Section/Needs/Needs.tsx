import { Box } from "@mui/material";
import NeedsTitle from "./Title";
import MessageForm from "./FormsServer";



export default async function Needs() {
  return (
    <Box width='100%' height='100%' maxWidth='1520px' mt='80px' mx='auto' sx={{backgroundColor:'#F8F1E9'}}>
        <Box
      display="flex"
      flexDirection="column"
      justifyContent='center'
      alignItems='center'
      sx={{
        maxWidth: "1540px",
        mx: "auto", 
        px: { xs: "20px", md: "50px" },
        py: "30px",
      }}
    >
    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
    <NeedsTitle/>
    <Box mt='40px'>
    <MessageForm/>
    </Box>
    </Box>
    </Box>
    </Box>
  );
}
