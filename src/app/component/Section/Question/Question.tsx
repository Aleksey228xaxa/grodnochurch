import { Box } from "@mui/material";
import QuestionTitle from "./Title";
import QuestionBlocksWrapper from "./BlocksServer";


export default async function Question() {
  return (
    <Box width='100%' height='100%' mt='40px'>
        <Box
      display="flex"
      flexDirection="column"
      sx={{
        maxWidth: "1540px",
        mx: "auto", 
        px: { xs: "20px", md: "50px" },
        py: "30px",
      }}
    >
    <Box display="flex" justifyContent='center'>
        <QuestionTitle/>
    </Box>
        <QuestionBlocksWrapper/>
    </Box>
    </Box>
  );
}
