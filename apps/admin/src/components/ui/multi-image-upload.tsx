/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { useUploadSingleImageMutation } from "@/redux/features/image/image.api";
import { TImage } from "@repo/utils/types";
import { ClassValue } from "clsx";
import { LucideImagePlus, Trash } from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { Button } from "./button";

export type TImageUrl = Pick<TImage, "_id" | "url">;
type TUploadImageProps = {
  isDisable?: boolean;
  fieldName: string;
  className?: ClassValue;
  children?: ReactNode;
  loader?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: UseFormSetValue<any>;
  fieldValue: string[];
  images: TImageUrl[];
};

const UploadMultiImage: FC<TUploadImageProps> = ({
  fieldName,
  setValue,
  className,
  children,
  loader,
  fieldValue,
  images,
}) => {
  // invoke hooks
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  // local state
  const [image, setImage] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<TImageUrl[]>(images);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [UploadImage] = useUploadSingleImageMutation();

  // handle remove image
  const handleRemoveImage = (_id: string) => {
    const filteredImageUrls = imageUrls.filter((imageUrl) => imageUrl._id !== _id);
    const filteredFieldValue = fieldValue.filter((value) => value !== _id);
    setImageUrls(filteredImageUrls);
    if (setValue) {
      setValue(fieldName, filteredFieldValue);
    }
  };

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
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          if (data.secure_url) {
            const res = await UploadImage({
              file_name: data.original_filename,
              size: data.bytes / 1000,
              url: data.secure_url,
              format: data.format,
            }).unwrap();

            if (res.success) {
              toast.success("Image uploaded.", { duration: 2000 });
              if (setValue && fieldName) {
                setValue(fieldName, [...fieldValue, res.data._id]);
                setImageUrls([...imageUrls, { _id: res.data._id, url: res.data.url }]);
              }
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
  }, [UploadPreset, cloudName, fieldName, fieldValue, image, setValue, UploadImage, imageUrls]);

  let UploadingButton: ReactNode = null;

  if (children) {
    if (loader && isImageUploading) {
      UploadingButton = loader;
    } else {
      UploadingButton = children;
    }
  } else if (!children && !loader) {
    const uploadArea = (
      <label htmlFor={fieldName} className="cursor-pointer">
        <div
          className={cn(
            "border-foreground flex h-full w-full items-center justify-center rounded-md border border-dashed",
            imageUrls?.length ? "aspect-square" : "aspect-video"
          )}
        >
          {isImageUploading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin duration-500" />
          ) : (
            <LucideImagePlus className="h-10 w-10 text-gray-500" />
          )}
        </div>
      </label>
    );
    UploadingButton = imageUrls.length ? (
      <div className={cn("grid items-center gap-2", imageUrls.length > 1 ? "grid-cols-4" : "grid-cols-2")}>
        {imageUrls.map((img, i) => (
          <div
            key={img._id}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-md border p-4",
              imageUrls.length > 1 && i === 0 && "col-span-2 row-span-2"
            )}
          >
            <img className="aspect-square w-full rounded-md object-cover" src={img.url} />

            <Button
              type="reset"
              onClick={() => handleRemoveImage(img?._id as string)}
              size={"icon"}
              variant={"destructive"}
              className="absolute right-2 top-2"
            >
              <Trash />
            </Button>
          </div>
        ))}

        {uploadArea}
      </div>
    ) : (
      uploadArea
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      <input
        id={fieldName}
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

      {UploadingButton}
    </div>
  );
};
export default UploadMultiImage;
