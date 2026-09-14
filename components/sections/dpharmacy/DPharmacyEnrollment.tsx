import CourseEnrollment from "@/components/sections/course/CourseEnrollment";
import { DPHARMACY_YEARS } from "@/lib/dpharmacy";

export default function DPharmacyEnrollment() {
  return (
    <CourseEnrollment
      courseName="D.Pharmacy"
      options={DPHARMACY_YEARS.map((item) => item.label)}
      optionLabel="Which D.Pharmacy year are you in?"
    />
  );
}
