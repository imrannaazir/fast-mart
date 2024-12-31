import { selectHeader } from "@/redux/features/header/header-slice";
import { useAppSelector } from "@/redux/hooks";
import { BadgeInfo } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import HeaderSearch from "./header-search";

const HeaderMiddle = () => {
  const { isDirty } = useAppSelector(selectHeader);
  let content: ReactNode;
  if (isDirty) {
    content = (
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
    );
  } else {
    content = <HeaderSearch />;
  }

  return <div className="col-span-8 lg:col-span-8">{content}</div>;
};

export default HeaderMiddle;
