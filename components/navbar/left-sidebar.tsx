import MainNav from "./main-nav";

const LeftSidebar = () => {
  return (
    <div className="w-[240px] bg-accent sticky top-16 min-h-[calc(100vh-64px)]">
      <MainNav />
    </div>
  );
};

export default LeftSidebar;
