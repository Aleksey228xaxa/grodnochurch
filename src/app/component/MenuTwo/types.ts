
import { LinkField } from "@prismicio/types";

export interface SubSubmenuItem {
  title: string;
  url: LinkField;
}

export interface SubmenuItem {
  title: string;
  url: LinkField;
  submenu_item_two?: {
    data: {
      menu_items: SubSubmenuItem[];
    };
  };
}

export interface MenuItem {
  title: string;
  url: LinkField;
  isclickable?: boolean;
  submenu?: {
    data: {
      menu_items: SubmenuItem[];
    };
  };
}

export interface MenuTwoData {
  menu_item: MenuItem[];
}

export interface MenuTwoDocument {
  data: MenuTwoData;
}
