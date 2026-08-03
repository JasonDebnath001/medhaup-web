export type SyllabusDownload = {
  /** Shown in the dropdown */
  label: string;
  /** Small caption under the label */
  caption: string;
  /** Path inside /public — drop the real PDF there with this exact name */
  fileUrl: string;
  /** Filename the user's browser saves the file as */
  fileName: string;
};

/* ----------------------------------------------------------------
   To update a syllabus PDF: drop the new file into
   /public/resources/ with the matching name below. Nothing else
   to touch.
----------------------------------------------------------------- */
export const SYLLABUS_DOWNLOADS: SyllabusDownload[] = [
  {
    label: "Download in English",
    caption: "Full ANM/GNM CET syllabus · PDF",
    fileUrl: "/resources/anm-gnm-syllabus-2026-english.pdf",
    fileName: "MedhaUp-ANM-GNM-CET-Syllabus-2026-English.pdf",
  },
  {
    label: "বাংলায় ডাউনলোড করুন",
    caption: "সম্পূর্ণ ANM/GNM CET সিলেবাস · PDF",
    fileUrl: "/resources/anm-gnm-syllabus-2026-bengali.pdf",
    fileName: "MedhaUp-ANM-GNM-CET-Syllabus-2026-Bengali.pdf",
  },
];