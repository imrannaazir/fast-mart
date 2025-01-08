import AppBreadCrumbs from "./app-breadcrumbs";
import HeaderEnd from "./header-end";
import HeaderMiddle from "./header-middle";

const AppHeader = () => {
  return (
    <header className="bg-secondary-foreground sticky top-0 z-[99] flex h-16 shrink-0 items-center justify-between gap-2 rounded-b-sm border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      {/* breadcrumbs */}
      <AppBreadCrumbs />
      <HeaderMiddle />
      <HeaderEnd />
    </header>
  );
};

export default AppHeader;
