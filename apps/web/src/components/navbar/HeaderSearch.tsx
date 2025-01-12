"use client";
import axiosInstance from "@/libs/axios";
import { cn } from "@/libs/utils";
import { debounce, formatCurrency } from "@repo/utils/functions";
import { TProduct } from "@repo/utils/types";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Dropdown, Empty, Input, List, Result } from "antd";
import VirtualList from "rc-virtual-list";

import type { SearchProps } from "antd/es/input/Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";

const HeaderSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  const router = useRouter();
  const { Search } = Input;
  const searchParams = useSearchParams();
  const [value, setValue] = useState(pathname.includes("search") ? searchParams.get("q") || "" : "");
  const newParams = new URLSearchParams(searchParams.toString());
  const onSearch: SearchProps["onSearch"] = (value, _e, _info) => {
    newParams.set("q", encodeURIComponent(value));
    router.push(`/search?${newParams}`);
    setSearchTerm("");
  };

  const onChange: SearchProps["onChange"] = (event) => {
    handleDebounceSearchTerm(event?.target?.value);
    setValue(event?.target?.value);
  };

  const handleDebounceSearchTerm = debounce((query) => {
    if (pathname.includes("search")) {
      newParams.set("q", encodeURIComponent(query as string));

      router.push(`/search?${newParams}`);
    } else {
      setSearchTerm(query as string);
    }
  }, 300);

  const { data, isFetching, isError, error } = useQuery<TProduct[]>({
    queryKey: ["products", searchTerm],
    queryFn: () => axiosInstance.get(`/products?searchTerm=${searchTerm}`),
    select(data: any) {
      return data?.data?.data;
    },
    enabled: !!searchTerm,
  });

  let dropdownRenderedContent: ReactNode;
  if (!isFetching && isError) {
    dropdownRenderedContent = <Result status={"error"} subTitle={error?.message} />;
  } else if (!isFetching && !isError && data?.length === 0) {
    dropdownRenderedContent = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  } else {
    dropdownRenderedContent = (
      <List loading={isFetching} className="bg-background">
        <VirtualList data={data!} height={300} itemHeight={47} itemKey="_id">
          {(item: TProduct) => (
            <List.Item
              key={item?._id}
              onClick={() => {
                router.push(`/products/${item?._id}`);
                setSearchTerm("");
              }}
              className="cursor-pointer"
            >
              <List.Item.Meta
                avatar={<Avatar src={item?.media?.[0]?.url} />}
                title={<h3 className="text-primary">{item?.title}</h3>}
                description={
                  <p
                    className="max-h-[25px] overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: item?.description! }}
                  />
                }
              />
              <div className="text-primary font-semibold">{formatCurrency(item?.price)}</div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    );
  }

  return (
    <div className="relative hidden w-full max-w-[550px] lg:block">
      <Search
        value={value}
        className=""
        placeholder="I'm searching for ..."
        onSearch={onSearch}
        onChange={onChange}
        enterButton
        size="large"
      />
      <Dropdown
        open={!!searchTerm}
        className={cn(!searchTerm ? "hidden" : "absolute bottom-0 left-0 right-0 w-full")}
        dropdownRender={() => {
          return (
            <Card
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px",
              }}
              bordered={false}
              className=""
            >
              {dropdownRenderedContent}
            </Card>
          );
        }}
      ></Dropdown>{" "}
    </div>
  );
};

export default HeaderSearch;
