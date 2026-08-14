/* ----------------------------------------------------------------
   PYQ — previous year question papers.
   Drop PDFs into /public/resources/pyq/ matching fileUrl.
----------------------------------------------------------------- */
export type PYQ = {
  id: string;
  year: number;
  title: string;
  description: string;
  language: "Bengali" | "English" | "Bengali + English";
  fileSize: string;
  paperUrl: string; // question paper PDF
  answerKeyUrl?: string; // optional answer key PDF
  isNew?: boolean;
};

export const PYQS: PYQ[] = [
  {
    id: "pyq-2025",
    year: 2025,
    title: "ANM/GNM 2025 — Question Paper",
    description:
      "The actual 2025 paper. Attempt it in 90 minutes before checking the key.",
    language: "Bengali + English",
    fileSize: "2.4 MB",
    paperUrl: "/resources/pyq/anm-gnm-pyq-2025.pdf",
    answerKeyUrl: "/resources/pyq/anm-gnm-key-2025.pdf",
    isNew: true,
  },
  {
    id: "pyq-2024",
    year: 2024,
    title: "ANM/GNM 2024 — Question Paper",
    description: "Full 2024 paper with both categories.",
    language: "Bengali + English",
    fileSize: "2.1 MB",
    paperUrl: "/resources/pyq/anm-gnm-pyq-2024.pdf",
    answerKeyUrl: "/resources/pyq/anm-gnm-key-2024.pdf",
  },
  {
    id: "pyq-2023",
    year: 2023,
    title: "ANM/GNM 2023 — Question Paper",
    description:
      "The 2023 paper — good for spotting repeated GK and Biology topics.",
    language: "Bengali + English",
    fileSize: "1.9 MB",
    paperUrl: "/resources/pyq/anm-gnm-pyq-2023.pdf",
  },
];
