import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isContactSalesOpen, setIsContactSalesOpen] = useState(false);

  const openContactSales = () => setIsContactSalesOpen(true);
  const closeContactSales = () => setIsContactSalesOpen(false);
  const toggleContactSales = () => setIsContactSalesOpen(prev => !prev);

  return (
    <UIContext.Provider value={{
      isContactSalesOpen,
      openContactSales,
      closeContactSales,
      toggleContactSales,
      setIsContactSalesOpen
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
