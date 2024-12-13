"use client";
import VerificationError from "./verification-error";
import VerificationLoading from "./verification-loading";
import VerificationSuccess from "./verification-success";

interface VerificationResultProps {
  status: "success" | "error" | "loading";
}

const VerificationResult: React.FC<VerificationResultProps> = ({ status }) => {
  return status === "loading" ? (
    <VerificationLoading />
  ) : status === "success" ? (
    <VerificationSuccess />
  ) : (
    <VerificationError />
  );
};

export default VerificationResult;
