"use client";

import { TImage } from "@repo/utils/types";
import ProductImageGallery from "../products/components/ProductGallery";

const Playground: React.FC = () => {
  const images: TImage[] = [
    {
      file_name: "abc",
      format: "jpg",
      size: 12,
      url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
      _id: "1",
      createdAt: "2442734293",
      updatedAt: "2324342423",
    },
    {
      file_name: "abc",
      format: "jpg",
      size: 12,
      url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      _id: "2",
      createdAt: "2442734293",
      updatedAt: "2324342423",
    },
    {
      file_name: "abc",
      format: "jpg",
      size: 12,
      url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
      _id: "3",
      createdAt: "2442734293",
      updatedAt: "2324342423",
    },
    {
      file_name: "abc",
      format: "jpg",
      size: 12,
      url: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56",
      _id: "4",
      createdAt: "2442734293",
      updatedAt: "2324342423",
    },
  ];
  return (
    <div className=" ">
      <ProductImageGallery media={images} />
    </div>
  );
};

export default Playground;
