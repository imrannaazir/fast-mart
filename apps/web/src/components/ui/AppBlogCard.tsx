import Image from "next/image";

const AppBlogCard = () => {
  return (
    <div className="group">
      <div className="w-full overflow-hidden">
        <Image
          className="group-hover:scale-110 group-hover:rotate-3 overflow-hidden transition-all duration-300"
          src={
            "https://themes.pixelstrap.com/fastkart/assets/images/vegetable/blog/1.jpg"
          }
          width={464}
          height={300}
          alt=""
        />
      </div>
      <div className=" text-start mt-4">
        {/* date */}
        <p className="text-sm font-medium text-gray-700">20 March, 2022</p>
        {/* title */}
        <h3 className="font-medium group-hover:text-primary transition-colors duration-300">
          Fresh Vegetable Online
        </h3>
      </div>
    </div>
  );
};

export default AppBlogCard;
