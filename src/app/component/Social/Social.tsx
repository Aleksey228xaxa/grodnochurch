import { Box, Typography, Link } from "@mui/material";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { asLink } from "@prismicio/helpers";

export default async function Social() {
  const client = createClient();
  const Social = await client.getSingle("social_networks");

  return (
    <Box>
      {Social.data.social?.map((item, index) => {
        const SoccialUrl = asLink(item.social_link) || "#"; 
        return(
        <Box key={index} display="flex" alignItems="center" gap={1} mb={2}>
          <Link
            href={SoccialUrl}
            target="_blank"
            rel="noopener noreferrer"
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ textDecoration: "none", color: "inherit" }} 
          >
            {item.social_ikon?.url && (
              <PrismicNextImage width={24} field={item.social_ikon} alt="" />
            )}

            <Typography>{item.social_text}</Typography>
          </Link>
        </Box>
        );
      })}
    </Box>
  );
}
