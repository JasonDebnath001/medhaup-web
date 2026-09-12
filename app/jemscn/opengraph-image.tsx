import { ImageResponse } from "next/og";
import NursingEntranceOg from "@/components/seo/NursingEntranceOg";
import { NURSING_ENTRANCE_COURSES } from "@/lib/nursing-entrance-catalog";

export const alt =
  "JEMScN M.Sc. Nursing entrance preparation coming soon to medhaup";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <NursingEntranceOg course={NURSING_ENTRANCE_COURSES[1]} />,
    size,
  );
}
