'use client'

import { Box, Typography } from "@mui/material";
import { PrismicNextImage } from "@prismicio/next";
import { Content } from "@prismicio/client";

interface Props {
  timeline: Content.HistoryDocumentDataBlockItem[];
}

export default function TimelineClient({ timeline }: Props) {
  return (
    <Box mt={7}>
      {timeline.map((item, index) => (
        <Box key={index} mb={6}>
          <Typography variant="h6">{item.data}</Typography>

          {item.image && (
            <Box my={2}>
              <PrismicNextImage field={item.image} alt="" width={600} height={400}/>
            </Box>
          )}

          <Typography maxWidth='600px'>{item.text}</Typography>
        </Box>
      ))}
    </Box>
  );
}
