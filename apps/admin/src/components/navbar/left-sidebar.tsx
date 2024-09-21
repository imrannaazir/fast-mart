import MainNav from "./main-nav";

export default function LeftSidebar() {
  return (
    <div className="bg-muted/40 sticky top-16 hidden h-[calc(100vh-64px)] w-64 overflow-y-auto pt-4 lg:block">
      <MainNav />
    </div>
  );
}
