import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismaDb from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";

const Settings = async ({ params }: { params: { storeId: string } }) => {
  // user id
  const { userId } = auth();

  // if not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  // get first store
  const store = await prismaDb.store.findFirst({
    where: {
      userId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm />
      </div>
    </div>
  );
};

export default Settings;
