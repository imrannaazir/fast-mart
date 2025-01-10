import { Check, CheckIcon, ChevronsUpDown, Loader2, PlusCircle } from "lucide-react";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TLabelValuePair } from "@/types";
import { ClassValue } from "clsx";
import { Badge } from "./badge";
import { Label } from "./label";
type TOptionSelector = {
  options: TLabelValuePair[];
  setValue: (value: string | string[]) => void;
  onAdd: () => void;
  value: string | string[];
  type?: "single" | "multi";
  isDisable?: boolean;
  label: string;
  isLoading?: boolean;
  width?: "w-[200px]" | "w-full";
  className?: ClassValue;
};

const OptionSelector: FC<TOptionSelector> = ({
  options,
  setValue,
  value,
  type = "single",
  isDisable = false,
  isLoading = false,
  label,
  onAdd,
  width = "w-[200px]",
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <Label className="font-extralight">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {
            <Button disabled={isDisable} variant={"outline"} role="combobox" className={cn("justify-between", width)}>
              {value && type === "single" ? (
                <Badge variant={"secondary"} className="rounded-sm px-1 font-normal">
                  {options.find((option) => option.value === value)?.label}
                </Badge>
              ) : value && type === "multi" && typeof value === "object" && value.length ? (
                <div className="space-x-2">
                  {value?.map((item) => {
                    const optionName = options.find((option) => option.value === item)?.label;
                    return (
                      <Badge variant={"secondary"} key={item} className="rounded-sm px-1 font-normal">
                        {optionName}
                      </Badge>
                    );
                  })}
                </div>
              ) : (
                "Select option"
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          }
        </PopoverTrigger>
        <PopoverContent className={cn("p-0", width)} align="start">
          <Command>
            <CommandInput placeholder="Search options" />
            <CommandList>
              <CommandGroup>
                {/*add new option button  */}
                <CommandItem>
                  <button className="flex w-full items-center space-x-2" type="reset" onClick={onAdd}>
                    <PlusCircle className="mr-2 h-4 w-4 text-gray-500" />
                    Add{" "}
                  </button>
                </CommandItem>
                {/* loader  */}
                <CommandItem className={cn(isLoading ? "flex items-center justify-center gap-2" : "hidden")}>
                  Loading <Loader2 className="h-4 w-4 animate-spin" />
                </CommandItem>

                {!options?.length && <p className="px-2 py-2 text-center">{`No ${label?.toLowerCase()}.`}</p>}
                {/* mapping options */}

                <div className={cn(isLoading ? "hidden" : "block")}>
                  {options?.map((option) => {
                    let isSelected = false;

                    if (type === "multi") {
                      isSelected = (value as string[])?.find((item) => item === option.value) ? true : false;
                    } else {
                      isSelected = option.value === value ? true : false;
                    }
                    return (
                      <CommandItem
                        className="cursor-pointer"
                        key={option.value}
                        onSelect={() => {
                          if (isSelected) {
                            if (type === "single") {
                              setOpen(false);
                            } else {
                              const filteredOption = (value as string[]).filter((item) => item !== option.value);
                              setValue(filteredOption);
                            }
                          } else {
                            if (type === "multi") {
                              value.length ? setValue([...value, option.value]) : setValue([option.value]);
                            } else {
                              setValue(option.value);
                              setOpen(false);
                            }
                          }
                        }}
                      >
                        {type === "single" ? (
                          <div className="flex items-center">
                            <Check
                              className={cn("mr-2 h-3 w-3 text-gray-500", isSelected ? "opacity-100" : "opacity-0")}
                            />
                            {option.label}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "border-primary mr-2 flex h-4 w-4 items-center rounded-sm border",
                                isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <CheckIcon />
                            </div>
                            {option.label}
                          </div>
                        )}
                      </CommandItem>
                    );
                  })}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default OptionSelector;
