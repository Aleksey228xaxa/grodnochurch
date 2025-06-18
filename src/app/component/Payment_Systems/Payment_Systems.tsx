import { Box, Link } from "@mui/material";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { asLink } from "@prismicio/helpers";

export default async function Payment_System() {
  const client = createClient();
  const Payment = await client.getSingle("payment_system");

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",           // Перенос при нехватке ширины
        gap: 2,                     // Отступ между иконками
        alignItems: "center",
        justifyContent: { xs: "flex-start", lg: "flex-start" }, // можно изменить на 'center' при необходимости
        flexDirection: { xs: "row", lg: "column" }, // ряд на мобильных, колонка на lg+
      }}
    >
      {Payment.data.system?.map((item, index) => {
        const paymentUrl = asLink(item.payment_link) || "#";
        return (
          <Link
            key={index}
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.payment_ikon?.url && (
              <PrismicNextImage width={85} field={item.payment_ikon} alt="" />
            )}
          </Link>
        );
      })}
    </Box>
  );
}
