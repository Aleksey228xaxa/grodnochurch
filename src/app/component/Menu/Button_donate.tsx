import { Button } from "@mui/material";
import React from "react";
import Link from "next/link";

const ButtonDonate: React.FC = () => {
  return (
    <Link href="/oplata" style={{ textDecoration: 'none' }}>
      <Button
        variant="outlined"
        sx={{
          color: "#BF9460",
          border: "2px solid #BF9460",
          fontFamily: "Inter, sans-serif",
          px: 2,
          py: 1,
          fontSize: { xs: "0.7rem", sm: "0.9rem" },
          ":hover": {
            backgroundColor: "rgba(219, 160, 75, 0.2)",
          },
        }}
      >
        Пожертвовать
      </Button>
    </Link>
  );
};

export default ButtonDonate;
