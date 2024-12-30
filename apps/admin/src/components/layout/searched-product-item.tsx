import { TProduct } from "@repo/utils/types";
import { FC } from "react";

type TSearchedProductItemProps = {
  product: TProduct;
};
const SearchedProductItem: FC<TSearchedProductItemProps> = ({ product }) => {
  const img = "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
  return (
    <div className="flex items-center gap-2">
      <img src={product?.media?.[0]?.url || img} alt={product?.title} className="size-8 object-cover" />
      <div>
        <p>{product?.title}</p>
        <span>{`${product?.quantity} available`}</span>
      </div>
    </div>
  );
};

export default SearchedProductItem;
