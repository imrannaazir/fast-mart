"use client";
import { resendVerificationMail } from "@/actions/auth";
import { getErrorMessage } from "@repo/utils/functions";
import { Button, message, Result } from "antd";
import { XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const VerificationError: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const handleResendVerificationEmail = async () => {
    setIsLoading(true);
    const result = await resendVerificationMail(email!);

    if (!result?.success) {
      message.error(getErrorMessage(result));
      setIsLoading(false);
    } else {
      message.info("Resent verification mail. Check your mail!");
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <Result
          icon={
            <div className="mb-4 flex justify-center">
              <XCircle className="h-20 w-20 text-red-500" />
            </div>
          }
          status="error"
          title={<h1 className="text-2xl font-semibold text-gray-800">Verification Failed</h1>}
          subTitle={
            <div className="mt-2 text-gray-600">
              <p>The verification link is invalid or has expired. Please try again with a new verification link.</p>
            </div>
          }
          extra={[
            <Button
              onClick={handleResendVerificationEmail}
              loading={isLoading}
              type="primary"
              danger
              size="large"
              key="retry"
            >
              Request New Verification Link
            </Button>,
            <div className="mt-4 text-sm text-gray-500">
              Need help?{" "}
              <Button type="link" href="/contact" className="px-1">
                Contact Support
              </Button>
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

export default VerificationError;
