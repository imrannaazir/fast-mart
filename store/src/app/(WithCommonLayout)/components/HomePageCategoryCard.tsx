import assets from "@/assets";
import { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import Icon from "@/components/ui/LucidIcon";
import Image from "next/image";
import Link from "next/link";

const HomePageCategoryCard = ({
  collection,
}: {
  collection: TCollectionDropdownItemProps;
}) => {
  return (
    <Link
      href={`/collection/${collection?.id}`}
      className={`flex gap-4  items-center justify-center flex-col bg-gray-100 w-[174px] h-[134px] rounded-md mb-10 text-gray-800 hover:bg-primary   hover:text-background transition-colors duration-300 relative group`}
    >
      <Image
        className="absolute w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
        src={assets.images.bg.category_card}
        width={174}
        height={134}
        alt=""
      />
      <Icon name={collection?.iconName as any} size={50} />
      <h3 className=" text-[15px] font-semibold">{collection?.name}</h3>
    </Link>
  );
};

export default HomePageCategoryCard;
