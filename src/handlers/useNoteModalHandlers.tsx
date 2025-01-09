import { useState } from "react";

export const useNoteModalHandlers = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [showError, setShowError] = useState(false);

  const resetModal = () => {
    setName("");
    setDetails("");
    setShowError(false);
  };

  const validateInputs = () => {
    if (!name || !details) {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  };

  return {
    name,
    details,
    showError,
    setName,
    setDetails,
    setShowError,
    validateInputs,
    resetModal,
  };
};
