export const WHATSAPP_NUMBER = "919959414445";

export function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function enquiryMessage(data: Record<string, string>) {
  return [
    "Hello Village Pickles,",
    "",
    "New Enquiry:",
    "",
    ...Object.entries(data).map(([key, value]) => `${key}: ${value || "-"}`),
    "",
    "Please contact me regarding this enquiry.",
    "",
    "Thank you."
  ].join("\n");
}
