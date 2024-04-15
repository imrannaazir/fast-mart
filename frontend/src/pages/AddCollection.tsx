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
import { createCollectionValidationSchema } from "@/schemas/contents.schemas";
import ReactQuill from "react-quill";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateCollectionMutation } from "@/redux/features/collection/collection.api";
import { useNavigate } from "react-router-dom";
import IconPicker from "@/components/contents/IconPicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadCollectionImage from "@/components/contents/UploadCollectionImage";

const AddCollectionPage = () => {
  const navigate = useNavigate();

  const [createCollection] = useCreateCollectionMutation();

  const form = useForm<z.infer<typeof createCollectionValidationSchema>>({
    resolver: zodResolver(createCollectionValidationSchema),
  });

  // on submit handler
  const onSubmit = async (
    data: z.infer<typeof createCollectionValidationSchema>
  ) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createCollection(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        navigate("/contents/collections");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Collection" action={<Action />}>
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
                    <ReactQuill
                      style={{ height: "200px", marginBottom: "50px" }}
                      formats={formats}
                      modules={modules}
                      {...field}
                    />
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
            </div>
            {/* right side */}
            <div className=" flex-grow  ">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem className="relative">
                    <FormLabel>Image</FormLabel>
                    <UploadCollectionImage setValue={form.setValue} />
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
