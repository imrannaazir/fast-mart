import { getAllMyAddresses } from "@/actions/address";
import ShippingAddressDescription from "../../checkout/components/shipping-address-descripton";
import HomeSectionTop from "../../components/HomeSectionTop";

const AddressPage = async () => {
  const myAddresses = await getAllMyAddresses();
  return (
    <div>
      <HomeSectionTop heading="My Address Book" />

      <ShippingAddressDescription addresses={myAddresses?.data!} />
    </div>
  );
};

export default AddressPage;
