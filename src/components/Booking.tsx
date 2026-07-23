import { useState, type FormEvent } from 'react';
import { User, Phone, Calendar, Stethoscope, MessageSquare, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { validateName, validatePhone, validateDate, validateService, validateMessage, checkRateLimit } from '@/lib/validation';

const serviceOptions = [
  'تبييض الأسنان',
  'زراعة الأسنان',
  'تقويم الأسنان',
  'طب الأسنان العام',
  'استشارة',
];

type FieldErrors = {
  name?: string;
  phone?: string;
  appointment_date?: string;
  service?: string;
};

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    appointment_date: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMsg('');

    const nameResult = validateName(form.name);
    const phoneResult = validatePhone(form.phone);
    const dateResult = validateDate(form.appointment_date);
    const serviceResult = validateService(form.service);
    const messageResult = validateMessage(form.message);

    const fieldErrors: FieldErrors = {};
    if (!nameResult.valid) fieldErrors.name = nameResult.error;
    if (!phoneResult.valid) fieldErrors.phone = phoneResult.error;
    if (!dateResult.valid) fieldErrors.appointment_date = dateResult.error;
    if (!serviceResult.valid) fieldErrors.service = serviceResult.error;

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const rateCheck = checkRateLimit('booking');
    if (!rateCheck.allowed) {
      setStatus('error');
      setErrorMsg(rateCheck.error || 'يرجى الانتظار قبل إرسال طلب آخر');
      return;
    }

    setStatus('loading');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-appointment`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
        headers['Authorization'] = `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: nameResult.sanitized,
          phone: phoneResult.sanitized,
          appointment_date: dateResult.sanitized,
          service: serviceResult.sanitized,
          message: messageResult.sanitized || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setStatus('error');
        setErrorMsg(data.error || 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.');
        return;
      }

      setStatus('success');
      setForm({ name: '', phone: '', appointment_date: '', service: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-20 lg:py-28 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-10 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-brand-50 text-sm font-semibold mb-4">
            حجز موعد
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            احجز زيارتك
          </h2>
          <p className="text-brand-50/70 leading-relaxed">
            املأ النموذج أدناه وسيتواصل فريقنا معك لتأكيد موعدك قريباً.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-800 mb-3">تم إرسال طلبك بنجاح!</h3>
            <p className="text-slate-500 mb-6">
              شكراً لاختيارك عيادة د. عمر العماري لطب الأسنان. سنتواصل معك
              قريباً لتأكيد موعدك.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
            >
              احجز موعداً آخر
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-up" noValidate>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="اسمك"
                    className={`w-full pr-4 pl-11 py-3 rounded-xl border outline-none transition-all text-slate-700 ${
                      errors.name ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
                    }`}
                  />
                </div>
                {errors.name && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">رقم الهاتف</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+962 7X XXX XXXX"
                    className={`w-full pr-4 pl-11 py-3 rounded-xl border outline-none transition-all text-slate-700 ${
                      errors.phone ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
                    }`}
                  />
                </div>
                {errors.phone && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">التاريخ المفضل</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={today}
                    value={form.appointment_date}
                    onChange={(e) => handleChange('appointment_date', e.target.value)}
                    className={`w-full pr-4 pl-11 py-3 rounded-xl border outline-none transition-all text-slate-700 ${
                      errors.appointment_date ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
                    }`}
                  />
                </div>
                {errors.appointment_date && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.appointment_date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">الخدمة المطلوبة</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select
                    required
                    value={form.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                    className={`w-full pr-4 pl-11 py-3 rounded-xl border outline-none transition-all text-slate-700 appearance-none bg-white ${
                      errors.service ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
                    }`}
                  >
                    <option value="" disabled>اختر خدمة</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                {errors.service && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.service}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-600 mb-2">ملاحظات إضافية (اختياري)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="أخبرنا عن مشكلتك أو أي طلبات محددة..."
                  className="w-full pr-4 pl-11 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-700 resize-none"
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-600/30 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  طلب موعد
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
