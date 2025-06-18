import { Box } from "@mui/material";
import FirstTimeTitle from "./Title";
import FirstTimeText from "./Text";
import ButtonFirstTime from "./Button";


export default async function FirstTime() {
  return (
    <Box maxWidth='1522px' mx='auto' height='100%' sx={{ backgroundColor: "#F8F1E9", p:'40px' }}>
        <Box
      display="flex"
      flexDirection="column"
        justifyContent="center"
        alignItems="center"
      sx={{
        maxWidth: "1540px",
        mx: "auto", 
      }}
    >
        <FirstTimeTitle/>
    <Box mt='20px'>
        <FirstTimeText/>
    </Box>
    <Box mt='30px'>
        <ButtonFirstTime/>
    </Box>
    </Box>
    </Box>
  );
}
