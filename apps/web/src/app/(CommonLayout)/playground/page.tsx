"use client";

const Playground: React.FC = () => {
  return (
    <div className="custom-scrollbar flex max-w-[700px] gap-3 overflow-x-auto">
      {Array.from({ length: 20 })?.map((_, i) => <div key={i} className="h-[200px] min-w-[300px] bg-gray-200"></div>)}
    </div>
  );
};

export default Playground;
