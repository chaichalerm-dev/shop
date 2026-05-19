/**
 * TH:
 * SectionHeading — Component สำหรับ heading ของ sections ต่างๆ บนหน้าแรก
 * ใช้ reusable pattern ที่มี:
 * - eyebrow: label เล็กๆ ด้านบน (เช่น "Featured Products")
 * - title: หัวข้อหลักขนาดใหญ่
 * - highlight: คำที่ต้องการ emphasis ด้วย gradient color
 * - description: คำอธิบายเพิ่มเติม
 *
 * การทำงาน: รับ title + highlight แล้ว split title ด้วย highlight text
 * เพื่อแทรก <span className="gradient-text"> ตรงกลาง
 *
 * EN:
 * SectionHeading — reusable section title component used across all homepage sections.
 * Provides a consistent heading pattern with:
 * - eyebrow: small uppercase label above the title
 * - title: large main heading text
 * - highlight: a word or phrase rendered in gradient color
 * - description: optional subtitle paragraph
 *
 * Logic: splits the title at the highlight text to inject a gradient-colored <span>.
 */

import { cn } from "@/lib/utils";

/**
 * TH:
 * Props ของ SectionHeading:
 * eyebrow — label เล็กๆ สีม่วง ด้านบน title (เช่น "Featured Products", "Browse by Category")
 * title — หัวข้อหลัก (ส่วนที่ไม่ highlight จะเป็น text ปกติ)
 * highlight — คำที่จะแสดงด้วย gradient text (ต้องอยู่ใน title string ด้วย)
 * description — คำอธิบายย่อ แสดงด้วยสีเทา ด้านล่าง title
 * align — จัด alignment ของ text (center สำหรับส่วนใหญ่, left สำหรับ FeaturedProducts)
 * className — CSS classes เพิ่มเติม
 *
 * EN:
 * Props:
 * eyebrow — small violet uppercase label above the main title
 * title — the main heading text (non-highlighted portion rendered normally)
 * highlight — the word(s) to render in gradient color (must appear in title string)
 * description — optional subtitle shown below the heading
 * align — text alignment (center for most sections, left for FeaturedProducts)
 * className — additional CSS classes
 */
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  /**
   * TH:
   * Split title ด้วย highlight string:
   * ถ้า title = "Everything You Need to " และ highlight = "Perform Better"
   * → titleParts = ["Everything You Need to ", ""]
   * → render: "Everything You Need to " + <span>Perform Better</span> + ""
   *
   * EN:
   * Split the title at the highlight word:
   * If title = "Everything You Need to " and highlight = "Perform Better"
   * → titleParts = ["Everything You Need to ", ""]
   * → renders: "Everything You Need to " + <span gradient>Perform Better</span> + ""
   */
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {/* TH: eyebrow label — uppercase, tracked, violet color | EN: small uppercase label above the heading */}
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
          {eyebrow}
        </p>
      )}

      {/* TH: Main heading — responsive sizes (3xl → 4xl → 5xl) | EN: main heading with responsive sizes */}
      <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl lg:text-5xl">
        {titleParts[0]}
        {/* TH: gradient text สำหรับคำที่ต้องการ emphasis | EN: gradient-colored highlight word */}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
        {titleParts[1]}
      </h2>

      {/* TH: description — optional subtitle ด้านล่าง, max-width 2xl เพื่อ readability | EN: optional subtitle capped at max-w-2xl for readability */}
      {description && (
        <p className="mt-4 text-base text-zinc-400 sm:text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
