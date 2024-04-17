import Page from "@/components/layout/Page";
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

import { formats, modules } from "@/constant/constant";
import { createCategoryValidationSchema } from "@/schemas/contents.schemas";
import ReactQuill from "react-quill";
import { z } from "zod";
import { toast } from "sonner";
import {
  useCreateCollectionMutation,
  useGetAllCollectionsQuery,
} from "@/redux/features/collection/collection.api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImagePicker from "@/components/contents/ImagePicker";
import SelectOrCreate from "@/components/forms/SelectOrCreate";
import { TCreateCollection } from "@/types/rtkQuery.type";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";

const AddCollectionPage = () => {
  const navigate = useNavigate();

  const [createCollection] = useCreateCollectionMutation();
  const [createCategory] = useCreateCategoryMutation();
  const { data: collectionData } = useGetAllCollectionsQuery(undefined);

  const form = useForm<z.infer<typeof createCategoryValidationSchema>>({
    resolver: zodResolver(createCategoryValidationSchema),
  });

  // on submit handler
  const onSubmit = async (
    data: z.infer<typeof createCategoryValidationSchema>
  ) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createCategory(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        navigate("/contents/categories");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  const collections =
    collectionData?.data?.map((collection) => ({
      name: collection.title,
      _id: collection._id,
      iconName: collection.icon?.name,
    })) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Category" action={<Action />}>
          {/* form content */}
          <div className="flex gap-4">
            <div className="w-[66%]">
              {/* title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Packaged, Fresh Fruits"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* collection */}
              <FormField
                control={form.control}
                name="collection"
                render={({ field }) => (
                  <FormItem className="flex flex-col  mt-2">
                    <FormLabel>Collection</FormLabel>
                    <SelectOrCreate
                      field={field}
                      form={form}
                      collections={collections}
                      collectionName="collection"
                      createCollection={createCollection as TCreateCollection}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <ReactQuill
                      style={{ height: "200px", marginBottom: "50px" }}
                      formats={formats}
                      modules={modules}
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </div>
            {/* right side */}
            <div className=" flex-grow  ">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem className="relative">
                    <FormLabel>Image</FormLabel>
                    <ImagePicker setValue={form.setValue} fieldName="image" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Page>
      </form>
    </Form>
  );
};

const Action = () => {
  return <Button size={"sm"}>Save</Button>;
};

export default AddCollectionPage;
