import CourseEnrollment from "@/components/sections/course/CourseEnrollment";
import { JENPAS_INTEREST_OPTIONS } from "@/lib/jenpas";

export default function JenpasEnrollment() {
  return (
    <CourseEnrollment
      courseName="JENPAS(UG)"
      options={JENPAS_INTEREST_OPTIONS.map(
        (item) => `${item.label} (${item.detail})`,
      )}
      optionLabel="Which paper are you preparing for?"
    />
  );
}
