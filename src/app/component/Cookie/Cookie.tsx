'use client'
import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Box, Link } from "@mui/material";
import Image from "next/image"; 

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);


  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setIsVisible(false);
  };

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted === "true" || cookiesAccepted === "false") {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#333",
        color: "white",
        padding: { xs: 2, sm: 3 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 1000,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          display: "flex", 
          alignItems: "center",
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 3 },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Image
            src="/Cookie.png" 
            alt="Cookie Icon"
            width={40}
            height={40}
            style={{ 
              minWidth: 40,
              height: 'auto'
            }}
          />
          <Typography 
            variant="body2" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: 1.5,
            }}
          >
            Мы используем cookies для улучшения качества обслуживания.{" "}
            <Link 
              href="/privacy-policy" 
              sx={{ 
                color: "#f0f0f0",
                textDecoration: 'underline',
                '&:hover': {
                  color: '#BF9460',
                }
              }}
            >
              Подробнее
            </Link>
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: "flex", 
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}
        >
          <Button 
            variant="outlined" 
            onClick={handleReject}
            sx={{
              color: '#f0f0f0',
              borderColor: '#f0f0f0',
              '&:hover': {
                borderColor: '#BF9460',
                color: '#BF9460',
              },
              minWidth: { xs: '120px', sm: '140px' }
            }}
          >
            Не принимаю
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAccept}
            sx={{
              backgroundColor: '#BF9460',
              '&:hover': {
                backgroundColor: '#A5793B',
              },
              minWidth: { xs: '120px', sm: '140px' }
            }}
          >
            Принимаю
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CookieBanner;
