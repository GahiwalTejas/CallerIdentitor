import React, { useState, useEffect } from "react";

const Toaster = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-${type}-500 text-white p-4 rounded-md shadow-md transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

export default Toaster;
