/* eslint-disable @typescript-eslint/no-explicit-any */
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import SelectCollections from "@/components/forms/product/SelectCollections";
import PageSection from "@/components/ui/page-section";
import UploadSingleImage from "@/components/ui/single-image-upload";
import TextEditor from "@/components/ui/text-editor";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import {} from "@/redux/features/collection/collection.api";
import { onClose } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCategoryFieldsValues } from "@repo/utils/types";
import { createCategorySchema, createProductSchema } from "@repo/utils/zod-schemas";
import { FC, useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type TCategoryFormProps = {
  isInModal?: boolean;
  productForm?: UseFormReturn<z.infer<typeof createProductSchema>>;
  imgUrl?: string;
  defaultValues?: TCategoryFieldsValues;
  isLoading?: boolean;
  title: string;
};

const CategoryForm: FC<TCategoryFormProps> = ({
  isInModal,
  productForm,
  imgUrl = "",
  defaultValues,
  isLoading,
  title,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createCategory] = useCreateCategoryMutation();

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
  });

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).map(([key, value]) => form.setValue(key as keyof TCategoryFieldsValues, value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title={title} size={"sm"} action={<Action />} isInModal={isInModal}>
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
                      <UploadSingleImage url={imgUrl} fieldValue={""} fieldName="image" setValue={form.setValue} />
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

export default CategoryForm;
