import { useAppDispatch } from "@/redux/hooks";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setFilterByDate } from "@/redux/features/filter/filterSlice";
// import { useGetAllFeatureNamesQuery } from "@/redux/features/featureName/featureNameApi";

const ProductDataTableToolbar = () => {
  //invoked hooks
  const dispatch = useAppDispatch();

  // redux store data

  return (
    <div className="flex items-center justify-between rounded-md border p-2">
      <div className="flex flex-1 items-center space-x-2">
        <div className="w-full space-y-2">
          {/* filters */}
          <div className="space-x-2">
            <Select onValueChange={(value) => dispatch(setFilterByDate(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="day">Daily </SelectItem>
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDataTableToolbar;
