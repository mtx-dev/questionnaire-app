import React, { createContext, useContext, useState, ReactNode } from "react";
import { Language } from "../types";

// Define the shape of the context state
interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Create the context
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Create a custom hook to access the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Provider component to wrap the app
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en"); // Default language is English

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
