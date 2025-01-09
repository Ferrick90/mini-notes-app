import { useState } from "react";
import { Folder } from "../models/folder";

export const useFolderModalHandlers = (folder: Folder | null) => {
  const [name, setName] = useState(folder ? folder.name : "");
  const [showError, setShowError] = useState(false);

  const resetModal = () => {
    setName("");
    setShowError(false);
  };

  const validateInput = () => {
    if (!name) {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  };

  return {
    name,
    showError,
    setName,
    setShowError,
    resetModal,
    validateInput,
  };
};
