import NursingEntrancePage, {
  nursingEntranceMetadata,
} from "@/components/sections/nursing-entrance/NursingEntrancePage";
import { JEMSCN_COURSE } from "@/lib/nursing-entrance";

export const metadata = nursingEntranceMetadata(JEMSCN_COURSE);

export default function JemscnPage() {
  return <NursingEntrancePage course={JEMSCN_COURSE} />;
}
