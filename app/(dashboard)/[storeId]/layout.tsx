import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar/navbar";
import prismaDb from "@/lib/prismadb";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();

  //   if not logged in redirect to the sign in
  if (!userId) {
    redirect("/sign-in");
  }

  //   get first store of the user
  const store = await prismaDb?.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  //   if store is not found redirect to the home
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
