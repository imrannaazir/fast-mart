"use client";
import { Skeleton } from "antd";
import React from "react";

const VerificationLoading: React.FC = () => {
  return (
    <div className="mt-6 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          {/* Animated loading icon */}
          <div className="mb-8">
            <Skeleton.Avatar active size="large" />
          </div>

          {/* Title skeleton */}
          <div className="mb-6 w-3/4">
            <Skeleton.Input active size="default" block />
          </div>

          {/* Subtitle skeletons */}
          <div className="mb-8 w-full space-y-4">
            <Skeleton.Input size="small" active block />
            <Skeleton.Input active size="small" block />
          </div>

          {/* Button skeleton */}
          <div className="w-48">
            <Skeleton.Button active size="large" block />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationLoading;
