"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  containerClassName,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <Image
        src={imgSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setImgSrc(fallbackSrc)}
        {...props}
      />
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-800" />
      )}
    </div>
  );
}
