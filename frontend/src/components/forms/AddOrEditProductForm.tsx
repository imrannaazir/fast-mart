/* eslint-disable react-hooks/exhaustive-deps */
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
  addOrEditProductFormSchema,
} from "../../schemas/ZodValidationSchema";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/category/categoryApi";
import {
  useCreateConnectivityMutation,
  useGetAllConnectivityQuery,
} from "@/redux/features/connectivity/connectivityApi";
import {
  useCreatePowerSourcesMutation,
  useGetAllPowerSourcesQuery,
} from "@/redux/features/powerSource/powerSourceApi";
import {
  useCreateOperatingSystemsMutation,
  useGetAllOperatingSystemsQuery,
} from "@/redux/features/operatingSystem/operatingSystemApi";
import {
  useCreateTagMutation,
  useGetAllTagQuery,
} from "@/redux/features/tag/tagApi";
import TagInput from "./TagInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearSelectedTags,
  getAllTags,
  removeTag,
  selectSelectedTags,
  selectTags,
} from "@/redux/features/tag/tagSlice";
import { FC, useEffect, useState } from "react";
import {
  useCreateFeatureNameMutation,
  useGetAllFeatureNamesQuery,
} from "@/redux/features/featureName/featureNameApi";
import { Label } from "../ui/label";
import Modal from "../ui/modal";
import {
  onClose,
  selectCollectionName,
  selectIsOpen,
} from "@/redux/features/modal/modalSlice";
import CreateCollectionForm from "./CreateCollectionForm";
import { TCreateCollection } from "@/types/rtkQuery.type";
import { camelCaseToWords } from "@/lib/utils";
import {
  assignFeatureName,
  clearSelectedFeatureName,
  getAllFeatureNames,
  selectFeatureNames,
  selectSelectedFeatureNames,
} from "@/redux/features/featureName/featureNameSlice";
import AddedFeature from "./AddedFeature";
import { X } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import {
  TAllKeyOfProduct,
  TAllValueOfProduct,
  TCollection,
} from "@/types/product.type";
import { useNavigate } from "react-router-dom";
import { selectDefaultProductValues } from "@/redux/features/product/productSlice";

type AddOrEditProductFormProps = {
  productIdToUpdate?: string;
};

