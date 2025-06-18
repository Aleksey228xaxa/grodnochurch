import Menu from "./Menu/Menu";
import MenuWrapper from "./MenuTwo/Menu_two_server";

export default async function Header() {

  return (
    <header>
        <Menu/>
        <MenuWrapper/>
    </header>
  );
}
