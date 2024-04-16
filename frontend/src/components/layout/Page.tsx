import { ArrowLeft } from "lucide-react";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type TPageProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

const Page: FC<TPageProps> = ({ action, children, title }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-muted p-1 rounded-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {title}
        </h3>
        {action}
      </div>
      <div className="py-4">{children}</div>
    </div>
  );
};

export default Page;
