import ImageUpload from "@/components/ui/image-upload";
import Icon from "@/components/ui/lucide-icon";
import { useGetAllIconsQuery } from "@/redux/features/icon/icon.api";
const HomePage = () => {
  const { data, isFetching } = useGetAllIconsQuery(undefined);
  if (isFetching) {
    return <p>Loading..</p>;
  }

  return (
    <div>
      <ImageUpload />
      <div>
        {data?.data?.map((icon) => (
          <Icon name={icon.name} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
