import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "@/components/navbar/main-nav";
import StoreSwitcher from "@/components/navbar/store-switcher";
import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismadb";
import { ThemeToggle } from "../theme-toggle";

const Navbar = async () => {
  // get user id
  const { userId } = auth();

  // if userId not available
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismaDb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div
      className="
  border-b"
    >
      <div
        className="
    flex
    h-16
    items-center
    px-4
    "
      >
        <StoreSwitcher items={stores} />
        <MainNav className="mx-4" />
        <div
          className="
        ml-auto
        flex
        items-center
        space-x-4"
        >
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
