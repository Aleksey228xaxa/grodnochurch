import Menu from "./Menu/Menu";
import MenuWrapper from "./MenuTwo/Menu_two_server";

export default async function Header() {

  return (
    <header style={{ 
      position: 'relative', 
      zIndex: 9998,
      marginTop: '3px' // Отступ для линии загрузки
    }}>
        <Menu/>
        <MenuWrapper/>
    </header>
  );
}
