import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFeatureName,
  selectSelectedFeatureNames,
} from "@/redux/features/featureName/featureNameSlice";

type TAddedFeatureProps = {
  keyName: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  submittedFeatures: Record<string, string>;
};
const AddedFeature: FC<TAddedFeatureProps> = ({
  keyName,
  value,
  form,
  submittedFeatures,
}) => {
  const dispatch = useAppDispatch();
  const selectedFeatureNames = useAppSelector(selectSelectedFeatureNames);
  // handle delete feature
  const handleDeleteFeature = () => {
    const featureNameToDelete = selectedFeatureNames.find(
      (featureName) => featureName.name === keyName
    );
    dispatch(removeFeatureName(featureNameToDelete));

    delete submittedFeatures[keyName];

    form.setValue("features", submittedFeatures);
  };
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
        onClick={handleDeleteFeature}
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
