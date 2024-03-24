import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
import { logOut } from "@/redux/features/auth/authSlice";
import { SheetNav } from "./SheetNav";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import CartButton from "./CartButton";
import { Link } from "react-router-dom";
import { clearCart } from "@/redux/features/cart/cartSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout(undefined);
    dispatch(logOut());
    dispatch(clearCart());
  };
  return (
    <div
      className=" 
  sticky
  top-0
  z-50
  
  
  
  "
    >
      <div className=" px-4  pt-6 backdrop-blur-md">
        <div
          className="
          border
          bg-background
          rounded-md
          flex
          min-h-16
          items-center
          px-4
    
    "
        >
          {/* logo */}
          <div className="lg:hidden">
            <SheetNav />
          </div>
          {/* <MainNav className="mx-4" /> */}
          <div
            className="
          ml-auto
          flex
          items-center
          space-x-4"
          >
            <Link to="/cart">
              <CartButton />
            </Link>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
