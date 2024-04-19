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

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import {
  TProductFormValues,
  createProductValidationSchema,
} from "@/schemas/product.schema";
import TextEditor from "@/components/ui/text-editor";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();

  const form = useForm<TProductFormValues>({
    resolver: zodResolver(createProductValidationSchema),
  });

  // on submit handler
  const onSubmit = async (data: TProductFormValues) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createProduct(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        navigate("/products");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };
  console.log(form.watch("media"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Product" action={<Action />}>
          {/* form content */}
          <div className="flex gap-4">
            <div className="w-[66%] space-y-6">
              <PageSection>
                {/* title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Fruits, Vegetables"
                          {...field}
                        />
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
                      <TextEditor
                        setValue={form.setValue}
                        value={field.value || ""}
                      />
                    </FormItem>
                  )}
                />
              </PageSection>
              <PageSection>
                <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Media</FormLabel>
                      <UploadSingleImage
                        fieldName="media"
                        setValue={form.setValue}
                        type="multi"
                        fieldValue={field.value || []}
                      />
                    </FormItem>
                  )}
                />
              </PageSection>
            </div>
            {/* right side */}
            <div className=" flex-grow  ">
              <PageSection>
                <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Media </FormLabel>
                      <UploadSingleImage
                        type="multi"
                        fieldName="media"
                        setValue={form.setValue}
                        fieldValue={field.value || []}
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

export default AddProductPage;
