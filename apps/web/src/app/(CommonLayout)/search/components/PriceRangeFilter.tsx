import { light_colors } from "@/constants/colors.constant";
import { Button, Collapse, Form, Slider } from "antd";
import SidebarSectionHeader from "../../components/SidebarSectionHeader";
import { useFilterState } from "@/hooks/use-filter-state";
import { FC } from "react";

type TPriceRangeFilterProps = {
  maxPrice: number;
};
const PriceRangeFilter: FC<TPriceRangeFilterProps> = ({ maxPrice }) => {
  const { range } = useFilterState(maxPrice);

  return (
    <Collapse
      className="custom-collapse"
      style={{
        backgroundColor: light_colors.background,
        borderColor: "#e5e7eb",
      }}
      size="middle"
      expandIconPosition="end"
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: <SidebarSectionHeader border={false} level="Price Range" className="text-lg font-medium" />,
          children: (
            <>
              <Form.Item style={{ margin: 0 }} initialValue={range} name="priceRange">
                <Slider
                  tooltip={{
                    open: false,
                  }}
                  range
                  min={range[0]}
                  max={range[1]}
                />
              </Form.Item>
              <div className="flex justify-between">
                <Button type="primary" size="small">
                  {range[0]}{" "}
                </Button>
                <Button type="primary" size="small">
                  {range[1]}{" "}
                </Button>
              </div>
            </>
          ),
        },
      ]}
    />
  );
};

export default PriceRangeFilter;
