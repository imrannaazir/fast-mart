import { cn } from "@/lib/utils";
import { useUploadSingleImageMutation } from "@/redux/features/image/image.api";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { LucideImagePlus, Trash } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ClassValue } from "clsx";

type TUploadSingleImageProps = {
  isDisable?: boolean;
  fieldName: string;
  className?: ClassValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
};

const UploadSingleImage: FC<TUploadSingleImageProps> = ({
  fieldName,
  setValue,
  className,
  isDisable = false,
}) => {
  // invoke hooks
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  // local state
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [uploadSingleImage] = useUploadSingleImageMutation();

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
              setValue(fieldName, res.data._id);
              setImageUrl(res.data.url);
            }

            setImage(null);
            setIsImageUploading(false);
          }
        } catch (error) {
          console.log(error);

          toast.error("Failed to upload", { duration: 2000 });
          setIsImageUploading(false);
        }
      }
    })();
  }, [UploadPreset, cloudName, fieldName, image, setValue, uploadSingleImage]);
  return (
    <div className={cn("relative  w-full", className)}>
      <input
        id={fieldName}
        disabled={isImageUploading || isDisable}
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
      <label htmlFor={fieldName} className="cursor-pointer">
        <div
          className={cn(
            "mt-2 border-2 border-dashed h-[200px] rounded-md flex items-center justify-center"
          )}
        >
          {isImageUploading ? (
            <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin duration-500" />
          ) : imageUrl ? (
            <img className="max-h-[180px]" src={imageUrl} />
          ) : (
            <LucideImagePlus className="w-10 h-10 text-gray-500" />
          )}
        </div>
      </label>

      <Button
        type="reset"
        onClick={() => {
          setValue("image", "");
          setImageUrl("");
          // setImage(null);
        }}
        variant={"destructive"}
        size={"icon"}
        className={cn(!imageUrl ? "hidden" : "absolute left-2 top-2")}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};
export default UploadSingleImage;
