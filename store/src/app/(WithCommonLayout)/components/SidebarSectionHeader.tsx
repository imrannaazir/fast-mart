const SidebarSectionHeader = ({ level }: { level: string }) => {
  return (
    <h3 className="flex flex-col">
      <span className="text-xl font-semibold">{level}</span>
      <span className="h-[2px] w-[65px] bg-primary" />
    </h3>
  );
};

export default SidebarSectionHeader;
