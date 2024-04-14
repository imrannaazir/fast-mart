import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/lucide-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from "@/components/ui/search-input";
import { formats, modules } from "@/constant/constant";
import { cn } from "@/lib/utils";
import { useGetAllIconsQuery } from "@/redux/features/icon/icon.api";
import { createCollectionValidationSchema } from "@/schemas/contents.schemas";
import { TIcon } from "@/types/collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommandEmpty } from "cmdk";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { z } from "zod";

const AddCollectionPage = () => {
  const [skip, setSkip] = useState(true);
  const query = queryString.stringify({
    limit: 100,
  });

  const { data, isFetching } = useGetAllIconsQuery(query, { skip });

  const form = useForm<z.infer<typeof createCollectionValidationSchema>>({
    resolver: zodResolver(createCollectionValidationSchema),
  });

  // on submit handler
  const onSubmit = (data: z.infer<typeof createCollectionValidationSchema>) => {
    console.log(data);
  };

  const icons: TIcon[] = data?.data || [];

  useEffect(() => {
    setSkip(false);
  }, [query]);
  console.log(icons[66]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Page title="Create Collection" action={<Action />}>
          {/* form content */}
          <div>
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
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Input
                            value={"Select icon"}
                            placeholder=""
                            role="combobox"
                            className={cn("w-full text-start")}
                          />
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] mb-4">
                        <SearchInput>
                          <Input
                            className="pl-8 h-9"
                            placeholder="Search"
                            // onChange={debouncedSearchTerm}
                          />
                        </SearchInput>
                        <Command>
                          <CommandEmpty>No icons founded.</CommandEmpty>
                          <CommandGroup>
                            <div className="flex py-4 gap-4 flex-wrap max-h-[200px] overflow-y-scroll">
                              {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                icons.map((icon: any) => {
                                  console.log(icon.name);

                                  return (
                                    <CommandItem className="border bg-muted  ">
                                      <Icon name={icon?.name} />
                                    </CommandItem>
                                  );
                                })
                              }
                            </div>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
