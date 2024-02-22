// import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CheckIcon } from "lucide-react";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";

// Define modules and formats for React Quill
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

// Define form schema using Zod
const formSchema = z.object({
  name: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 4 characters.",
  }),
  brand: z.string(),
});

const AddProductForm = () => {
  const { data } = useGetAllBrandsQuery(undefined);

  const brands: { _id: string; name: string }[] = data?.data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
    },
  });

  // Define submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // const [description, setDescription] = useState("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="border p-4 rounded-md w-[65%]">
          {/* product name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address." {...field} />
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
                    // style={{ height: "100px" }}
                    modules={modules}
                    formats={formats}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats} 
            />
          </div> */}

          {/* product brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Brand</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? brands.find((brand) => brand._id === field.value)
                              ?.name
                          : "Select Brand"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search brand..."
                        className="h-9"
                      />
                      <CommandEmpty>No brand found.</CommandEmpty>
                      <CommandGroup>
                        {brands?.map((brand) => (
                          <CommandItem
                            value={brand.name}
                            key={brand._id}
                            onSelect={() => {
                              form.setValue("brand", brand._id);
                            }}
                          >
                            {brand.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                brand._id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
