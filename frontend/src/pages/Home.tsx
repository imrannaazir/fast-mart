import ImageUpload from "@/components/ui/image-upload";
import Icon from "@/components/ui/lucide-icon";
import { icons } from "@/constant/constant";
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
        {icons.map((icon) => (
          <Icon name={icon} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
