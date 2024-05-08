import Link from "next/link";
import DropdownCategoryItem from "./DropdownCategoryItem";

const DropdownCategories = () => {
  return (
    <div className="space-y-4 w-[300px]  ">
      {Array.from({ length: 9 }).map((_item, i) => (
        <div key={i} className="group">
          <DropdownCategoryItem />
          {/* drop down */}
          <div className="min-w-full h-full opacity-0 group-hover:opacity-100  group-hover:block absolute top-0 -right-[400px] group-hover:-right-[300px] transition-all duration-300">
            <div className="rounded-md shadow-lg   w-full h-full ml-9 bg-background px-4 py-5">
              <h3 className="text-base font-semibold">
                Vegetables & Fresh Fruits
              </h3>
              <ul className="list-disc pl-4 text-base mt-3 space-y-2">
                {Array.from({ length: 8 }).map((_item, i) => (
                  <li key={i}>
                    <Link className="hover:text-primary" href={"#"}>
                      Tomato & Potato
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownCategories;

/* 
import { Dropdown, theme } from "antd";
import DropdownCategoryItem from "./DropdownCategoryItem";
const { useToken } = theme;
const DropdownCategories = () => {
  const { token } = useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  return (
    <div className="space-y-4 w-[300px] ">
      {Array.from({ length: 9 }).map((_item, i) => (
        <Dropdown
          key={i}
          menu={{}}
          dropdownRender={() => (
            <div className="px-4 py-5  z-50 mt-3" style={contentStyle}>
              hello hello hello hello hello hello hello hello
            </div>
          )}
          placement="topRight"
        > 

          <DropdownCategoryItem key={i} />
        </Dropdown>
      ))}
    </div>
  );
};

export default DropdownCategories;


*/
