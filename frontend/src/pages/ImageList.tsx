import { columns } from "@/components/dataTable/image/columns";
import { ImageDataTable } from "@/components/dataTable/image/data-table";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import {
  selectLimit,
  selectOrderBy,
  selectPage,
  selectSortBy,
  setMeta,
} from "@/redux/features/filter/filterSlice";
import {
  useGetAllImagesQuery,
  useUploadSingleImageMutation,
} from "@/redux/features/image/image.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TImage } from "@/types/contents.type";
import { Loader2 } from "lucide-react";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderList = () => {
  // invoke hooks
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  // local state
  const [image, setImage] = useState<File | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [skip, setSkip] = useState(true);

  const [uploadSingleImage] = useUploadSingleImageMutation();
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const sortBy = useAppSelector(selectSortBy);
  const orderBy = useAppSelector(selectOrderBy);

  let sort = "-createdAt";
  if (sortBy) {
    sort = orderBy === "desc" ? `-${sortBy}` : sortBy;
  }
  // query parameter
  const query = queryString.stringify({ page, limit, sort });
  const { data, isFetching } = useGetAllImagesQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    (async () => {
      if (image) {
        setIsImageUploading(true);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("cloud_name", cloudName);
        formData.append("upload_preset", UploadPreset);
        formData.append("folder", "e-commerce");

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          if (data.secure_url) {
            const res = await uploadSingleImage({
              file_name: data.original_filename,
              size: data.bytes / 1000,
              url: data.secure_url,
              format: data.format,
            }).unwrap();

            if (res.success) {
              toast.success("Image uploaded.", { duration: 2000 });
            }

            setImage(null);
            setIsImageUploading(false);
          }
        } catch (error) {
          toast.error("Failed to upload", { duration: 2000 });
          setIsImageUploading(false);
        }
      }
    })();
  }, [image, cloudName, UploadPreset, uploadSingleImage]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);

  const images = (data?.data || []) as TImage[];
  return (
    <Page
      title="Images"
      action={
        isImageUploading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <>
            <input
              id="hidden-input"
              disabled={isImageUploading}
              type="file"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files && e.target.files[0];
                if (selectedFile) {
                  setImage(selectedFile);
                }
              }}
              accept="image/*"
            />
            <label htmlFor="hidden-input" className="cursor-pointer">
              <div className="btn-primary">Upload Image</div>
            </label>
          </>
        )
      }
    >
      <div className=" mx-auto">
        <ImageDataTable
          columns={columns}
          data={images}
          isLoading={isFetching || isImageUploading}
        />
      </div>
    </Page>
  );
};

export default OrderList;
