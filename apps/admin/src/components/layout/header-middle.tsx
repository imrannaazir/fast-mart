import { BadgeInfo } from "lucide-react";
import { Button } from "../ui/button";

const HeaderMiddle = () => {
  return (
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
};

export default HeaderMiddle;
