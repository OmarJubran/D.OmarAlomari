import { useState, type FormEvent } from 'react';
import { User, Phone, Calendar, Stethoscope, MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase, type NewAppointment } from '@/lib/supabase';

const serviceOptions = [
  'Teeth Whitening',
  'Dental Implants',
  'Orthodontics',
  'General Dentistry',
  'Consultation',
];

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    appointment_date: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload: NewAppointment = {
      name: form.name,
      phone: form.phone,
      appointment_date: form.appointment_date,
      service: form.service,
      message: form.message || null,
    };

    const { error } = await supabase.from('appointments').insert([payload]);

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or call us directly.');
      return;
    }

    setStatus('success');
    setForm({ name: '', phone: '', appointment_date: '', service: '', message: '' });
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
            Book Appointment
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Schedule Your Visit
          </h2>
          <p className="text-brand-50/70 leading-relaxed">
            Fill out the form below and our team will confirm your appointment shortly.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-800 mb-3">Appointment Requested!</h3>
            <p className="text-slate-500 mb-6">
              Thank you for choosing Dr. Omar Alomari Dental Clinic. We will contact you
              shortly to confirm your appointment.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-up">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+962 7X XXX XXXX"
                    className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={today}
                    value={form.appointment_date}
                    onChange={(e) => handleChange('appointment_date', e.target.value)}
                    className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Service Needed</label>
                <div className="relative">
                  <Stethoscope className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select
                    required
                    value={form.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                    className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-700 appearance-none bg-white"
                  >
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-600 mb-2">Additional Notes (Optional)</label>
              <div className="relative">
                <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about your concern or any specific requests..."
                  className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-700 resize-none"
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
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
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Request Appointment
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
