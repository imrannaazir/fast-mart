import { ConfigProvider, ThemeConfig } from "antd";
import { FC, ReactNode } from "react";
import { light_colors } from "../../constants/colors.constant";

type TThemeProviderProps = {
  children: ReactNode;
};
const ThemeProvider: FC<TThemeProviderProps> = ({ children }) => {
  const theme: ThemeConfig = {
    token: {
      colorPrimary: light_colors.primary,
    },
  };
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
