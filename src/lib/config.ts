/**
 * Nome da loja — opcional via `NEXT_PUBLIC_STORE_NAME`.
 * Por padrão fica vazio até você configurar.
 */
export function getStoreName(): string {
  return process.env.NEXT_PUBLIC_STORE_NAME?.trim() ?? "";
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
