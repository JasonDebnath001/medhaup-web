import CourseEnrollment from "@/components/sections/course/CourseEnrollment";
import { ANM_YEARS } from "@/lib/anm";

export default function AnmEnrollment() {
  return (
    <CourseEnrollment
      courseName="ANM"
      options={ANM_YEARS.map((item) => item.label)}
      optionLabel="Which ANM year are you in?"
    />
  );
}
