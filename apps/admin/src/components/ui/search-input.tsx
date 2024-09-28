import { Search } from "lucide-react";
import { ReactNode } from "react";

const SearchInput = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-grow">
      <form>
        <div className="relative">
          {children}
          <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
