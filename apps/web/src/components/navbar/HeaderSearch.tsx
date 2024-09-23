"use client";

import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/navigation";

const HeaderSearch = () => {
  const router = useRouter();
  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => router.push(`/search?q=${encodeURIComponent(value)}`);

  const onChange: SearchProps["onChange"] = (event) => console.log(event.target?.value);

  return (
    <div className="hidden w-full max-w-[550px] lg:block">
      <Search placeholder="I'm searching for ..." onSearch={onSearch} onChange={onChange} enterButton size="large" />
    </div>
  );
};

export default HeaderSearch;
