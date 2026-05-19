/**
 * TH:
 * Input — Styled text input component
 * ใช้ React.forwardRef เพื่อรองรับ ref forwarding (สำหรับ form libraries)
 * มี dark theme styling ที่ consistent กับ design system
 *
 * การใช้งาน:
 * - Search bar ในหน้า Products (/products)
 * - Email field ใน Newsletter form (CTASection)
 *
 * EN:
 * Input — styled text input component with dark theme styling.
 * Uses React.forwardRef for compatibility with form libraries and ref access.
 *
 * Used in:
 * - Search bar on the Products page (/products)
 * - Email field in the Newsletter form (CTASection)
 */

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * TH:
 * InputProps ขยายมาจาก React.InputHTMLAttributes<HTMLInputElement>
 * ทำให้รับ props ของ <input> ทุกตัว: type, placeholder, value, onChange, required ฯลฯ
 *
 * EN:
 * InputProps extends React.InputHTMLAttributes<HTMLInputElement>.
 * Inherits all native input props: type, placeholder, value, onChange, required, etc.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // TH: Layout และ sizing | EN: Layout and sizing
          "flex h-10 w-full rounded-xl px-4 py-2",
          // TH: Dark theme background และ border | EN: Dark theme background and border
          "border border-zinc-800 bg-zinc-900/60",
          // TH: Typography | EN: Typography
          "text-sm text-zinc-100 placeholder:text-zinc-500",
          // TH: Smooth border color transition | EN: Smooth border transition
          "transition-colors duration-200",
          // TH: Focus state — violet ring สำหรับ accessibility | EN: violet focus ring for accessibility
          "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-0 focus:border-violet-500",
          // TH: Disabled state | EN: Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
