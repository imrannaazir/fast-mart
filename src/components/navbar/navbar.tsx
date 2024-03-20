import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
import { logOut } from "@/redux/features/auth/authSlice";
import { SheetNav } from "./SheetNav";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { BsHandbag } from "react-icons/bs";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const onLogout = async () => {
    await logout(undefined);
    dispatch(logOut());
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
                <span className="">{2}</span>
              </div>
            </button>
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
