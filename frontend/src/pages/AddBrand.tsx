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
import { createBrandValidationSchema } from "@/schemas/contents.schemas";
import ReactQuill from "react-quill";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBrandMutation } from "@/redux/features/brand/brandApi";
import UploadSingleImage from "@/components/ui/image-upload";

const AddBrandPage = () => {
  const navigate = useNavigate();
  const [createBrand] = useCreateBrandMutation();

  const form = useForm<z.infer<typeof createBrandValidationSchema>>({
    resolver: zodResolver(createBrandValidationSchema),
  });

  // on submit handler
  const onSubmit = async (
    data: z.infer<typeof createBrandValidationSchema>
  ) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    try {
      const response = await createBrand(data).unwrap();

      if (response.success) {
        toast.success("Created.", { id: toastId });
        navigate("/contents/brands");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create brand" action={<Action />}>
          {/* form content */}
          <div className="flex gap-4">
            <div className="w-[66%]">
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
                      <Input
                        placeholder="e.g. Let's make it healthy"
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
              {/* logo */}
              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <UploadSingleImage
                      setValue={form.setValue}
                      className="w-[200px]"
                      fieldName="logo"
                    />
                  </FormItem>
                )}
              />
              {/* Cover image*/}
              <FormField
                control={form.control}
                name="cover_photo"
                render={() => (
                  <FormItem>
                    <FormLabel>Cover image</FormLabel>
                    <UploadSingleImage
                      setValue={form.setValue}
                      fieldName="cover_image"
                    />
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

export default AddBrandPage;
