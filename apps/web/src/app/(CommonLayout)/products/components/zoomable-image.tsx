"use client";
import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import React, { FC, useState } from "react";
type TZoomableImage = {
  className?: ClassValue;
  url: string;
};
const ZoomableImage: FC<TZoomableImage> = ({ className, url }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.x) / rect.width) * 100;
    const y = ((e.clientY - rect.y) / rect.width) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={(e) => handleMouseMove(e)}
      className={cn("relative cursor-zoom-in overflow-hidden rounded-md", className)}
    >
      <Image
        className={cn(
          "aspect-square rounded-md object-cover transition-transform duration-200",
          isZoomed ? "scale-[2]" : "scale-100"
        )}
        width={768}
        height={768}
        src={url}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
        alt={`product image`}
      />
    </div>
  );
};

export default ZoomableImage;
