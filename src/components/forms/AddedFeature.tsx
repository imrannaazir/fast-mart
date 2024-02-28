import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FC } from "react";

type TAddedFeatureProps = {
  keyName: string;
  value: string;
  onDelete: () => void;
};
const AddedFeature: FC<TAddedFeatureProps> = ({ keyName, value, onDelete }) => {
  return (
    <div className="flex gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={keyName}>Feature</Label>
        <Input disabled type="text" id={keyName} value={keyName} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Value</Label>
        <Input disabled type="text" id={value} value={value} />
      </div>

      <Button
        type="button"
        onClick={onDelete}
        className="mt-[22px]"
        variant={"destructive"}
        size={"sm"}
      >
        <Trash size={14} />
      </Button>
    </div>
  );
};

export default AddedFeature;
