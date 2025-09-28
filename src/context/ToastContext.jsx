import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success", noNavigate = false) => {
    setToast({ message, type, noNavigate });

    setTimeout(() => setToast(null), 3000);
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  return (
    <ToastContext.Provider value={{ toast, showToast, clearToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