const AddOrEditProductForm: FC<AddOrEditProductFormProps> = ({
  productIdToUpdate,
}) => {
  const defaultProductValues = useAppSelector(selectDefaultProductValues);
  const [defaultValues, setDefaultValues] = useState(defaultProductValues);

  useEffect(() => {
    setDefaultValues(defaultProductValues);
    for (const [key, value] of Object.entries(defaultProductValues)) {
      form.setValue(key as TAllKeyOfProduct, value as TAllValueOfProduct);
    }
  }, [defaultProductValues]);

  //local state
  const [needUpdate, setNeedUpdate] = useState(false);
  const [featureValue, setFeatureValue] = useState("");

  // invoked hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedTags = useAppSelector(selectSelectedTags);
  const allFeatureNames = useAppSelector(selectFeatureNames);
  const selectedFeatureNames = useAppSelector(selectSelectedFeatureNames);
  const isOpen = useAppSelector(selectIsOpen);
  const allTags = useAppSelector(selectTags);
  const selectedCollectionName = useAppSelector(selectCollectionName);

  // mutation api hook
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  // query api hook
  const { data } = useGetAllBrandsQuery(undefined);
  const [createBrand] = useCreateBrandMutation();

  const { data: categoryData } = useGetAllCategoriesQuery(undefined);
  const [createCategory] = useCreateCategoryMutation();

  const { data: connectivityData } = useGetAllConnectivityQuery(undefined);
  const [createConnectivity] = useCreateConnectivityMutation();

  const { data: powerSourceData } = useGetAllPowerSourcesQuery(undefined);
  const [createPowerSource] = useCreatePowerSourcesMutation();

  const { data: operatingSystemData } =
    useGetAllOperatingSystemsQuery(undefined);
  const [createOperatingSystem] = useCreateOperatingSystemsMutation();

  const { data: tagData } = useGetAllTagQuery(undefined);
  const [createTag] = useCreateTagMutation();

  const { data: featuresNamesData } = useGetAllFeatureNamesQuery(undefined);
  const [createFeatureName] = useCreateFeatureNameMutation();

  const brands: TCollection[] = data?.data;
  const categories: TCollection[] = categoryData?.data;
  const connectivity: TCollection[] = connectivityData?.data;
  const powerSources: TCollection[] = powerSourceData?.data;
  const operatingSystems: TCollection[] = operatingSystemData?.data;
  const tags: TCollection[] = tagData?.data;
  const featureNames: TCollection[] = featuresNamesData?.data;

  // save all tags in the redux store
  useEffect(() => {
    if (tags && selectedTags) {
      dispatch(getAllTags({ tags, selectedTags }));
    }
    if (featureNames && selectedFeatureNames) {
      dispatch(getAllFeatureNames({ featureNames, selectedFeatureNames }));
    }
  }, [tags, selectedTags, featureNames, selectedFeatureNames]);

  let createCollection: TCreateCollection | null;
  switch (selectedCollectionName) {
    case "brand":
      createCollection = createBrand as TCreateCollection;
      break;
    case "category":
      createCollection = createCategory as TCreateCollection;
      break;
    case "connectivity":
      createCollection = createConnectivity as TCreateCollection;
      break;
    case "powerSource":
      createCollection = createPowerSource as TCreateCollection;
      break;
    case "operatingSystem":
      createCollection = createOperatingSystem as TCreateCollection;
      break;
    case "tags":
      createCollection = createTag as TCreateCollection;
      break;
    case "featureName":
      createCollection = createFeatureName as TCreateCollection;
      break;

    default:
      createCollection = null;
      break;
  }

  const form = useForm<TProductFormValues>({
    resolver: zodResolver(addOrEditProductFormSchema),
    defaultValues,
    mode: "onChange",
  });
  // Define submit handler
  async function onSubmit(data: z.infer<typeof addOrEditProductFormSchema>) {
    const loadingMessage =
      productIdToUpdate && needUpdate
        ? "Updating product."
        : productIdToUpdate && !needUpdate
        ? "Making a copy."
        : "Creating new product.";
    const successMessage =
      productIdToUpdate && needUpdate
        ? "Product updated."
        : productIdToUpdate && !needUpdate
        ? "Product duplicated."
        : "Product created.";
    const errorMessage =
      productIdToUpdate && needUpdate
        ? "Failed to update product."
        : productIdToUpdate && !needUpdate
        ? "Failed to duplicate product."
        : "Failed to create product.";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { featureName, price, quantity, weight, name, ...productData } = data;
    const toastId = toast.loading(loadingMessage, {
      duration: 2000,
    });

    const payload = {
      ...productData,
      name:
        productIdToUpdate &&
        !needUpdate &&
        defaultValues.name === form.getValues("name")
          ? `${name} (copy)`
          : name,
      price: Number(price),
      quantity: Number(quantity),
      weight: Number(weight),
    };

    try {
      let response;
      if (productIdToUpdate && needUpdate) {
        response = await updateProduct({
          productId: productIdToUpdate,
          data: payload,
        }).unwrap();
      } else {
        response = await createProduct(payload).unwrap();
      }
      if (response.success) {
        const responseProductId = response.data._id;
        const redirectUrl =
          responseProductId && !needUpdate && productIdToUpdate
            ? `/update-product/${responseProductId}`
            : !productIdToUpdate && !needUpdate
            ? "/product-list"
            : "";
        // form.reset();
        dispatch(clearSelectedFeatureName());
        dispatch(clearSelectedTags());
        toast.success(successMessage, { id: toastId });

        if (redirectUrl) {
          navigate(redirectUrl);
        }
      }
    } catch (error) {
      toast.error(errorMessage, { id: toastId });
    }
  }

  //submitted features
  const submittedFeatures = form.watch("features");

  // handle add new feature
  const handleAddFeature = () => {
    const allFeatures = { ...submittedFeatures };

    const featureName = form.getValues("featureName");
    if (featureName && featureValue) {
      const selectedFeatureName = featureNames?.find(
        (featureNameVal) => featureNameVal._id === featureName
      );

      if (selectedFeatureName) {
        allFeatures[selectedFeatureName?.name] = featureValue;
      }
      dispatch(assignFeatureName(selectedFeatureName));
    }
    form.setValue("features", allFeatures);
    form.setValue("featureName", "");
    setFeatureValue("");
  };

  // features content to render
  let featuresContent = null;
  featuresContent = Object?.entries(submittedFeatures)?.map(
    ([key, value], index) => {
      return (
        <AddedFeature
          key={index}
          keyName={key}
          value={value}
          form={form}
          submittedFeatures={submittedFeatures}
        />
      );
    }
  );

  const productImage = form.watch("image");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl flex items-center gap-2 my-4">
              <FaArrowLeftLong size="15" />
              {productIdToUpdate ? "Update product" : "Add product"}
            </h1>

            <div className="space-x-4">
              <Button type="submit" variant={"outline"}>
                {" "}
                {productIdToUpdate ? "Duplicates" : "Publish"}
              </Button>
              {productIdToUpdate && (
                <Button onClick={() => setNeedUpdate(true)} type="submit">
                  Update
                </Button>
              )}
            </div>
          </div>

          {/*  */}
          <div className=" lg:flex gap-6">
            <div className="lg:w-[65%]">
              {/* product information */}
              <section className="border p-4 rounded-md  ">
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

                <div className=" flex flex-col lg:flex-row mt-32 lg:mt-16    gap-4">
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
                          createCollection={createBrand as TCreateCollection}
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
                          createCollection={createCategory as TCreateCollection}
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* Product Media */}
              <section className="border p-4 rounded-md mt-6">
                <h3 className="text-xl mb-6">Product Media</h3>
                {productImage && (
                  <div>
                    <img src={productImage} width="500" />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a product url." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              {/* Product features */}
              <section className="border p-4 rounded-md mt-6">
                <h3 className="text-xl mb-6">Product Features</h3>
                {/* all features   */}
                <div className="space-y-4">{featuresContent}</div>

                <div className="flex flex-col lg:flex-row  lg:items-center gap-4">
                  {/* Add product feature*/}
                  <FormField
                    control={form.control}
                    name="featureName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Feature name</FormLabel>
                        <SelectOrCreate
                          field={field}
                          form={form}
                          collections={allFeatureNames}
                          collectionName="featureName"
                          createCollection={
                            createFeatureName as TCreateCollection
                          }
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="featureValue">Feature value</Label>
                    <Input
                      value={featureValue}
                      type="text"
                      id="featureName"
                      placeholder="Enter value"
                      disabled={form.watch("featureName") === ""}
                      onChange={(e) => setFeatureValue(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAddFeature}
                    disabled={
                      form.watch("featureName") === "" || featureValue === ""
                    }
                    type="button"
                    className="mt-[22px]"
                  >
                    Add
                  </Button>
                </div>
              </section>
            </div>

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

                <div className=" flex flex-col lg:flex-row  gap-2 mt-4">
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
                          collections={operatingSystems}
                          collectionName="operatingSystem"
                          createCollection={
                            createOperatingSystem as TCreateCollection
                          }
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* product Power source */}
                  <FormField
                    control={form.control}
                    name="powerSource"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Power Source</FormLabel>
                        <SelectOrCreate
                          field={field}
                          form={form}
                          collections={powerSources}
                          collectionName="powerSource"
                          createCollection={
                            createPowerSource as TCreateCollection
                          }
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* connectivity */}
                <FormField
                  control={form.control}
                  name="connectivity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-4">
                      <FormLabel>Connectivity</FormLabel>
                      <SelectOrCreate
                        field={field}
                        form={form}
                        collections={connectivity}
                        collectionName="connectivity"
                        createCollection={
                          createConnectivity as TCreateCollection
                        }
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* tags */}
              <div className=" border p-4 rounded-md mt-6">
                <h3 className="text-xl mb-6">Related Tags</h3>
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      {selectedTags.length === 0 && <FormLabel>Tags</FormLabel>}
                      <div className="flex gap-2">
                        {selectTags.length !== 0 &&
                          selectedTags?.map((tag) => (
                            <Button
                              key={tag._id}
                              size={"sm"}
                              variant={"secondary"}
                              type="button"
                              className="flex items-center gap-2 "
                            >
                              {tag.name}

                              <X
                                onClick={() => {
                                  const tagValues = form.getValues("tags");
                                  const newTagValue = tagValues.filter(
                                    (tagVal) => tagVal !== tag._id
                                  );
                                  form.setValue("tags", newTagValue);
                                  dispatch(removeTag(tag));
                                }}
                                size={14}
                              />
                            </Button>
                          ))}
                      </div>
                      <TagInput
                        className="w-auto"
                        field={field}
                        form={form}
                        collections={allTags}
                        collectionName="tags"
                        createCollection={createTag as TCreateCollection}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
          </div>
        </form>
      </Form>

      <Modal
        title={`Create ${camelCaseToWords(selectedCollectionName as string)}`}
        description={`Add new ${camelCaseToWords(
          selectedCollectionName as string
        )} to add new products.`}
        isOpen={isOpen}
        onClose={() => dispatch(onClose())}
      >
        <CreateCollectionForm
          form={form}
          collectionName={selectedCollectionName as string}
          createCollection={createCollection as TCreateCollection}
        />
      </Modal>
    </>
  );
};

export default AddOrEditProductForm;