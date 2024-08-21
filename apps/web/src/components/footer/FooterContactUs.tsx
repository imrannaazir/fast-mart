import assets from "@/assets";
import Image from "next/image";
import { BsEnvelope, BsTelephone } from "react-icons/bs";

const FooterContactUs = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-foreground/90">Contact Us</h3>
      <div className="space-y-4 mt-4">
        {/* hot line */}
        <div>
          <p className="flex items-center gap-2 ">
            <BsTelephone />
            <span className="text-sm ">Hotline 24/7 :</span>
          </p>
          <h4 className="font-semibold text-foreground/90 pl-6">
            +91 888 104 2340
          </h4>
        </div>
        {/* divider  */}
        <div className="border-t-[1px] border-gray-500 border-dashed ml-6"></div>

        {/* email address */}
        <div>
          <p className="flex items-center gap-2 ">
            <BsEnvelope />
            <span className="text-sm ">Email Address :</span>
          </p>
          <h4 className="font-semibold text-foreground/90 pl-6">
            fastkart@hotmail.com
          </h4>
        </div>

        {/* divider  */}
        <div className="border-t-[1px] border-gray-500 border-dashed ml-6"></div>
        {/* download app */}
        <div>
          <h3 className=" text-foreground/80">Download App:</h3>
          <div className="flex gap-2 mt-2">
            <a href="#">
              <Image
                src={assets.svg.play_store}
                width={139}
                height={42}
                alt="play_store"
              />
            </a>
            <a href="#">
              <Image
                src={assets.svg.apple_store}
                width={139}
                height={42}
                alt="apple_store"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContactUs;
