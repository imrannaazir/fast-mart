"use client";
import { placeOrder } from "@/actions/order";
import { light_colors } from "@/constants/colors.constant";
import { useCartList } from "@/contexts/cartlist-context";
import { useOrderContext } from "@/contexts/order-context";
import { useGetSession } from "@/libs/auth-utils";
import { cn } from "@/libs/utils";
import { getErrorMessage } from "@repo/utils/functions";
import { TPlaceOrderInput } from "@repo/utils/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { Button, message } from "antd";
import { ClassValue } from "clsx";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, SyntheticEvent, useState } from "react";

type TCardPaymentFormProps = {
  className?: ClassValue;
  clientSecret: string;
};
const CardPaymentForm: FC<TCardPaymentFormProps> = ({ className, clientSecret }) => {
  const { defaultAddress, paymentType } = useOrderContext();
  const { cartList } = useCartList();
  const { session } = useGetSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsLoading(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error?.message!);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: session?.user?.email || "Not Added",
          name: session?.user?.userId || "Anonymous",
        },
      },
    });

    if (confirmError) {
      message.error(confirmError.message);
      setIsLoading(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        // place order
        const orderPayload: TPlaceOrderInput = {
          cartItemIds: cartList.map((item) => item._id),
          addressId: defaultAddress,
          paymentType,
          transactionId: paymentIntent?.id,
        };
        const result = await placeOrder(orderPayload);

        if (result?.error) {
          message.error(getErrorMessage(error));
          setIsLoading(false);
        } else {
          if (result?.data) {
            router.push("/order-success");
            setIsLoading(true);
          }
        }
      }
    }
  };

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: light_colors.primary,
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#94a3b8",
        },
        backgroundColor: "transparent",
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
    classes: {
      base: "p-3 bg-white border border-gray-200 rounded-md",
      focus: "ring-2 ring-primary ring-offset-2",
      invalid: "border-destructive text-destructive",
      complete: "border-green-500",
    },
    hidePostalCode: true,
  };
  return (
    <form className={cn("mt-6 space-y-6", className)} onSubmit={handleSubmit}>
      <CardElement options={cardElementOptions} />
      <Button
        htmlType="submit"
        size="large"
        type="primary"
        className="w-full"
        disabled={isLoading || !stripe || !elements}
      >
        <span>{isLoading ? <Loader2 size={16} className="animate-spin duration-200" /> : "Pay now"}</span>
      </Button>
      {/* Show any error or success messages */}
      {error && <div className="text-sm text-red-400">{error}</div>}
    </form>
  );
};

export default CardPaymentForm;
