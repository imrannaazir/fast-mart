"use client";
import { verifyAccount } from "@/actions/auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import VerificationResult from "./components/verification-result";

function VerifyPage() {
  const [status, setStatus] = useState<"success" | "error" | "loading">("success");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleVerify = async () => {
    const result = await verifyAccount(token!);

    if (!result?.success) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  useEffect(() => {
    handleVerify();
  });

  return <VerificationResult status={status} />;
}

export default VerifyPage;
