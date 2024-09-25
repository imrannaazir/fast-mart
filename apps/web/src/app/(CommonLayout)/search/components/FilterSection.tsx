import { light_colors } from "@/constants/colors.constant";
import { Checkbox, Collapse, Form, Rate, Slider } from "antd";
import SidebarSectionHeader from "../../components/SidebarSectionHeader";
import { FC } from "react";
interface FilterSectionProps {
  title: string;
  name: string;
  options: { value: string | number; label: string; count?: number }[];
  type?: "checkbox" | "rate";
}
const FilterSection: FC<FilterSectionProps> = ({ name, options, title, type }) => {
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
          label: <SidebarSectionHeader border={false} level={title} className="text-lg font-medium" />,
          children: (
            <Form.Item name={name}>
              <Checkbox.Group style={{ width: "100%" }} className="grid grid-cols-1">
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
                        <span>{option.label}</span>
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
