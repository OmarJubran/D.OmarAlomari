import { useState, type FormEvent } from 'react';
import { Clock, MapPin, Phone, Mail, MessageCircle, Send, Loader2, CheckCircle2, AlertCircle, MessageSquare, User } from 'lucide-react';
import { validateName, validatePhone, validateMessage, checkRateLimit } from '@/lib/validation';

const hours = [
  { day: 'السبت – الخميس', time: '9:00 ص – 8:00 م' },
  { day: 'الجمعة', time: 'مغلق' },
];

const contactInfo = [
  { icon: MapPin, label: 'عنوان العيادة', value: 'شارع الملك حسين، عمّان، الأردن' },
  { icon: Phone, label: 'الهاتف', value: '+962 7X XXX XXXX' },
  { icon: Mail, label: 'البريد الإلكتروني', value: 'info@omalari-dental.com' },
];

type FieldErrors = { name?: string; phone?: string; message?: string };

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
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
    const messageResult = validateMessage(form.message);

    const fieldErrors: FieldErrors = {};
    if (!nameResult.valid) fieldErrors.name = nameResult.error;
    if (!phoneResult.valid) fieldErrors.phone = phoneResult.error;
    if (!form.message.trim()) fieldErrors.message = 'الرسالة مطلوبة';

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const rateCheck = checkRateLimit('contact');
    if (!rateCheck.allowed) {
      setStatus('error');
      setErrorMsg(rateCheck.error || 'يرجى الانتظار قبل إرسال رسالة أخرى');
      return;
    }

    setStatus('loading');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`;
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
          message: messageResult.sanitized,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setStatus('error');
        setErrorMsg(data.error || 'حدث خطأ ما. يرجى المحاولة مرة أخرى.');
        return;
      }

      setStatus('success');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-600 text-sm font-semibold mb-4">
            تواصل والموقع
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            زور عيادتنا
          </h2>
          <p className="text-slate-500 leading-relaxed">
            نحن هنا لخدمتك. تواصل معنا عبر أي من القنوات أدناه
            أو زورنا في موقعنا المريح.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info + contact form */}
          <div className="space-y-5 animate-fade-up">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                ساعات العمل
              </h3>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-600 font-medium">{h.day}</span>
                    <span className={`text-sm font-semibold ${h.time === 'مغلق' ? 'text-red-500' : 'text-brand-600'}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {contactInfo.map((info) => (
              <div key={info.label} className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">{info.label}</p>
                  <p className="font-semibold text-slate-700">{info.value}</p>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/9627XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-green-50 mb-0.5">دردش معنا على</p>
                <p className="font-bold text-white text-lg">واتساب</p>
              </div>
            </a>
          </div>

          {/* Contact form + map */}
          <div className="space-y-5 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {status === 'success' ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">تم إرسال رسالتك!</h3>
                <p className="text-slate-500 mb-4">سنتواصل معك في أقرب وقت ممكن.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6" noValidate>
                <h3 className="font-bold text-slate-800 mb-4">أرسل لنا رسالة</h3>
                <div className="space-y-4">
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
                    <label className="block text-sm font-medium text-slate-600 mb-2">رسالتك</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <textarea
                        rows={4}
                        required
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        className={`w-full pr-4 pl-11 py-3 rounded-xl border outline-none transition-all text-slate-700 resize-none ${
                          errors.message ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
                        }`}
                      />
                    </div>
                    {errors.message && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-600/30 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full min-h-[300px]">
              <iframe
                title="موقع العيادة"
                src="https://www.openstreetmap.org/export/embed.html?bbox=35.90%2C31.95%2C35.95%2C32.00&layer=mapnik&marker=31.975%2C35.925"
                className="w-full h-full min-h-[300px] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
