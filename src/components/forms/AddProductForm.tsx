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

const AddProductForm = () => {
  const { data } = useGetAllBrandsQuery(undefined);

  const [createBrand] = useCreateBrandMutation();

  const brands: { _id: string; name: string }[] = data?.data;

  const form = useForm<TProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
    },
    shouldUnregister: false,
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
        </section>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
