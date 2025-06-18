import { Box, Typography, Paper} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { PrismicImage } from '@prismicio/react';
import { createClient } from '@/prismicio';
import Text from './Text';
import Author from './Author';
import QuoteStatusText from './Status';

export default async function QuoteBlock() {
  const client = createClient();
  const homePage = await client.getSingle('home_page');
  const image = homePage.data.image_quote;

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '1224px',
        mx: 'auto',
        mt: '140px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          pl: { md: '400px' },
          pr: 6,
          py: 6,
          borderRadius: 3,
          backgroundColor: '#F8F1E9',
          position: 'relative',
          zIndex: 1,
          height: { xs: 'auto', md: '280px' },
        }}
      >
        {/* Темный квадрат — только на десктопе */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: 0,
            left: 120,
            width: 260,
            height: '280px',
            backgroundColor: '#BF9460',
            zIndex: 2,
          }}
        />

        {/* Картинка */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            top: { md: -40 },
            left: { md: 90 },
            width: 260,
            height: 302,
            zIndex: 3,
            overflow: 'hidden',
            mb: { xs: 3, md: 0 },
            mx: { xs: 'auto', md: 0 },
          }}
        >
          <PrismicImage
            field={image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>

        {/* Текстовая часть */}
        <Box sx={{ flex: 1, position: 'relative', justifyContent: 'center' }}>
          <FormatQuoteIcon
            sx={{
              fontSize: 150,
              color: 'text.primary',
              opacity: 0.15,
              position: 'absolute',
              top: -80,
              left: 0,
              userSelect: 'none',
              pointerEvents: 'none',
              transform: 'rotate(180deg)',
              display: { xs: 'none', md: 'block' },
            }}
          />
          <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 2, px: { xs: 3, md: 0 },  }}>
            <Text />
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' , px: { xs: 3, md: 0 }, }}>
            <Author />
          </Typography>
           <Typography variant="subtitle1" sx={{ px: { xs: 3, md: 0 }, }}>
          <QuoteStatusText />
           </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
