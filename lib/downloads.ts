/** Supabase must send Content-Disposition for downloads across origins. */
export function getFileDownloadUrl(fileUrl: string): string {
  try {
    const url = new URL(fileUrl);
    if (url.pathname.startsWith("/storage/v1/object/public/")) {
      url.searchParams.set("download", "");
      return url.toString();
    }
  } catch {
    // Local /resources/... files already support the anchor download attribute.
  }
  return fileUrl;
}
