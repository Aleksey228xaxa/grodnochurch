import { Box, Typography, Link } from "@mui/material";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { asLink } from "@prismicio/helpers";

export default async function Contacts() {
  const client = createClient();
  const Contact = await client.getSingle("email"); 

  const contacts = Contact.data.contact; 

  return (
    <Box>
      {contacts?.map((item, index) => {
        const contactUrl = asLink(item.contact_links) || "#"; 
        return (
          <Box key={index} display="flex" alignItems="center" gap={1} mb={2}>
            <Link
              href={contactUrl} 
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              {item.contact_ikon?.url && (
                <PrismicNextImage 
                  width="24"
                  field={item.contact_ikon} 
                  alt="" 
                />
              )}
              <Typography>{item.contact_text}</Typography>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
}
