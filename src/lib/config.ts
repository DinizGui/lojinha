const DEFAULT_STORE_NAME = "Ma Belle Paris";

export function getStoreName(): string {
  const env = process.env.NEXT_PUBLIC_STORE_NAME?.trim();
  return env && env.length > 0 ? env : DEFAULT_STORE_NAME;
}

/** DDI + DDD + número (somente dígitos). Padrão: 41 99954-0027 → 5541999540027 */
const DEFAULT_WHATSAPP_DIGITS = "5541999540027";

export function getWhatsAppDigits(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, "");
  if (raw && raw.length >= 10) return raw;
  return DEFAULT_WHATSAPP_DIGITS;
}

export function whatsappUrlWithText(message: string): string {
  const phone = getWhatsAppDigits();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
