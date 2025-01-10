import { cn } from "@/lib/utils";
import { createCollectionSchema } from "@repo/utils/zod-schemas";
import * as LucidIcons from "lucide-react";
import { ChevronLeft, ChevronRight, icons } from "lucide-react";
import { FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import Icon from "../ui/lucide-icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import SearchInput from "../ui/search-input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type TIconPickerProps = {
  setValue: UseFormSetValue<z.infer<typeof createCollectionSchema>>;
  iconName: string;
};

const IconPicker: FC<TIconPickerProps> = ({ setValue, iconName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const skip = (page - 1) * 100;
  const iconList = Object?.entries(icons)
    ?.map(([name]) => name)
    ?.filter((name) => name?.toLowerCase()?.includes(searchTerm?.trim()?.toLowerCase()))
    ?.slice(skip, skip + 100);

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
      <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width]">
        <div className="flex gap-4">
          <SearchInput>
            <Input
              value={searchTerm}
              className="h-9 pl-8"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
          <div className="flex gap-2 *:h-9 *:w-9">
            <Button disabled={page < 2} onClick={() => setPage(page - 1)} variant="outline" size="icon">
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setPage(page + 1)}>
              <ChevronRight />
            </Button>
          </div>
        </div>

        <Command>
          <CommandEmpty className={cn("mt-6 text-center")}>No icons founded.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-64 w-full rounded-md">
              <div className="flex flex-wrap justify-between">
                {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                iconList?.slice(0, 100)?.map((icon) => {
                  return (
                    <CommandItem
                      key={icon}
                      onSelect={() => {
                        setValue("icon", icon);
                      }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={iconName === icon ? "default" : "outline"}
                              size={"icon"}
                              className={iconName === icon ? "" : "bg-muted"}
                            >
                              <Icon name={icon as keyof typeof LucidIcons.icons} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{icon}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CommandItem>
                  );
                })}
              </div>
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
