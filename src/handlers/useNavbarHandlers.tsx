import { useState } from "react";

export const useNavbarHandlers = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return {
    searchText,
    isSearchOpen,
    setSearchText,
    setIsSearchOpen,
    toggleSearch,
  };
};
