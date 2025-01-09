import { useState } from "react";

export const useFloatingButtonHandlers = (
  isSelectedNewFolder: () => void,
  isSelectedNewNote: () => void
) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const selectedOption = (type: string) => {
    if (type === "folder") {
      isSelectedNewFolder();
    } else {
      isSelectedNewNote();
    }
    toggleMenu();
  };

  return {
    isMenuOpen,
    toggleMenu,
    selectedOption,
  };
};
