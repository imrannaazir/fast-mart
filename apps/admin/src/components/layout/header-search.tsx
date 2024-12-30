import { Inbox, Loader2 } from "lucide-react";

import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Search } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetAllProductQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@repo/utils/types";
import { useState } from "react";
import { Input } from "../ui/input";
import SearchedProductItem from "./searched-product-item";

const HeaderSearch = () => {
  const [q, setQ] = useState("");
  const { data, isFetching } = useGetAllProductQuery(`limit=${10}&searchTerm=${q}`, {
    skip: !q,
  });

  const products = (data?.data || []) as TProduct[];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Search className="text-muted-foreground absolute left-2 top-[13px] h-4 w-4" />
          <Input
            value={q}
            placeholder="Search"
            className="bg-primary border-muted/20 text-muted rounded-lg pl-7 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[99] w-[--radix-dropdown-menu-trigger-width] -translate-y-11">
        <Command className="">
          {" "}
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2 top-[13px] h-4 w-4" />
            <Input
              onChange={(e) => setQ(e.target.value)}
              autoFocus
              value={q}
              placeholder="Search"
              className="rounded-lg pl-7 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {!q && !isFetching && (
            <div className="text-primary/80 flex flex-col items-center justify-center gap-2 py-2">
              <Search size={50} className="text-primary/60" strokeWidth={1.5} />
              <p className="text-sm font-[500]">Find products in My Store</p>
            </div>
          )}
          {q && isFetching && (
            <div className="text-primary/80 flex flex-col items-center justify-center gap-2 py-2">
              <Loader2 size={50} className="text-primary/60 animate-spin duration-500" strokeWidth={1.5} />
              <p className="text-sm font-[500]">Finding products...</p>
            </div>
          )}
          <CommandList>
            {q && !isFetching && products?.length < 1 && (
              <div className="text-primary/80 flex flex-col items-center justify-center gap-2 py-2">
                <Inbox size={50} className="text-primary/60" strokeWidth={1.5} />
                <p className="text-sm font-[500]">No product founded.</p>
              </div>
            )}
            {q && products?.length > 0 && !isFetching && (
              <CommandGroup>
                {products?.map((product) => (
                  <CommandItem>
                    <SearchedProductItem product={product} key={product?._id} />
                  </CommandItem>
                ))}{" "}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderSearch;
