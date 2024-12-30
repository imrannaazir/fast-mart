/* eslint-disable @typescript-eslint/no-explicit-any */
import * as LucidIcons from "lucide-react";

interface IconProps extends Omit<LucidIcons.LucideProps, "ref"> {
  name: keyof typeof LucidIcons.icons;
}
const Icon = ({ name, ...props }: IconProps) => {
  const LucidIcon = LucidIcons[name as keyof typeof LucidIcons] as any;

  return <LucidIcon {...props} />;
};

export default Icon;
