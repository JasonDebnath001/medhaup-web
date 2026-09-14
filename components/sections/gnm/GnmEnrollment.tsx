import CourseEnrollment from "@/components/sections/course/CourseEnrollment";
import { GNM_YEARS } from "@/lib/gnm";

export default function GnmEnrollment() {
  return (
    <CourseEnrollment
      courseName="GNM"
      options={GNM_YEARS.map((item) => item.label)}
      optionLabel="Which GNM year are you in?"
    />
  );
}
