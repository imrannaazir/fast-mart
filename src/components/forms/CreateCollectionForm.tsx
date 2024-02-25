/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";
import { toast } from "sonner";
import { assignTag } from "@/redux/features/tag/tagSlice";
import { TCreateCollection } from "@/types/rtkQuery.type";

type CreateCollectionFormProps = {
  collectionName: string;
  createCollection: TCreateCollection;

  form: any;
};
const CreateCollectionForm: FC<CreateCollectionFormProps> = ({
  collectionName,
  createCollection,
  form,
}) => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const handleCreateCollection = async () => {
    try {
      const toastId = toast.loading(`Creating ${collectionName}.`, {
        duration: 2000,
      });
      const response = await createCollection({ name }).unwrap();
      if (response?.data) {
        if (collectionName !== "tags") {
          form.setValue(collectionName, response?.data?._id);
        } else {
          const tagValue = form.getValues(collectionName);
          const newTagValue = [...tagValue, response?.data?._id];

          form.setValue(collectionName, newTagValue);
          dispatch(assignTag(response?.data));
        }
        toast.success(`${collectionName} created successfully.`, {
          id: toastId,
        });

        dispatch(onClose());
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="">
      <Input
        onChange={(e) => setName(e.target.value)}
        type="name"
        placeholder="name"
      />
      <Button
        onClick={handleCreateCollection}
        className="mt-4 capitalize    "
        type="button"
      >
        Create {collectionName}
      </Button>
    </div>
  );
};

export default CreateCollectionForm;
