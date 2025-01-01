import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import AddVariant from "@/components/forms/product/AddVariant";
import SelectBrand from "@/components/forms/product/SelectBrand";
import SelectCategories from "@/components/forms/product/SelectCategories";
import SelectCollections from "@/components/forms/product/SelectCollections";
import SelectTags from "@/components/forms/product/SelectTags";
import UploadSingleImage from "@/components/ui/image-upload";
import PageSection from "@/components/ui/page-section";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TextEditor from "@/components/ui/text-editor";
import { ProductStatus, ProductUnit } from "@/constant/product.constant";
import { setIsDirty } from "@/redux/features/header/header-slice";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@repo/utils/zod-schemas";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const AddProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createProduct] = useCreateProductMutation();

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      compare_price: undefined,
      description: undefined,
      media: undefined,
      price: undefined,
      quantity: undefined,
      status: undefined,
      title: undefined,
      unit: undefined,
      variants: undefined,
      weight: undefined,
    },
  });

  // on submit handler
  const onSubmit = async (data: z.infer<typeof createProductSchema>) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createProduct(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        navigate("/products/list");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };
  const isDirty = form.formState.isDirty;

  useEffect(() => {
    if (isDirty) {
      dispatch(setIsDirty(true));
    } else {
      dispatch(setIsDirty(false));
    }
  }, [dispatch, isDirty]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page size={"sm"} title="Create Product" action={<Action />}>
          {/* form content */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="space-y-6 lg:w-[66%]">
              {/* basic info */}
              <PageSection className="space-y-4">
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
              </PageSection>

              {/* media */}
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

              {/* Pricing */}
              <PageSection title="Pricing">
                <div className="mt-2 flex space-x-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400]">Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="compare_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400]">Compare price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </PageSection>

              {/* Inventory */}
              <PageSection title="Inventory">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-[200px]">
                      <FormLabel className="font-[200]">Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </PageSection>

              {/* Shipping */}
              <PageSection title="Shipping">
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[200]">Weight</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem className="w-[200px]">
                        <FormLabel className="font-[200]">Unit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ProductUnit?.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </PageSection>

              {/* Variants */}
              <PageSection title="Variants">
                <FormField
                  control={form.control}
                  name="variants"
                  render={() => (
                    <FormItem className="mt-2">
                      <AddVariant form={form} />
                    </FormItem>
                  )}
                />
              </PageSection>
            </div>
            {/* right side */}
            <div className="space-y-6 lg:flex-grow">
              {/* status */}
              <PageSection>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ProductStatus?.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </PageSection>

              <PageSection
                title="Product organization
"
              >
                <SelectCollections form={form} />
                <SelectCategories form={form} />
                <SelectBrand form={form} />
                <SelectTags form={form} />
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
