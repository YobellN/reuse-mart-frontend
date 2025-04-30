"use client";

import { createContext, useContext } from "react";

type User = {
  nama: string;
  email: string;
  no_telp: string;
};

export const UserContext = createContext<User | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser harus digunakan di dalam UserProvider");
  }
  return context;
};