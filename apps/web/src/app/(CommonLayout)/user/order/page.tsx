import HomeSectionTop from "../../components/HomeSectionTop";
import OrderCard from "../components/order-card";

const OrderPage = () => {
  return (
    <div>
      <HomeSectionTop heading="My Orders History" description="" />
      <div className="mt-6 grid gap-6">
        {Array.from({ length: 3 }).map((order, i) => (
          <OrderCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
