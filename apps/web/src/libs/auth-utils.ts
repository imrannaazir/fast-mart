import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./auth";

// hook to get session in client
export const useGetSession = () => {
  const session = useSession();
  return {
    isAuthenticated: session.status === "authenticated",
    session: session.data,
    loading: session.status === "loading",
  };
};

// utils to get session from server side
export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return {
    isAuthenticated: !!session?.user?.userId,
    session: session,
  };
};
