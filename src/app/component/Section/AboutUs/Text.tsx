import { createClient } from "@/prismicio";
import { Box } from "@mui/material";
import { PrismicRichText, JSXMapSerializer } from "@prismicio/react";

export default async function AboutUsText() {
  const client = createClient();
  const HomePage = await client.getSingle("home_page");

  const components: JSXMapSerializer = {
    paragraph: ({ children }) => (
      <Box component="p" sx={{ mb: 2, lineHeight: "1.6" }}>
        {children}
      </Box>
    ),
    // можно добавить заголовки, списки и т.д. по желанию
  };

  return (
    <Box sx={{ fontSize: "16px" }}>
      <PrismicRichText field={HomePage.data.textaboutus} components={components} />
    </Box>
  );
}
