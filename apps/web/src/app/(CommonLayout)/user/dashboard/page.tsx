import { IconType } from "react-icons";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import HomeSectionTop from "../../components/HomeSectionTop";
type TCard = {
  id: number;
  title: string;
  numbers: number;
  icon: IconType;
};
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
    {
      id: 4,
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
            <p className="mb-1">
              Hello, <b className="text-black">Vicki E. Pope</b>
            </p>
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

const Card = ({ cardData }: { cardData: TCard }) => {
  return (
    <div className="bg-background relative rounded-lg p-6">
      <div className="flex items-center gap-4">
        <cardData.icon size={56} className="text-primary" />
        <div>
          <p className="z-50 font-medium text-gray-500">{cardData?.title}</p>
          <h3 className="text-lg font-medium">{cardData?.numbers}</h3>
        </div>
      </div>
    </div>
  );
};
