import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import IconPicker from "@/components/contents/IconPicker";
import PageSection from "@/components/ui/page-section";
import UploadSingleImage from "@/components/ui/single-image-upload";
import TextEditor from "@/components/ui/text-editor";
import { cn } from "@/lib/utils";
import { useCreateCollectionMutation } from "@/redux/features/collection/collection.api";
import { onClose } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCollectionSchema, createProductSchema } from "@repo/utils/zod-schemas";
import { FC } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type AddCollectionPageProps = {
  isInModal?: boolean;
  imgUrl: string;
  productForm?: UseFormReturn<z.infer<typeof createProductSchema>>;
};

const AddCollectionPage: FC<AddCollectionPageProps> = ({ isInModal = false, productForm, imgUrl }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createCollection] = useCreateCollectionMutation();

  const form = useForm<z.infer<typeof createCollectionSchema>>({
    resolver: zodResolver(createCollectionSchema),
  });

  // on submit handler
  const onSubmit = async (data: z.infer<typeof createCollectionSchema>) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createCollection(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        form.reset();
        if (isInModal && productForm) {
          productForm.setValue("collections", [...(productForm?.watch("collections") || []), response.data._id]);
          dispatch(onClose());
        } else {
          navigate("/contents/collections");
        }
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page size={"sm"} title="Create Collection" action={<Action />} isInModal={isInModal}>
          {/* form content */}
          <div className={cn(isInModal ? "my-4 flex justify-end" : "hidden")}>
            <Action />
          </div>
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
                        <Input placeholder="e.g. Fruits, Vegetables" {...field} />
                      </FormControl>
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
                      <TextEditor setValue={form.setValue} value={field.value || ""} />
                    </FormItem>
                  )}
                />

                {/* icon */}
                <FormField
                  control={form.control}
                  name="icon"
                  render={() => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <IconPicker setValue={form.setValue} />
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

export default AddCollectionPage;
