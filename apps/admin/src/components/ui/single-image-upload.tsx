/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { useUploadSingleImageMutation } from "@/redux/features/image/image.api";
import { ClassValue } from "clsx";
import { LucideImagePlus, Trash } from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { Button } from "./button";

type TUploadImageProps = {
  isDisable?: boolean;
  fieldName: string;
  className?: ClassValue;
  children?: ReactNode;
  loader?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: UseFormSetValue<any>;
  fieldValue: string;
  url: string;
};

const UploadSingleImage: FC<TUploadImageProps> = ({
  fieldName,
  setValue,
  className,
  children,
  loader,
  fieldValue,
  url,
}) => {
  // invoke hooks
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  // local state
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(url);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [UploadImage] = useUploadSingleImageMutation();

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
              if (setValue) {
                setValue(fieldName, res.data._id);
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
  }, [UploadPreset, cloudName, fieldName, fieldValue, image, imageUrl, setValue, UploadImage]);

  let UploadingButton: ReactNode = null;

  if (children) {
    if (loader && isImageUploading) {
      UploadingButton = loader;
    } else {
      UploadingButton = children;
    }
  } else {
    UploadingButton = (
      <label htmlFor={fieldName} className="cursor-pointer">
        <div
          className={cn(
            "border-foreground mt-2 flex h-[200px] items-center justify-center rounded-md border border-dashed"
          )}
        >
          {isImageUploading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin duration-500" />
          ) : imageUrl ? (
            <img className="h-full w-full object-cover" src={imageUrl as string} />
          ) : (
            <LucideImagePlus className="h-10 w-10 text-gray-500" />
          )}
        </div>
      </label>
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

      <Button
        type="reset"
        onClick={() => {
          if (setValue && fieldName) {
            setValue(fieldName, "");
          }
          setImageUrl("");
        }}
        variant={"destructive"}
        size={"icon"}
        className={cn(!imageUrl ? "hidden" : "absolute left-2 top-2", !setValue && "hidden")}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
export default UploadSingleImage;
