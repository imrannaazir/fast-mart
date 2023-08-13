import { auth } from "@clerk/nextjs";
import React from "react";
import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismadb";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  // if not logged in redirected into sing in
  if (!userId) redirect("/sing-in");

  // get store
  const store = await prismaDb.store.findFirst({
    where: {
      userId,
    },
  });

  // if any store available redirect to dashboard
  if (store) redirect(`/${store.id}`);
  return <>{children}</>;
};

export default SetupLayout;
