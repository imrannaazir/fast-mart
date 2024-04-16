/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import UploadSingleImage from "../ui/image-upload";
import { TImage } from "@/types/contents.type";
import LoadingButton from "../ui/loading-button";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";

type TImagePickerProps = {
  setValue: UseFormSetValue<any>;
};

const ImagePicker: FC<TImagePickerProps> = ({ setValue }) => {
  const [image, setImage] = useState<TImage | null>(null);
  useEffect(() => {
    if (image?._id) {
      setValue("image", image._id);
    }
  }, [image, setValue]);
  return (
    <>
      <UploadSingleImage
        isDisable={image?._id ? true : false}
        setUploadedImage={setImage}
        loader={
          <div className="mt-2 border-2 border-dashed h-[200px] rounded-md flex items-center justify-center">
            <LoadingButton />
          </div>
        }
      >
        <div className=" mt-2 border-2 border-dashed h-[200px] rounded-md flex items-center justify-center">
          {image?.url ? (
            <>
              <img className="max-h-[180px]" src={image.url} />
            </>
          ) : (
            <p className="btn-primary">Upload image</p>
          )}
        </div>
      </UploadSingleImage>

      {/* button to remove uploaded image */}
      <Button
        onClick={() => {
          setValue("image", "");
          setImage(null);
        }}
        variant={"destructive"}
        size={"icon"}
        className={cn(image?._id ? "absolute right-2 top-10" : "hidden")}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </>
  );
};

export default ImagePicker;
