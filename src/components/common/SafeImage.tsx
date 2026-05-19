/**
 * TH:
 * SafeImage — Wrapper รอบ next/image ที่มี error handling และ loading state
 * ใช้แทน <Image> จาก next/image ทุกที่ในโปรเจกต์
 *
 * ปัญหาที่แก้:
 * 1. External image URLs อาจ fail → แสดง /placeholder.svg แทน
 * 2. Image โหลดช้า → แสดง animated skeleton ระหว่างโหลด (UX ดีกว่า blank space)
 * 3. Opacity transition เมื่อ load เสร็จ → smooth appearance ไม่กระตุก
 *
 * EN:
 * SafeImage — a drop-in wrapper around next/image with error handling and loading state.
 * Used everywhere an image appears in the project instead of bare <Image />.
 *
 * Problems solved:
 * 1. External image URLs may fail → falls back to /placeholder.svg
 * 2. Slow image loads → shows an animated skeleton while loading (better UX)
 * 3. Smooth opacity transition on load → avoids jarring image pop-in
 */

"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * TH:
 * Props ขยายมาจาก ImageProps ของ next/image
 * fallbackSrc — URL ที่ใช้แทนเมื่อ image โหลดล้มเหลว (default: /placeholder.svg)
 * containerClassName — className สำหรับ wrapper div ที่ครอบ image
 *
 * EN:
 * Props extend next/image's ImageProps (inherits fill, sizes, priority, etc.)
 * fallbackSrc — URL to show if the primary image fails to load
 * containerClassName — className applied to the wrapper div (useful with fill mode)
 */
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
  /**
   * TH:
   * imgSrc state — ปกติจะเป็น src ที่รับมา
   * เมื่อ onError เกิด → เปลี่ยนเป็น fallbackSrc (local SVG ที่ไม่มีทาง fail)
   *
   * EN:
   * imgSrc state — starts as the provided src.
   * If the image errors (network failure, 404), it switches to fallbackSrc.
   */
  const [imgSrc, setImgSrc] = useState(src);

  /**
   * TH:
   * loaded state — ควบคุม opacity animation
   * เริ่มต้น false → image เป็น opacity-0
   * เมื่อ onLoad เกิด → loaded = true → image fade-in เป็น opacity-100
   *
   * EN:
   * loaded state — controls the fade-in opacity transition.
   * Starts false (opacity-0) until the image fully loads (opacity-100).
   */
  const [loaded, setLoaded] = useState(false);

  return (
    /**
     * TH:
     * wrapper div ต้องมี position: relative และ overflow: hidden
     * เพราะ next/image ด้วย fill={true} จะ absolute positioning
     * containerClassName รับ className จากภายนอก เช่น "absolute inset-0"
     *
     * EN:
     * Wrapper div needs position: relative and overflow: hidden
     * because next/image with fill prop uses absolute positioning.
     * containerClassName lets callers apply "absolute inset-0" etc.
     */
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <Image
        src={imgSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",  // TH: fade-in เมื่อ load เสร็จ | EN: fade in on load complete
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setImgSrc(fallbackSrc)}  // TH: switch ไป fallback เมื่อ error | EN: switch to fallback on error
        {...props}
      />

      {/* TH: Skeleton placeholder แสดงระหว่างที่ image ยังโหลดไม่เสร็จ | EN: Animated skeleton shown while the image is loading */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-800" />
      )}
    </div>
  );
}
