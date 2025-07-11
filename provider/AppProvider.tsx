"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </Provider>
  );
};
