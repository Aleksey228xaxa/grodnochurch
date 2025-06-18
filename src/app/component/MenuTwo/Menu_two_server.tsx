import { createClient } from "@/prismicio";
import MenuClient from "./Menu_two";
import { MenuTwoDocument } from "./types";



export default async function MenuWrapper() {
  const client = createClient();

  const menuData = await client.getSingle("menu_two", {
    fetchLinks: ["submenu_item.menu_items", "submenu_item_two.menu_items"],
  });

return (
  <>
    <MenuClient menuData={menuData as MenuTwoDocument} />
  </>
);
}
