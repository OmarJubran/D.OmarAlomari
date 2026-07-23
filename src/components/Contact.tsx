import { Clock, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const hours = [
  { day: 'Saturday – Thursday', time: '9:00 AM – 8:00 PM' },
  { day: 'Friday', time: 'Closed' },
];

const contactInfo = [
  { icon: MapPin, label: 'Clinic Address', value: 'King Hussein Street, Amman, Jordan' },
  { icon: Phone, label: 'Phone', value: '+962 7X XXX XXXX' },
  { icon: Mail, label: 'Email', value: 'info@omalari-dental.com' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-600 text-sm font-semibold mb-4">
            Contact & Location
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            Visit Our Clinic
          </h2>
          <p className="text-slate-500 leading-relaxed">
            We are here to serve you. Reach out to us through any of the channels below
            or visit us at our convenient location.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info cards */}
          <div className="space-y-5 animate-fade-up">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                Working Hours
              </h3>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-600 font-medium">{h.day}</span>
                    <span className={`text-sm font-semibold ${h.time === 'Closed' ? 'text-red-500' : 'text-brand-600'}`}>
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

            {/* WhatsApp CTA */}
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
                <p className="text-xs text-green-50 mb-0.5">Chat with us on</p>
                <p className="font-bold text-white text-lg">WhatsApp</p>
              </div>
            </a>
          </div>

          {/* Map */}
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full min-h-[400px]">
              <iframe
                title="Clinic Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=35.90%2C31.95%2C35.95%2C32.00&layer=mapnik&marker=31.975%2C35.925"
                className="w-full h-full min-h-[400px] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
