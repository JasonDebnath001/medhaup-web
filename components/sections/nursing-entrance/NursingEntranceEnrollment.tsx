import CourseEnrollment from "@/components/sections/course/CourseEnrollment";
import type { NursingEntranceCourse } from "@/lib/nursing-entrance";

export default function NursingEntranceEnrollment({
  course,
}: {
  course: NursingEntranceCourse;
}) {
  return (
    <CourseEnrollment
      courseName={course.name}
      options={course.interestOptions.map((option) => option.label)}
      optionLabel="Your nursing background"
    />
  );
}
