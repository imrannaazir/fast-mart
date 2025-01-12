"use client";
import axiosInstance from "@/libs/axios";
import { cn } from "@/libs/utils";
import { debounce } from "@repo/utils/functions";
import { TProduct } from "@repo/utils/types";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Dropdown, Input, List } from "antd";
import VirtualList from "rc-virtual-list";

import type { SearchProps } from "antd/es/input/Search";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const HeaderSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { Search } = Input;
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const onSearch: SearchProps["onSearch"] = (value, _e, _info) => {
    newParams.set("q", encodeURIComponent(value));
    router.push(`/search?${newParams}`);
  };

  const onChange: SearchProps["onChange"] = (event) => handleDebounceSearchTerm(event?.target?.value);

  const handleDebounceSearchTerm = debounce((query) => {
    setSearchTerm(query as string);
  }, 300);

  const { data, isFetching, isError, error } = useQuery<TProduct[]>({
    queryKey: ["products", searchTerm],
    queryFn: () => axiosInstance.get(`/products?searchTerm=${searchTerm}`),
    select(data: any) {
      return data?.data?.data;
    },
    enabled: !!searchTerm,
  });

  return (
    <div className="relative hidden w-full max-w-[550px] lg:block">
      <Search
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
              <List className="bg-background">
                <VirtualList data={data!} height={300} itemHeight={47} itemKey="_id">
                  {(item: TProduct) => (
                    <List.Item key={item?._id}>
                      <List.Item.Meta
                        avatar={<Avatar src={item?.media?.[0]?.url} />}
                        title={<Link href="https://ant.design">{item?.title}</Link>}
                        description={
                          <p
                            className="max-h-[25px] overflow-hidden"
                            dangerouslySetInnerHTML={{ __html: item?.description! }}
                          />
                        }
                      />
                      <div>Content</div>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </Card>
          );
        }}
      ></Dropdown>{" "}
    </div>
  );
};

export default HeaderSearch;
