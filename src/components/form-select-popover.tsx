"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface FormSelectPopoverProps {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder: string;
  widthClass?: string;
}

export function FormSelectPopover({
  options,
  value,
  onChange,
  placeholder,
  widthClass = "w-full md:w-[350px]",
}: FormSelectPopoverProps) {
  const selected = options.find((opt) => opt.value === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              `${widthClass} justify-between bg-white`,
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              <span>
                <span className="text-green-700 font-bold">
                  {selected?.value}
                </span>{" "}
                - <span className="font-normal">{selected?.label}</span>
              </span>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`Cari ${placeholder.toLowerCase()}...`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => onChange(opt.value)}
                >
                  {opt.value} - {opt.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      opt.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
