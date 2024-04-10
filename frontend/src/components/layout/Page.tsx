import { FC, ReactNode } from "react";

type TPageProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

const Page: FC<TPageProps> = ({ action, children, title }) => {
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        {action}
      </div>
      <div className="py-4">{children}</div>
    </div>
  );
};

export default Page;
