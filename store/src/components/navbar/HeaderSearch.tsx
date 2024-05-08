"use client";

import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";

const HeaderSearch = () => {
  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="max-w-[550px] w-full">
      <Search
        placeholder="I'm searching for ..."
        onSearch={onSearch}
        enterButton
        size="large"
      />
    </div>
  );
};

export default HeaderSearch;
