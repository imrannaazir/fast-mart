import assets from "@/assets";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const FooterBottom = () => {
  const socialLinks = [
    {
      id: 1,
      icon: FaFacebookF,
      link: "#",
    },
    {
      id: 2,
      icon: FaTwitter,
      link: "#",
    },
    {
      id: 3,
      icon: FaInstagram,
      link: "#",
    },
    {
      id: 4,
      icon: FaPinterest,
      link: "#",
    },
  ];
  return (
    <div className="flex justify-between items-center pb-10">
      <p> &copy; 2024 Fastmart All rights reserved</p>
      <Image
        src={assets.images.payment}
        width={302}
        height={35}
        alt="secure_payment"
      />
      <div className="flex items-center gap-2">
        <span className="text-foreground/80">Stay connected: </span>
        <div className="flex items-center gap-2">
          {socialLinks.map((socialLink) => (
            <a key={socialLink.id} href={socialLink.link}>
              <socialLink.icon className="text-foreground/80 w-4 h-4 hover:text-primary transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
