import Image from "next/image";

export default function AILogo({
  size,
  className = "",
  decorative = false,
}: {
  size: number;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/ai-logo.png"
      alt={decorative ? "" : "medhaup AI"}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
