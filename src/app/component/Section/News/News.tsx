import { Box } from "@mui/material";
import NewsTitle from "./Title";
import NewsBlocksWrapper from "./BlocksServer";


export default async function News() {
  return (
    <Box width='100%' height='100%' mt='60px'>
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
        <Box display='flex' justifyContent='center'>
            <NewsTitle/>
        </Box>
        <NewsBlocksWrapper/>
    </Box>
    </Box>
  );
}
