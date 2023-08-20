import prismaDb from "@/lib/prismadb";
import ColorForm from "./components/color-form";

const ColorPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  // get color
  const color =
    params.colorId !== "new"
      ? await prismaDb.color.findUnique({
          where: {
            id: params.colorId,
          },
        })
      : null;
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
