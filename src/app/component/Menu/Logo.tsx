import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { asLink } from "@prismicio/helpers";
import { Avatar } from "@mui/material";


export type LogoProps = {
  document: Content.MenuOneDocument;
};


const Logo: FC<LogoProps> = ({ document }) => {
  if (!document?.data?.logo || document.data.logo.length === 0) {
    return null;
  }

  return (
    <section>
      {document.data.logo.map((item, index) => {
        const linkUrl = asLink(item.logo_link) || "#";
        return (
          <Avatar key={index} sx={{width:'90px', height:'90px', backgroundColor:'#fff'}}>
          <a href={linkUrl} className="block">
            <PrismicNextImage
              field={item.logo_img}
              className="max-w-[100px] transition-transform duration-300 hover:scale-110"
              alt=""
              width={90}
              height={90}
            />
          </a>
          </Avatar>
        );
      })}
    </section>
  );
};

export default Logo;
