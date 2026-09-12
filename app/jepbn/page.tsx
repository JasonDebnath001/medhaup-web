import NursingEntrancePage, {
  nursingEntranceMetadata,
} from "@/components/sections/nursing-entrance/NursingEntrancePage";
import { JEPBN_COURSE } from "@/lib/nursing-entrance";

export const metadata = nursingEntranceMetadata(JEPBN_COURSE);

export default function JepbnPage() {
  return <NursingEntrancePage course={JEPBN_COURSE} />;
}
