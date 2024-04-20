import { FC, useState } from "react";
import { Check, CheckIcon, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TLabelValuePair } from "@/types";
import { Badge } from "./badge";
import { Label } from "./label";
type TSelectTagOption = {
  options: TLabelValuePair[];
  setValue: (value: string | string[]) => void;
  onAdd: () => void;
  value: string | string[];
  type?: "single" | "multi";
  isDisable?: boolean;
  label: string;
};

const SelectTagOption: FC<TSelectTagOption> = ({
  options,
  setValue,
  value,
  type = "single",
  isDisable = false,
  label,
  onAdd,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <Label className="font-extralight">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {
            <Button
              disabled={isDisable}
              variant={"outline"}
              role="combobox"
              className="w-[200px] justify-between"
            >
              {value && type === "single" ? (
                options.find((option) => option.value === value)?.label
              ) : value &&
                type === "multi" &&
                typeof value === "object" &&
                value.length ? (
                <div className="space-x-2">
                  {value.map((item) => {
                    const optionName = options.find(
                      (option) => option.value === item
                    )?.label;
                    return (
                      <Badge
                        variant={"secondary"}
                        key={item}
                        className="rounded-sm px-1 font-normal"
                      >
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
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search options" />
            <CommandList>
              <CommandEmpty> No result</CommandEmpty>
              <CommandGroup>
                <CommandItem>
                  <button
                    className="flex space-x-2 items-center w-full"
                    type="reset"
                    onClick={onAdd}
                  >
                    <PlusCircle className="mr-2 h-4 w-4 text-gray-500" />
                    Add{" "}
                  </button>
                </CommandItem>
                {options.map((option) => {
                  let isSelected = false;

                  if (type === "multi") {
                    isSelected = (value as string[])?.find(
                      (item) => item === option.value
                    )
                      ? true
                      : false;
                  } else {
                    isSelected = option.value === value ? true : false;
                  }
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          if (type === "single") {
                            setOpen(false);
                          } else {
                            const filteredOption = (value as string[]).filter(
                              (item) => item !== option.value
                            );
                            setValue(filteredOption);
                          }
                        } else {
                          if (type === "multi") {
                            value.length
                              ? setValue([...value, option.value])
                              : setValue([option.value]);
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
                            className={cn(
                              "mr-2 h-3 w-3 text-gray-500",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {option.label}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center rounded-sm border border-primary ",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
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
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectTagOption;
