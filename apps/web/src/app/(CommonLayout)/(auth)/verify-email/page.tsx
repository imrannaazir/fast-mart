"use client";
import { resendVerificationMail } from "@/actions/auth";
import { getErrorMessage } from "@repo/utils/functions";
import { Button, message, Result } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MdMarkEmailUnread } from "react-icons/md";

const EmailVerification: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("e");
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
    <div className="mt-4 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        <Result
          icon={
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <MdMarkEmailUnread className="h-16 w-16 text-blue-500" />
              </div>
            </div>
          }
          title={<h1 className="text-2xl font-semibold text-gray-800">Verify your email address</h1>}
          subTitle={
            <div className="mt-2 text-gray-600">
              <p>We've sent a verification link to your email address.</p>
              <p className="mt-2">Please check your inbox and click the link to verify your account.</p>
            </div>
          }
          extra={[
            <a target="_blank" href="https://gmail.com/">
              <Button type="primary" size="large" className="mt-4" key="console">
                Open Email App
              </Button>
            </a>,
            <div className="mt-4 text-sm text-gray-500" key="help">
              Didn't receive the email? Check your spam folder or
              <Button loading={isLoading} onClick={handleResendVerificationEmail} type="link" className="px-1">
                resend verification email
              </Button>
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

export default EmailVerification;
