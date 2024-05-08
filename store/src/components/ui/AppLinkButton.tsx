import { FC, ReactNode } from "react";

type TAppLinkButton = {
  children: ReactNode;
};
const AppLinkButton: FC<TAppLinkButton> = ({ children }) => {
  return (
    <button className="relative ">
      {children}
      <div className="h-[3px] w-0 group-hover:w-[40px] transition-width duration-300 ease-linear bg-primary/50 absolute bottom-[1px]" />
    </button>
  );
};

export default AppLinkButton;
