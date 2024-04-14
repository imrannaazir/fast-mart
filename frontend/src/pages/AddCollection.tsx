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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formats, modules } from "@/constant/constant";
import { cn } from "@/lib/utils";
import { useGetAllIconsQuery } from "@/redux/features/icon/icon.api";
import { createCollectionValidationSchema } from "@/schemas/contents.schemas";
import { TIcon } from "@/types/collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommandEmpty } from "cmdk";
import queryString from "query-string";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { z } from "zod";
import IconLoader from "./icon-loader";
import debounce from "@/lib/debounce";
import {
  selectSearchTerm,
  updateSearchTerm,
} from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const AddCollectionPage = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);
  console.log(searchTerm);

  const [skip, setSkip] = useState(true);
  const [page, setPage] = useState(1);
  const query = queryString.stringify({
    searchTerm,
    sort: "name",
    limit: 100,
    page,
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

  const onSetSearchTerm = (...args: unknown[]) => {
    const searchTerm = (args[0] as ChangeEvent<HTMLInputElement>).target.value;
    dispatch(updateSearchTerm(searchTerm));
  };

  const debouncedSearchTerm = debounce(onSetSearchTerm, 1000);

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
                            onChange={debouncedSearchTerm}
                          />
                        </SearchInput>
                        <Command>
                          <CommandEmpty
                            className={cn(
                              isFetching && "hidden",
                              "text-center mt-6"
                            )}
                          >
                            No icons founded.
                          </CommandEmpty>
                          <CommandGroup>
                            <div className="max-h-[200px] overflow-y-scroll custom-scrollbar ">
                              {isFetching ? (
                                <IconLoader />
                              ) : (
                                <div className="flex py-4 gap-4 flex-wrap ">
                                  {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    icons.map((icon: any) => {
                                      return (
                                        <CommandItem className="  ">
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant={"outline"}
                                                  size={"icon"}
                                                  className="bg-muted"
                                                >
                                                  <Icon name={icon?.name} />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>
                                                  {(icon?.name as string)
                                                    .split("-")
                                                    .join(" ")}
                                                </p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </CommandItem>
                                      );
                                    })
                                  }
                                </div>
                              )}
                              {/* pagination */}
                              {!isFetching &&
                              data?.meta &&
                              data?.meta?.total > 100 ? (
                                <div className="flex  justify-center ">
                                  <div className=" space-x-4 mt-4">
                                    <Button
                                      disabled={page <= 1}
                                      onClick={() => setPage(page - 1)}
                                      variant={"outline"}
                                      size={"icon"}
                                    >
                                      <FaAngleLeft />
                                    </Button>
                                    <Button
                                      className="text-xl bg-muted"
                                      size={"icon"}
                                      variant={"outline"}
                                      disabled={true}
                                    >
                                      {page}
                                    </Button>
                                    <Button
                                      disabled={
                                        data?.meta &&
                                        page >= data?.meta?.totalPage
                                      }
                                      onClick={() => setPage(page + 1)}
                                      variant={"outline"}
                                      size={"icon"}
                                    >
                                      <FaAngleRight
                                        className="w-4 h-4
                                  "
                                      />
                                    </Button>
                                  </div>
                                </div>
                              ) : null}
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
