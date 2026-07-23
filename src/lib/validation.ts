export type ValidationResult = { valid: boolean; error?: string; sanitized: string };

const MAX_NAME = 80;
const MAX_PHONE = 30;
const MAX_MESSAGE = 1000;
const MAX_SERVICE = 50;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function stripDangerous(str: string): string {
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

export function sanitizeText(input: string, maxLength: number): string {
  const trimmed = input.trim().slice(0, maxLength);
  return escapeHtml(stripDangerous(trimmed));
}

export function validateName(input: string): ValidationResult {
  const sanitized = sanitizeText(input, MAX_NAME);
  if (!sanitized) return { valid: false, error: 'الاسم مطلوب', sanitized: '' };
  if (sanitized.length < 2) return { valid: false, error: 'الاسم قصير جداً', sanitized };
  if (!/^[\p{L}\p{M}\s'.-]+$/u.test(sanitized)) {
    return { valid: false, error: 'الاسم يحتوي على أحرف غير مسموحة', sanitized };
  }
  return { valid: true, sanitized };
}

export function validatePhone(input: string): ValidationResult {
  const sanitized = sanitizeText(input, MAX_PHONE);
  if (!sanitized) return { valid: false, error: 'رقم الهاتف مطلوب', sanitized: '' };
  const digitsOnly = sanitized.replace(/[\s\-()+]/g, '');
  if (!/^\d{7,15}$/.test(digitsOnly)) {
    return { valid: false, error: 'رقم الهاتف غير صحيح', sanitized };
  }
  return { valid: true, sanitized };
}

export function validateDate(input: string): ValidationResult {
  if (!input) return { valid: false, error: 'التاريخ مطلوب', sanitized: '' };
  const selected = new Date(input);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(selected.getTime())) return { valid: false, error: 'التاريخ غير صحيح', sanitized: '' };
  if (selected < today) return { valid: false, error: 'لا يمكن اختيار تاريخ سابق', sanitized: '' };
  return { valid: true, sanitized: input };
}

export function validateService(input: string): ValidationResult {
  const sanitized = sanitizeText(input, MAX_SERVICE);
  if (!sanitized) return { valid: false, error: 'يرجى اختيار خدمة', sanitized: '' };
  return { valid: true, sanitized };
}

export function validateMessage(input: string): ValidationResult {
  const sanitized = sanitizeText(input, MAX_MESSAGE);
  return { valid: true, sanitized };
}

const RATE_LIMIT_KEY = 'form_submissions';
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 2;

type RateEntry = { formType: string; timestamp: number };

export function checkRateLimit(formType: string): { allowed: boolean; error?: string } {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const entries: RateEntry[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = entries.filter(
      (e) => e.formType === formType && now - e.timestamp < RATE_LIMIT_WINDOW_MS,
    );
    if (recent.length >= RATE_LIMIT_MAX) {
      return { allowed: false, error: 'يرجى الانتظار دقيقة قبل إرسال طلب آخر' };
    }
    recent.push({ formType, timestamp: now });
    const allRecent = entries.filter((e) => now - e.timestamp < RATE_LIMIT_WINDOW_MS);
    allRecent.push({ formType, timestamp: now });
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(allRecent.slice(-20)));
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}
