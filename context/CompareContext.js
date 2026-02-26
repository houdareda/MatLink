"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("matlink_compare");
    if (saved) {
      try {
        setSelectedProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse compare list", e);
      }
    }
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("matlink_compare", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleCompare = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.find((p) => p.id === product.id);
      if (isSelected) {
        showNotification("تمت إزالة المنتج من المقارنة");
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showNotification("يمكنك مقارنة 4 منتجات كحد أقصى");
        return prev;
      }
      showNotification("تمت إضافة المنتج للمقارنة");
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
    showNotification("تمت إزالة المنتج من المقارنة");
  };

  const clearCompare = () => {
    setSelectedProducts([]);
    showNotification("تم مسح قائمة المقارنة");
  };

  return (
    <CompareContext.Provider value={{ 
      selectedProducts, 
      toggleCompare, 
      removeFromCompare,
      clearCompare,
      notification,
      showNotification,
      isCompared: (id) => selectedProducts.some((p) => p.id === id)
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
