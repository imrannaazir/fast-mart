import { light_colors } from "@/constants/colors.constant";
import { Checkbox, Collapse, Form, Rate } from "antd";
import { FC } from "react";
import SidebarSectionHeader from "../../components/SidebarSectionHeader";
interface FilterSectionProps {
  title: string;
  name: string;
  initialValue: string[] | [];
  options: { value: string | number; label: string; count?: number }[];
  type?: "checkbox" | "rate";
  open: boolean;
}
const FilterSection: FC<FilterSectionProps> = ({ name, options, title, type, initialValue, open }) => {
  const formattedInitialValue = type === "rate" ? initialValue?.map((item) => Number(item)) : initialValue;
  return (
    <Collapse
      style={{
        backgroundColor: light_colors.background,
        borderColor: "#e5e7eb",
      }}
      size="small"
      expandIconPosition="end"
      defaultActiveKey={open ? ["1"] : []}
      items={[
        {
          key: "1",
          label: <SidebarSectionHeader border={false} level={title} className="text-base font-medium" />,
          children: (
            <Form.Item name={name} initialValue={formattedInitialValue} className="m-0">
              <Checkbox.Group style={{ width: "100%", margin: 0 }} className="grid grid-cols-1">
                {options.map((option) => (
                  <Checkbox
                    style={{ transform: "scale(1.05)", fontSize: "16px", marginLeft: "4px" }}
                    className=""
                    value={option.value}
                  >
                    <div className="space-y-2">
                      {type === "rate" ? (
                        <Rate value={option.value as number} style={{ fontSize: 16 }} />
                      ) : (
                        <span className="text-sm">{option.label}</span>
                      )}
                      {option.count !== undefined && <span> ({option.count})</span>}
                    </div>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          ),
        },
      ]}
    />
  );
};

export default FilterSection;
