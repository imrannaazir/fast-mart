import assets from "@/assets";
import Image from "next/image";

const FooterBottom = () => {
  const socialLinks = [];
  return (
    <div className="flex justify-between items-center pb-10">
      <p> &copy; 2024 Fastmart All rights reserved</p>
      <Image
        src={assets.images.payment}
        width={302}
        height={35}
        alt="secure_payment"
      />
      <div>
        <span>Stay connected: </span>
      </div>
    </div>
  );
};

export default FooterBottom;
