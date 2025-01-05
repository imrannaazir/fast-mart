import { filterableFields, useFilterState } from "@/hooks/use-filter-state";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
type TClearFilterButtonProps = { maxPrice: number };
const ClearFilterButton: FC<TClearFilterButtonProps> = ({ maxPrice }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { clearFilters } = useFilterState(maxPrice);

  // handle clear filters
  const handleClearFilter = useCallback(() => {
    clearFilters();
    const newParams = new URLSearchParams(searchParams.toString());
    filterableFields.forEach((field) => {
      newParams.delete(field);
    });
    router.push(`/search?${newParams}`, { scroll: false });
  }, []);
  return (
    <Button className="text-primary m-0 p-0 font-semibold" type="link" onClick={handleClearFilter}>
      Clear All
    </Button>
  );
};

export default ClearFilterButton;
