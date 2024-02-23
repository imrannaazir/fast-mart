import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
} from "@/redux/features/brand/brandApi";
import SelectOrCreate from "./SelectOrCreate";
import { formats, modules } from "@/constant/constant";
import {
  TProductFormValues,
  addProductFormSchema,
} from "./ZodValidationSchema";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/category/categoryApi";

type TCollections = { _id: string; name: string }[];
const AddProductForm = () => {
  const { data } = useGetAllBrandsQuery(undefined);
  const [createBrand] = useCreateBrandMutation();

  const { data: categoryData } = useGetAllCategoriesQuery(undefined);
  const [createCategory] = useCreateCategoryMutation();

  const brands: TCollections = data?.data;
  const categories: TCollections = categoryData?.data;

  const form = useForm<TProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
    },
  });

  // Define submit handler
  async function onSubmit(values: z.infer<typeof addProductFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="border p-4 rounded-md w-[65%]">
          {/* product name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* product description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <ReactQuill
                    // style={{ height: "100px" }}
                    modules={modules}
                    formats={formats}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" flex mt-4 gap-4">
            {/* product brand */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Brand</FormLabel>
                  <SelectOrCreate
                    field={field}
                    form={form}
                    collections={brands}
                    collectionName="brand"
                    createCollection={createBrand}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* product category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <SelectOrCreate
                    field={field}
                    form={form}
                    collections={categories}
                    collectionName="category"
                    createCollection={createCategory}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
