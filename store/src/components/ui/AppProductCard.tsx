import Image from "next/image";
import AppProductButtons from "./AppProductCardButtons";

const AppProductCard = () => {
  return (
    <div className="p-3 border rounded-lg group transition-all duration-300">
      {/* image */}
      <div className="relative mx-auto flex w-[80%] items-center justify-center  ">
        {/* buttons */}
        <AppProductButtons />
        <Image
          className="group-hover:scale-110  transition-all duration-300 "
          src={
            "https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/4.png"
          }
          width={169}
          height={140}
          alt="product1"
        />
      </div>
      {/* info */}
      <div>
        {/* title */}
        <h5>Dark Chocolate</h5>
        {/* price */}
        <p>
          <span>$26.59</span>
          <span>$28.59</span>
        </p>
        {/* review */}
        <p>5star</p>
      </div>
      {/* buttons */}
      <p>buttons</p>
    </div>
  );
};

export default AppProductCard;
