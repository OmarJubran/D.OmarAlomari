import { Stethoscope, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-brand-600 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-lg text-white">د. عمر العماري</p>
                <p className="text-xs text-brand-400">عيادة الأسنان</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              ابتسامتك تستحق أفضل رعاية. طب أسنان حديث بلمسة لطيفة
              وتقنيات متقدمة.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'الرئيسية', href: '#home' },
                { label: 'من نحن', href: '#about' },
                { label: 'خدماتنا', href: '#services' },
                { label: 'قبل وبعد', href: '#gallery' },
                { label: 'احجز موعداً', href: '#booking' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-400 hover:text-brand-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">خدماتنا</h4>
            <ul className="space-y-2.5 text-sm">
              {['تبييض الأسنان', 'زراعة الأسنان', 'تقويم الأسنان', 'طب الأسنان العام'].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-slate-400 hover:text-brand-400 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">شارع الملك حسين، عمّان، الأردن</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <span className="text-slate-400">+962 7X XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <span className="text-slate-400">info@omalari-dental.com</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-brand-600 transition-colors"
                >
                  <Icon className="w-5 h-5 text-slate-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} عيادة د. عمر العماري لطب الأسنان. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
