import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";

const AppLogo = () => {
  return (
    <Link href={"/"} className="flex items-center">
      <Image src={assets.images.logo} alt="Fastmart" width={30} height={30} />
      <div className="text-4xl font-bold">
        <span className="text-primary">Fast</span>
        <span className="text-foreground/85">mart</span>
        <span className="text-primary">.</span>
      </div>
    </Link>
  );
};

export default AppLogo;
