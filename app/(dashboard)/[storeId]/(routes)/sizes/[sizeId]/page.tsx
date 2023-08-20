import prismaDb from "@/lib/prismadb";
import SizeForm from "./components/size-form";

const SizePage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  // get size
  const size =
    params.sizeId !== "new"
      ? await prismaDb.size.findUnique({
          where: {
            id: params.sizeId,
          },
        })
      : null;
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
