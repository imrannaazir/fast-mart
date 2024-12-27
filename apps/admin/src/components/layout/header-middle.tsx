import { selectHeader } from "@/redux/features/header/header-slice";
import { useAppSelector } from "@/redux/hooks";
import { BadgeInfo, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const HeaderMiddle = () => {
  const { isDirty } = useAppSelector(selectHeader);
  return isDirty ? (
    <div className="bg-primary border-muted/20 flex h-fit w-full justify-between rounded-lg border px-2 py-1">
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-white">
        <BadgeInfo size={14} />
        <p>
          Unsaved <span>product</span>
        </p>
      </div>
      <div className="space-x-2">
        <Button size={"sm"} className="bg-muted-foreground h-7">
          Discard
        </Button>
        <Button size={"sm"} className="h-7" variant={"secondary"}>
          Save
        </Button>
      </div>
    </div>
  ) : (
    <div className="relative">
      <Search className="text-muted-foreground absolute left-2 top-[13px] h-4 w-4" />
      <Input
        placeholder="Search"
        className="bg-primary border-muted/20 text-muted rounded-lg pl-7 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default HeaderMiddle;
