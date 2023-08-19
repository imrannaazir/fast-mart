import prismaDb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  // get category
  const category =
    params.categoryId !== "new"
      ? await prismaDb.category.findUnique({
          where: {
            id: params.categoryId,
          },
        })
      : null;

  // get all billboards
  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
