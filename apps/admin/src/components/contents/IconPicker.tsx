import IconLoader from "@/pages/icon-loader";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SearchInput from "../ui/search-input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Icon from "../ui/lucide-icon";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useGetAllIconsQuery } from "@/redux/features/icon/icon.api";
import queryString from "query-string";
import debounce from "@/lib/debounce";
import { selectSearchTerm, updateSearchTerm } from "@/redux/features/filter/filterSlice";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { createCollectionSchema } from "@repo/utils/zod-schemas";
import { TIcon } from "@repo/utils/types";

type TIconPickerProps = {
  setValue: UseFormSetValue<z.infer<typeof createCollectionSchema>>;
};

const IconPicker: FC<TIconPickerProps> = ({ setValue }) => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);
  const [iconName, setIconName] = useState("");
  const [skip, setSkip] = useState(true);
  const [page, setPage] = useState(1);
  const query = queryString.stringify({
    searchTerm,
    sort: "name",
    limit: 100,
    page,
  });
  const { data, isFetching } = useGetAllIconsQuery(query, { skip });

  const icons: TIcon[] = data?.data || [];

  const onSetSearchTerm = (...args: unknown[]) => {
    const searchTerm = (args[0] as ChangeEvent<HTMLInputElement>).target.value;
    dispatch(updateSearchTerm(searchTerm));
  };

  const debouncedSearchTerm = debounce(onSetSearchTerm, 1000);

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button value={"Select icon"} variant={"outline"} role="combobox" className={cn("w-full justify-start")}>
            {iconName ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Icon name={iconName as any} />
            ) : (
              "Select icon"
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="mb-4 max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width]">
        <SearchInput>
          <Input className="h-9 pl-8" placeholder="Search" onChange={debouncedSearchTerm} />
        </SearchInput>
        <Command>
          <CommandEmpty className={cn(isFetching && "hidden", "mt-6 text-center")}>No icons founded.</CommandEmpty>
          <CommandGroup>
            <div className="custom-scrollbar max-h-[200px] overflow-y-scroll">
              {isFetching ? (
                <IconLoader />
              ) : (
                <div className="flex flex-wrap gap-4 py-4">
                  {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    icons.map((icon: any) => {
                      return (
                        <CommandItem
                          key={icon._id}
                          onSelect={() => {
                            setValue("icon", icon._id);
                            setIconName(icon.name);
                          }}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant={"outline"} size={"icon"} className="bg-muted">
                                  <Icon name={icon?.name} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{(icon?.name as string).split("-").join(" ")}</p>
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
              {!isFetching && data?.meta && data?.meta?.total > 100 ? (
                <div className="flex justify-center">
                  <div className="mt-4 space-x-4">
                    <Button disabled={page <= 1} onClick={() => setPage(page - 1)} variant={"outline"} size={"icon"}>
                      <FaAngleLeft />
                    </Button>
                    <Button className="bg-muted text-xl" size={"icon"} variant={"outline"} disabled={true}>
                      {page}
                    </Button>
                    <Button
                      disabled={data?.meta && page >= data?.meta?.totalPage}
                      onClick={() => setPage(page + 1)}
                      variant={"outline"}
                      size={"icon"}
                    >
                      <FaAngleRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
