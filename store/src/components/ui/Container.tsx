import { FC, ReactNode } from "react";

type TContainer = {
  children: ReactNode;
};

const Container: FC<TContainer> = ({ children }) => {
  return <div className="max-w-7xl mx-auto px-4 ">{children}</div>;
};

export default Container;
