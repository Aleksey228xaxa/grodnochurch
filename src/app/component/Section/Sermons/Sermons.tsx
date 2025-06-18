import { Box } from "@mui/material";
import SermonsTitle from "./Title";
import GridCarousel from "./CarouselTwo";
import SermonsText from "./Text";



export default async function Sermons() {
  return (
    <Box width='100%' height='100%'>
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
        <SermonsTitle />
        <SermonsText/>
    <Box display='flex' justifyContent='center' mt='0px'>
        <GridCarousel/>
    </Box>
    </Box>
    </Box>
  );
}
