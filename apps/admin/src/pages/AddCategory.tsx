/* eslint-disable @typescript-eslint/no-explicit-any */
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import SelectCollections from "@/components/forms/product/SelectCollections";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import TextEditor from "@/components/ui/text-editor";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import {} from "@/redux/features/collection/collection.api";
import { onClose } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, createProductSchema } from "@repo/utils/zod-schemas";
import { FC } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type TAddCategoryPageProps = {
  isInModal?: boolean;
  productForm?: UseFormReturn<z.infer<typeof createProductSchema>>;
};

const AddCategoryPage: FC<TAddCategoryPageProps> = ({ isInModal, productForm }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createCategory] = useCreateCategoryMutation();

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
  });

  // on submit handler
  const onSubmit = async (data: z.infer<typeof createCategorySchema>) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createCategory(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        form.reset();
        if (isInModal && productForm) {
          productForm.setValue("categories", [...(productForm.watch("categories") || []), response?.data?._id]);
          dispatch(onClose());
        } else {
          navigate("/contents/categories");
        }
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Category" size={"sm"} action={<Action />} isInModal={isInModal}>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="lg:w-[66%]">
              <PageSection>
                {/* title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Packaged, Fresh Fruits" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* collection */}
                <SelectCollections form={form as any} />
                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <TextEditor setValue={form.setValue} value={field.value || ""} />
                    </FormItem>
                  )}
                />
              </PageSection>{" "}
            </div>
            {/* right side */}
            <div className="flex-grow">
              <PageSection>
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem className="relative">
                      <FormLabel>Image</FormLabel>
                      <UploadSingleImage fieldValue={""} fieldName="image" setValue={form.setValue} />
                    </FormItem>
                  )}
                />
              </PageSection>
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

export default AddCategoryPage;
