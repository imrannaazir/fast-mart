"use client";
import { Button, Result } from "antd";
import Link from "next/link";
import { MdMarkEmailRead } from "react-icons/md";

const VerificationSuccess: React.FC = () => {
  return (
    <div className="my-6 flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <Result
          icon={
            <div className="mb-4 flex justify-center">
              <MdMarkEmailRead className="h-20 w-20 text-green-500" />
            </div>
          }
          status="success"
          title={<h1 className="text-2xl font-semibold text-gray-800">Email Verified Successfully!</h1>}
          subTitle={
            <div className="mt-2 text-gray-600">
              <p>Your email has been verified successfully. You can now access all features of your account.</p>
            </div>
          }
          extra={[
            <Link href={"/login"}>
              <Button type="primary" size="large" key="console">
                Continue to Login
              </Button>
            </Link>,
          ]}
        />
      </div>
    </div>
  );
};

export default VerificationSuccess;
