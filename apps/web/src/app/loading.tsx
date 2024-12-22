"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-56 w-56">
        <DotLottieReact
          className="h-full w-full"
          src="https://lottie.host/ff7246bb-50a0-452a-b5a4-49f157418c70/Rz0ILXX78Y.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LoadingPage;
