"use client";

import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useRouter, useSearchParams } from "next/navigation";

const HeaderSearch = () => {
  const router = useRouter();
  const { Search } = Input;
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const onSearch: SearchProps["onSearch"] = (value, _e, _info) => {
    newParams.set("q", encodeURIComponent(value));
    router.push(`/search?${newParams}`);
  };

  const onChange: SearchProps["onChange"] = (event) => console.log(event.target?.value);

  return (
    <div className="hidden w-full max-w-[550px] lg:block">
      <Search placeholder="I'm searching for ..." onSearch={onSearch} onChange={onChange} enterButton size="large" />
    </div>
  );
};

export default HeaderSearch;
