import assets from "@/assets";
import Image from "next/image";
import { BsEnvelope, BsTelephone } from "react-icons/bs";

const FooterContactUs = () => {
  return (
    <div>
      <h3 className="text-foreground/90 text-xl font-semibold">Contact Us</h3>
      <div className="mt-4 space-y-4">
        {/* hot line */}
        <div>
          <p className="flex items-center gap-2">
            <BsTelephone />
            <span className="text-sm">Hotline 24/7 :</span>
          </p>
          <h4 className="text-foreground/90 pl-6 font-semibold">+91 888 104 2340</h4>
        </div>
        {/* divider  */}
        <div className="ml-6 border-t-[1px] border-dashed border-gray-500"></div>

        {/* email address */}
        <div>
          <p className="flex items-center gap-2">
            <BsEnvelope />
            <span className="text-sm">Email Address :</span>
          </p>
          <h4 className="text-foreground/90 pl-6 font-semibold">fastkart@hotmail.com</h4>
        </div>

        {/* divider  */}
        <div className="ml-6 border-t-[1px] border-dashed border-gray-500"></div>
        {/* download app */}
        <div>
          <h3 className="text-foreground/80">Download App:</h3>
          <div className="mt-2 flex gap-2">
            <a href="#">
              <Image src={assets.svg.play_store} width={139} height={42} alt="play_store" />
            </a>
            <a href="#">
              <Image src={assets.svg.apple_store} width={139} height={42} alt="apple_store" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContactUs;
