import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";

const TrackOrder = () => {
  const trackOrderBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Track Order",
      href: "/track-order",
    },
  ];

  return (
    <>
      <AppBreadcrumb items={trackOrderBreadcrumbItems} title="Track Order" />
      <Container>Track order</Container>
    </>
  );
};

export default TrackOrder;
