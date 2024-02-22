import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
import { logOut } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      className=" 
  sticky
  top-4
  z-50
  border
  rounded-md
  bg-background
  "
    >
      <div
        className="
    flex
    h-16
    items-center
    px-4
    "
      >
        {/* logo */}
        {/* <MainNav className="mx-4" /> */}
        <div
          className="
          ml-auto
          flex
          items-center
          space-x-4"
        >
          <Button variant="outline" onClick={() => dispatch(logOut())}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
