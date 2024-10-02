import { redirect } from "next/navigation";
import { AuthError } from "./api";

type ServerAction<T extends any[], R> = (...args: T) => Promise<R>;

export default function withAuth<T extends any[], R>(action: ServerAction<T, R>): ServerAction<T, R> {
  return async function (...args: T): Promise<R> {
    try {
      return await action(...args);
    } catch (error) {
      if (error instanceof AuthError) {
        redirect("/login");
      }
      throw error;
    }
  };
}
