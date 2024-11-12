"use client";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import HomeSectionTop from "../../components/HomeSectionTop";
import Card, { TCard } from "../components/card";

const UserDashboard = () => {
  const data: TCard[] = [
    {
      id: 1,
      title: "Total Order",
      numbers: 3698,
      icon: HiOutlineBuildingStorefront,
    },
    {
      id: 2,
      title: "Total Order",
      numbers: 3698,
      icon: HiOutlineBuildingStorefront,
    },
    {
      id: 3,
      title: "Total Order",
      numbers: 3698,
      icon: HiOutlineBuildingStorefront,
    },
  ];
  return (
    <div>
      <HomeSectionTop
        heading="My Dashboard"
        description={
          <div className="text-[15px]">
            <div className="mb-1">
              Hello, <span className="text-black">Vicki E. Pope</span>
            </div>
            <p>
              From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and
              update your account information. Select a link below to view or edit information.
            </p>
          </div>
        }
      />

      {/* cards */}
      <div className="mt-6 grid grid-cols-3 gap-6">{data?.map((item) => <Card cardData={item} key={item.id} />)}</div>
    </div>
  );
};

export default UserDashboard;
