// رقم واتساب استقبال الطلبات — صيغة دولية بدون + وبدون مسافات
export const WHATSAPP_NUMBER = "9647774492644";

export const SITE_URL = "https://a7mad-coffy1.vercel.app";

export function openWhatsApp(message: string) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
}
