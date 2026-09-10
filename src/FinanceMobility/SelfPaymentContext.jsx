import { createContext, useCallback, useContext, useMemo, useState } from "react";

const SelfPaymentContext = createContext(null);

export function SelfPaymentProvider({ children }) {
  const [selfFormData, setSelfFormDataState] = useState([]);

  const setSelfFormData = useCallback((data) => {
    if (typeof data === "function") {
      setSelfFormDataState((prev) => {
        const next = data(prev);
        return Array.isArray(next) ? [...next] : next;
      });
    } else {
      setSelfFormDataState(Array.isArray(data) ? [...data] : data);
    }
  }, []);

  const appendToSelfForm = useCallback((item) => {
    setSelfFormDataState((prev) => [...prev, item]);
  }, []);

  const value = useMemo(
    () => ({
      selfFormData,
      setSelfFormData,
      appendToSelfForm,
    }),
    [selfFormData, setSelfFormData, appendToSelfForm]
  );

  return (
    <SelfPaymentContext.Provider value={value}>
      {children}
    </SelfPaymentContext.Provider>
  );
}

export function useSelfPayment() {
  const ctx = useContext(SelfPaymentContext);
  if (!ctx) {
    throw new Error("useSelfPayment must be used within SelfPaymentProvider");
  }
  return ctx;
}
