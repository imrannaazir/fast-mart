import { formatCurrency } from "@/lib/utils";
import { TTopProduct } from "@repo/utils/types";
import { Avatar, AvatarImage } from "../ui/avatar";

const TopProductItem = ({ product }: { product: TTopProduct }) => {
  const img = "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
  return (
    <div className="flex items-center">
      <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 rounded-md border">
        <AvatarImage src={product?.media?.[0]?.url || img} alt={product?.title} />
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{product?.title}</p>
        <p className="text-muted-foreground text-sm">{product?.sales} Sales</p>
      </div>
      <div className="ml-auto font-medium">{formatCurrency(product?.price)}</div>
    </div>
  );
};

export default TopProductItem;
