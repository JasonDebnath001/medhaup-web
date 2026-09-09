/** Check the content as well as the name; file-picker filters are only hints. */
export async function validatePdfUpload(file: File): Promise<void> {
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please choose a PDF file.");
  }
  const signature = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  if (String.fromCharCode(...signature) !== "%PDF-") {
    throw new Error(
      "This file is not a valid PDF. Please choose another file.",
    );
  }
}

export function formatFileSize(bytes: number): string {
  const megabytes = bytes / (1024 * 1024);
  return megabytes >= 1
    ? `${megabytes.toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
