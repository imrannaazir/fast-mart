import Icon from "@/components/ui/lucide-icon";
import { useGetAllIconsQuery } from "@/redux/features/icon/icon.api";
const HomePage = () => {
  const { data, isFetching } = useGetAllIconsQuery(undefined);
  if (isFetching) {
    return <p>Loading..</p>;
  }

  console.log(data);

  return (
    <div>
      <div>
        {data?.data?.map((icon) => (
          <Icon name={icon.name} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
