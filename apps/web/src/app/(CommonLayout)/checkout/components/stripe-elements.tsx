"use client";
import { getClientSecret } from "@/actions/transaction";
import { light_colors } from "@/constants/colors.constant";
import { useCartList } from "@/contexts/cartlist-context";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { FC, useEffect, useState } from "react";
import CardPaymentForm from "./card-payment-form";

const stripe = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!);

type TStripeElementsProps = {};

const StripeElements: FC<TStripeElementsProps> = () => {
  const { totalPrice } = useCartList();
  const [clientSecret, setClientSecret] = useState("");
  const handleGetClientSecret = async () => {
    const data = await getClientSecret(totalPrice);
    setClientSecret(data?.data?.clientSecret!);
  };
  useEffect(() => {
    handleGetClientSecret();
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: light_colors.primary!,
    },
  };
  return (
    <div>
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            loader: "auto",
            appearance,
          }}
          stripe={stripe}
        >
          <CardPaymentForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default StripeElements;
