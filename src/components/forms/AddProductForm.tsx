import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { FaArrowLeftLong } from "react-icons/fa6";

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
        <div className="flex justify-between items-center">
          <h1 className="text-xl flex items-center gap-2 my-4">
            <FaArrowLeftLong size="15" />
            Add Product
          </h1>

          <Button type="submit">Publish</Button>
        </div>

        {/*  */}
        <div className=" flex gap-6">
          <section className="border p-4 rounded-md w-[65%]">
            <h3 className="text-xl mb-6">Product Information</h3>
            {/* product name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product title." {...field} />
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
                      style={{ height: "100px" }}
                      modules={modules}
                      formats={formats}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex mt-16 gap-4">
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

          {/* right side */}
          <section className=" w-auto flex-grow">
            <div className=" border p-4 rounded-md">
              <h3 className="text-xl mb-6">Inventory</h3>
              {/* product Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="Enter product quantity."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* product price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Enter product price."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                {/* product weight */}
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Enter product weight."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* product weight */}
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product weight unit."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* basic information */}
            <div className=" border p-4 rounded-md mt-6">
              <h3 className="text-xl mb-6">Basic Information</h3>
              {/* product dimensions */}
              <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensions</FormLabel>
                    <FormControl>
                      <Input placeholder="H x W x D" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" flex  gap-2 mt-2">
                {/* product operatingSystem */}
                <FormField
                  control={form.control}
                  name="operatingSystem"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Operating System</FormLabel>
                      <SelectOrCreate
                        field={field}
                        form={form}
                        collections={brands}
                        collectionName="operatingSystem"
                        createCollection={createBrand}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* product category */}
                <FormField
                  control={form.control}
                  name="powerSource"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Power Source</FormLabel>
                      <SelectOrCreate
                        field={field}
                        form={form}
                        collections={categories}
                        collectionName="powerSource"
                        createCollection={createCategory}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </section>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
