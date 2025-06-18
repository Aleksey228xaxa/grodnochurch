'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Drawer,
  Divider,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { PrismicNextImage } from '@prismicio/next';
import { RichTextField, ImageField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';

interface Pastor {
  name: string;
  position: string;
  image: ImageField;
  quote?: RichTextField;
  main_info?: RichTextField;
  biography?: RichTextField;
  family?: RichTextField;
  hobby?: RichTextField;
}

interface Props {
  team: Pastor[];
}

export default function Pastor_Team_Client({ team }: Props) {
  const [selectedPastor, setSelectedPastor] = useState<Pastor | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCardClick = (pastor: Pastor) => {
    setSelectedPastor(pastor);
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Box width='100%' height='100%'>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3.3}
          py={4}
          mx='auto'
          maxWidth="1040px"
          justifyContent="center"
          px={{ xs: 2, md: 0 }}
        >
          {team.map((pastor, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(pastor)}
              sx={{
                cursor: 'pointer',
                width: 240,
                borderRadius: 4,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {pastor.image?.url ? (
                <Box
                  sx={{
                    height: 240,
                    overflow: 'hidden',
                    '&:hover img': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <PrismicNextImage
                    field={pastor.image}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.9s ease',
                      display: 'block',
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ height: 280, backgroundColor: '#f0f0f0' }} />
              )}

              <CardContent sx={{ padding: 2, paddingBottom: 2 }}>
                <Typography fontWeight={600} fontSize="1.1rem">
                  {pastor.name}
                </Typography>
                <Typography color="text.secondary">{pastor.position}</Typography>
              </CardContent>

              <IconButton
                disableRipple
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  backgroundColor: 'transparent',
                  color: '#BF9460',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Card>
          ))}
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 420,
            padding: 0,
            backgroundColor: '#fff',
          },
        }}
      >
        {selectedPastor && (
          <Box>
            <Box sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              zIndex: 1 
            }}>
              <IconButton 
                onClick={handleClose}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {selectedPastor.image?.url && (
              <Box
                sx={{
                  maxHeight: 330,
                  mb: 2,
                  overflow: 'hidden',
                  '&:hover img': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <PrismicNextImage
                  field={selectedPastor.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: 330,
                    objectFit: 'cover',
                    transition: 'transform 1s ease',
                  }}
                />
              </Box>
            )}

            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 4 }} />
              <Box sx={{ pr: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  {selectedPastor.name}
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  {selectedPastor.position}
                </Typography>

                {selectedPastor.quote && (
                  <Box mb={2}>
                    <Box
                      sx={{
                        fontStyle: 'italic',
                        fontWeight: 600,
                        color: '#BF9460',
                      }}
                    >
                      <PrismicRichText field={selectedPastor.quote} />
                    </Box>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mt: 2 }}>
                  {selectedPastor.biography && (
                    <>
                      <Typography fontWeight={600} mb={1}>
                        Биография
                      </Typography>
                      <PrismicRichText
                        field={selectedPastor.biography}
                        components={{
                          paragraph: ({ children }) => (
                            <Typography paragraph sx={{ mb: 2 }}>
                              {children}
                            </Typography>
                          ),
                        }}
                      />
                    </>
                  )}
                  {selectedPastor.family && (
                    <>
                      <Typography fontWeight={600} mt={2} mb={1}>
                        Семья
                      </Typography>
                      <PrismicRichText field={selectedPastor.family} />
                    </>
                  )}
                  {selectedPastor.hobby && (
                    <>
                      <Typography fontWeight={600} mt={2} mb={1}>
                        Хобби
                      </Typography>
                      <PrismicRichText field={selectedPastor.hobby} />
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
}
