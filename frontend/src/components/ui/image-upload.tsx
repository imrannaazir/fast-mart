import { useUploadSingleImageMutation } from "@/redux/features/image/image.api";
import { TImage } from "@/types/contents.type";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type TUploadSingleImageProps = {
  children: ReactNode;
  loader: ReactNode;
  setUploadedImage?: Dispatch<SetStateAction<TImage | null>>;
  isDisable?: boolean;
};

const UploadSingleImage: FC<TUploadSingleImageProps> = ({
  children,
  loader,
  setUploadedImage,
  isDisable = false,
}) => {
  // invoke hooks
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  // local state
  const [image, setImage] = useState<File | null>(null);
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
              if (setUploadedImage) {
                setUploadedImage(res.data);
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
  }, [image, cloudName, UploadPreset, uploadSingleImage, setUploadedImage]);
  return isImageUploading ? (
    loader
  ) : (
    <>
      <input
        id="hidden-input"
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
      <label htmlFor="hidden-input" className="cursor-pointer">
        {children}
      </label>
    </>
  );
};
export default UploadSingleImage;

/* import { useState } from "react";
import { Image } from "cloudinary-react";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const APIKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const APISecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const UploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", UploadPreset);
    data.append("cloud_name", cloudName);
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      console.log({ res });

      setUrl(res.public_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
  };

  return (
    <div className="h-screen sm:px-8 md:px-16 sm:py-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
            <span>Click on Upload a File</span>&nbsp;
          </p>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="hidden-input" className="cursor-pointer">
            <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Upload a file
            </div>
          </label>

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview && <img src={preview} alt="preview" className="w-full" />}
          </div>
        </header>
        <div className="flex justify-end pb-8 pt-6 gap-4">
          <button
            onClick={uploadImage}
            className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
            disabled={!image}
          >
            Upload now
          </button>
          <button
            onClick={handleResetClick}
            className="rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
          >
            Reset
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Processing...</span>
          </div>
        ) : (
          url && (
            <div className="pb-8 pt-4">
              <Image cloudName={cloudName} publicId={url} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
 */
