import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import PageSection from "@/components/ui/page-section";
import UploadSingleImage from "@/components/ui/single-image-upload";
import { useGetMyDataQuery, useUpdateMyDataMutation } from "@/redux/features/user/user-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@repo/utils/functions";
import { TProfileFieldValues, TUser } from "@repo/utils/types";
import { profileUpdateValidation } from "@repo/utils/zod-schemas";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton.js";

const ProfileUploadForm = () => {
  const { data, isFetching } = useGetMyDataQuery("");
  const [uploadProfile, { isLoading }] = useUpdateMyDataMutation();
  const form = useForm<TProfileFieldValues>({
    resolver: zodResolver(profileUpdateValidation),
  });
  const myData = data?.data as TUser;

  useEffect(() => {
    if (myData?.photo) {
      form.setValue("photo", myData.photo?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData?.photo]);

  const photo = form.watch("photo");

  const uploadProfilePhoto = async () => {
    try {
      if (photo) {
        const result = await uploadProfile({ photo }).unwrap();
        if (result?.success) {
          toast.success("Profile image updated successfully");
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (photo !== myData?.photo?._id) {
      uploadProfilePhoto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData?.photo?._id, photo]);

  return (
    <Form {...form}>
      <form className="grid grid-cols-12">
        <PageSection className="w-fit">
          {isFetching || isLoading ? (
            <Skeleton className="size-[200px]" />
          ) : (
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Profile image</FormLabel>
                  <UploadSingleImage
                    deleteButton="hide"
                    className="aspect-square"
                    fieldName="photo"
                    fieldValue={field?.value || ""}
                    url={myData?.photo?.url || ""}
                    setValue={form.setValue}
                  />
                </FormItem>
              )}
            />
          )}
        </PageSection>
      </form>
    </Form>
  );
};

export default ProfileUploadForm;
