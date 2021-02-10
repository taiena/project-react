import React, { createContext, useState } from "react";

type MenuType = { isMenuOpen: boolean; toggleMenuMode: () => {} };

export const MenuContext = createContext({
  isMenuOpen: true,
  toggleMenuMode: () => {},
});

const NavState: React.FC<MenuType> = ({ children }) => {
  const [isMenuOpen, toggleMenu] = useState(false);

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen);
  }

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenuMode }}>
      {children}
    </MenuContext.Provider>
  );
};

export default NavState;
