"use client";

import { TUser } from "@repo/utils/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type TUserContext = {
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser>>;
};

const UserContext = createContext<TUserContext | undefined>(undefined);

// user provider
export const UserProvider = ({ children, initialUser }: { children: ReactNode; initialUser: TUser }) => {
  const [user, setUser] = useState<TUser>(initialUser);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// user hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
