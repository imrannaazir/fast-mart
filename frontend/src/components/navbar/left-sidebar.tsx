import MainNav from "./main-nav";

const LeftSidebar = () => {
  return (
    <div className="w-[240px] border sticky top-0  h-[100vh] pr-1 hidden lg:block">
      <MainNav />
    </div>
  );
};

export default LeftSidebar;
