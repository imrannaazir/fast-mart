import { light_colors } from "@/constants/colors.constant";
import { Button, Collapse, Form, Slider } from "antd";
import { FC } from "react";
import SidebarSectionHeader from "../../components/SidebarSectionHeader";

type TPriceRangeFilterProps = {
  maxPrice: number;
  maxRange: number;
  minRange: number;
};
const PriceRangeFilter: FC<TPriceRangeFilterProps> = ({ maxPrice, maxRange, minRange }) => {
  return (
    <Collapse
      style={{
        backgroundColor: light_colors.background,
        borderColor: "#e5e7eb",
      }}
      size="small"
      expandIconPosition="end"
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: <SidebarSectionHeader border={false} level="Price Range" className="text-base font-medium" />,
          children: (
            <>
              <Form.Item style={{ margin: 0 }} initialValue={[minRange, maxRange]} name="priceRange">
                <Slider
                  tooltip={{
                    open: false,
                  }}
                  range
                  min={0}
                  max={maxPrice}
                />
              </Form.Item>
              <div className="flex justify-between">
                <Button type="primary" size="small">
                  {minRange}{" "}
                </Button>
                <Button type="primary" size="small">
                  {maxRange}{" "}
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
