import assets from "@/assets";
import { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import { Apple } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomePageCategoryCard = ({ collection }: { collection: TCollectionDropdownItemProps }) => {
  return (
    <Link
      href={`/search?collections=${collection?.id}`}
      className={`hover:bg-primary hover:text-background group relative mb-10 flex h-[134px] w-[174px] flex-col items-center justify-center gap-4 rounded-md bg-gray-100 text-gray-800 transition-colors duration-300`}
    >
      <Image
        className="absolute h-full w-full rounded-md object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        src={assets.images.bg.category_card}
        width={174}
        height={134}
        alt=""
      />
      {/* <Icon name={collection?.iconName as any} size={50} /> */}

      <Apple size={50} />
      <h3 className="text-[15px] font-semibold">{collection?.name}</h3>
    </Link>
  );
};

export default HomePageCategoryCard;
