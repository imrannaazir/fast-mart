"use client";
import AppMagnifier from "@/components/ui/AppMagnifier";

const ProductDetails = () => {
  return (
    <div className="w-[400px]">
      <AppMagnifier
        imageUrl="https://themes.pixelstrap.com/fastkart/assets/images/fashion/product/23.jpg"
        largeImageUrl="https://themes.pixelstrap.com/fastkart/assets/images/fashion/product/23.jpg"
        zoomFactor={2}
        imgAlt="image
      "
        glassDimension={250}
        glassBorderColor="#be9a35"
        glassBorderWidth={2}
      />
    </div>
  );
};

export default ProductDetails;
