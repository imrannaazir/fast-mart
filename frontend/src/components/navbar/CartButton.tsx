import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { BsHandbag } from "react-icons/bs";

const CartButton = () => {
  const cartItems = useAppSelector(selectCartItems);
  // Cart quantity count calculator
  const cartQuantityCount = cartItems.reduce(
    (cartQuantityCount, item) => cartQuantityCount + item.quantity,
    0
  );
  return (
    <button
      onClick={() => {}}
      className="
w-11
h-11
border
border-gray-300
text-gray-500
bg-secondary/20
flex
items-center
justify-center
rounded-full
relative
"
    >
      <BsHandbag
        className="
text-xl"
      />

      <div
        className="
absolute
w-5
h-5
rounded-full
bg-primary
text-white
font-extrabold
-top-1
-right-1
flex
items-center
justify-center
text-xs
"
      >
        <span className="">{cartQuantityCount}</span>
      </div>
    </button>
  );
};

export default CartButton;
