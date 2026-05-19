/**
 * TH:
 * FadeIn — Reusable animation wrapper component
 * ใช้ Framer Motion เพื่อสร้าง scroll-triggered fade animation
 * ทุก section บนหน้าแรกและหน้า listing ใช้ FadeIn ครอบ content
 *
 * วิธีการทำงาน:
 * - Element เริ่มต้นด้วย opacity 0 และ offset ตามทิศทาง (up, down, left, right)
 * - เมื่อ element scroll เข้าสู่ viewport (amount: 10%) จะ animate ไปสู่ opacity 1
 * - once: true → animation เกิดแค่ครั้งเดียว ไม่ repeat เมื่อ scroll กลับขึ้น
 *
 * EN:
 * FadeIn — a reusable scroll-triggered animation wrapper.
 * Uses Framer Motion's whileInView to animate elements as they enter the viewport.
 * Every section in the homepage and listing pages is wrapped in FadeIn.
 *
 * How it works:
 * - Element starts invisible (opacity 0) with a directional offset
 * - When 10% of the element enters the viewport, it animates to visible
 * - once: true ensures the animation fires only once (not on scroll-back)
 */

"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * TH:
 * Props สำหรับ FadeIn component
 * children — เนื้อหาที่จะถูก animate
 * delay — หน่วงเวลา (seconds) ใช้สำหรับ stagger effect ใน grids (delay={i * 0.06})
 * duration — ความเร็วของ animation (default 0.5s)
 * direction — ทิศทางที่ element เลื่อนมาจาก (default "up")
 * className — CSS classes เพิ่มเติมบน wrapper div
 * once — เล่น animation ครั้งเดียวหรือทุกครั้งที่ scroll ผ่าน
 * amount — สัดส่วนของ element ที่ต้องอยู่ใน viewport ก่อน trigger (0.0–1.0)
 *
 * EN:
 * Props for the FadeIn component:
 * children — content to animate
 * delay — delay in seconds; use i * 0.06 for staggered grid animations
 * duration — animation duration in seconds (default 0.5)
 * direction — slide-in direction (default "up")
 * className — extra CSS classes on the wrapper div
 * once — whether the animation plays only once (true) or re-triggers (false)
 * amount — fraction of element visible before triggering (0.0–1.0)
 */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  amount?: number;
}

/**
 * TH:
 * directionOffset — map ทิศทางไปยัง initial position offset
 * "up" → เริ่มที่ y: 24 (24px ลงมา แล้ว animate ขึ้น)
 * "left" → เริ่มที่ x: 24 (24px ไปทางขวา แล้ว animate ซ้าย)
 * "none" → ไม่มี offset (fade in เฉยๆ)
 *
 * EN:
 * directionOffset — maps direction strings to initial transform offsets.
 * "up" → starts 24px below its final position and slides up
 * "left" → starts 24px to the right and slides left
 * "none" → no positional offset, just opacity fade
 */
const directionOffset = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
  once = true,
  amount = 0.1,
}: FadeInProps) {
  /**
   * TH:
   * variants — กำหนด animation states สำหรับ Framer Motion
   * hidden: state เริ่มต้น (invisible + offset)
   * visible: state ปลายทาง (visible, no offset)
   * y: 0, x: 0 ใน visible state reset ทั้ง y และ x เสมอ ไม่ว่า direction จะเป็นอะไร
   *
   * EN:
   * variants — Framer Motion animation state definitions.
   * hidden: initial state (invisible + directional offset)
   * visible: final state (fully visible, no offset)
   * Setting y:0 and x:0 in visible always resets both axes regardless of direction.
   */
  const variants: Variants = {
    hidden: { opacity: 0, ...directionOffset[direction] },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}  // TH: trigger เมื่อ 10% ของ element อยู่ใน viewport | EN: trigger when 10% visible
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],  // TH: custom easing curve สำหรับ smooth feel | EN: custom ease-out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
