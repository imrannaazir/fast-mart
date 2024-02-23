/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { MutationTrigger } from "node_modules/@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { useAppDispatch } from "@/redux/hooks";
import { onClose } from "@/redux/features/modal/modalSlice";
import { toast } from "sonner";

type CreateCollectionFormProps = {
  collectionName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  createCollection: MutationTrigger<
    MutationDefinition<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        // eslint-disable-next-line @typescript-eslint/ban-types
        {},
        FetchBaseQueryMeta
      >,
      never,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      "api"
    >
  >;

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
        form.setValue(collectionName, response?.data?._id);
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
