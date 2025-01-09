import { FC, useEffect, useRef } from "react";
import { useFloatingButtonHandlers } from "../handlers/useFloatingButtonHandlers";

export type FloatingButtonHandlersProps = {
  isSelectedNewFolder: () => void;
  isSelectedNewNote: () => void;
};

const FloatingButton: FC<FloatingButtonHandlersProps> = ({
  isSelectedNewFolder,
  isSelectedNewNote,
}) => {
  const { isMenuOpen, toggleMenu, selectedOption } = useFloatingButtonHandlers(
    isSelectedNewFolder,
    isSelectedNewNote
  );

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isMenuOpen) toggleMenu(); // Close menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <div className="fixed bottom-5 right-10" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className=" w-16 h-16 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 flex items-center justify-center transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12 4c.55 0 1 .45 1 1v6h6c.55 0 1 .45 1 1s-.45 1-1 1h-6v6c0 .55-.45 1-1 1s-1-.45-1-1v-6H5c-.55 0-1-.45-1-1s.45-1 1-1h6V5c0-.55.45-1 1-1z" />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="absolute bottom-20 right-0 bg-white shadow-md rounded-md overflow-hidden w-48">
          <button
            onClick={() => selectedOption("folder")}
            data-dialog-target="create-folder-modal"
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Add Folder
          </button>
          <button
            onClick={() => selectedOption("note")}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Add Note
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
