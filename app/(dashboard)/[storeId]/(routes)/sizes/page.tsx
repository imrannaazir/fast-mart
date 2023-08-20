import prismaDb from "@/lib/prismadb";
import SizesClient from "./components/sizes-client";
import { format } from "date-fns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
