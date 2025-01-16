import Page from "@/components/layout/Page";
import BrandFormSkeleton from "@/components/skeletons/brand-form-skeleton";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import PageSection from "@/components/ui/page-section";
import UploadSingleImage from "@/components/ui/single-image-upload";
import TextEditor from "@/components/ui/text-editor";
import { cn } from "@/lib/utils";
import { useCreateBrandMutation } from "@/redux/features/brand/brandApi";
import { onClose } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBrandFieldValues } from "@repo/utils/types";
import { createBrandSchema, createProductSchema } from "@repo/utils/zod-schemas";
import { FC, useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
type TBrandFormProps = {
  isInModal?: boolean;
  productForm?: UseFormReturn<z.infer<typeof createProductSchema>>;
  coverImageUrl?: string;
  logoUrl?: string;
  defaultValues?: TBrandFieldValues;
  isLoading?: boolean;
  title: string;
};
const BrandForm: FC<TBrandFormProps> = ({
  isInModal,
  productForm,
  logoUrl = "",
  coverImageUrl = "",
  defaultValues,
  isLoading,
  title,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createBrand] = useCreateBrandMutation();

  const form = useForm<z.infer<typeof createBrandSchema>>({
    resolver: zodResolver(createBrandSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).map(([key, value]) => form.setValue(key as keyof TBrandFieldValues, value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  // on submit handler
  const onSubmit = async (data: z.infer<typeof createBrandSchema>) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createBrand(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        form.reset();
        if (isInModal && productForm) {
          productForm?.setValue("brand", response.data._id);
          dispatch(onClose());
        } else {
          navigate("/contents/brands");
        }
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  if (isLoading) {
    return <BrandFormSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title={title} size={"sm"} action={<Action />} isInModal={isInModal}>
          <div className={cn(isInModal ? "my-4 flex justify-end" : "hidden")}>
            <Action />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="lg:w-[66%]">
              <PageSection>
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Fresh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* slogan */}
                <FormField
                  control={form.control}
                  name="slogan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slogan</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Let's make it healthy" {...field} />
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
              </PageSection>
            </div>
            {/* right side */}
            <div className="flex-grow space-y-6">
              <PageSection>
                {/* logo */}
                <FormField
                  control={form.control}
                  name="logo"
                  render={() => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <UploadSingleImage
                        url={logoUrl}
                        fieldValue={""}
                        setValue={form.setValue}
                        className=" "
                        fieldName="logo"
                      />
                    </FormItem>
                  )}
                />
              </PageSection>
              <PageSection>
                {/* Cover image*/}
                <FormField
                  control={form.control}
                  name="cover_photo"
                  render={() => (
                    <FormItem>
                      <FormLabel>Cover image</FormLabel>
                      <UploadSingleImage
                        url={coverImageUrl}
                        fieldValue={""}
                        setValue={form.setValue}
                        fieldName="cover_photo"
                      />
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

export default BrandForm;
