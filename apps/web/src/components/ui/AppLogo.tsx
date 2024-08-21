import Link from "next/link";

const AppLogo = () => {
  return (
    <Link className="text-4xl font-bold" href={"/"}>
      <span className="text-primary">Fast</span>
      <span className="text-foreground/85">mart</span>
      <span className="text-primary">.</span>
    </Link>
  );
};

export default AppLogo;
