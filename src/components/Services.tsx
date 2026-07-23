import { Sparkles, Disc3, Wind, Stethoscope, ArrowLeft } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'تبييض الأسنان',
    desc: 'علاجات تبييض احترافية تزيل البقع وتفتح لون أسنانك بدرجات عدة في زيارة واحدة.',
    image: 'https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg',
    features: ['تبييض بالليزر', 'آمن وغير مؤلم', 'نتائج تدوم طويلاً'],
  },
  {
    icon: Disc3,
    title: 'زراعة الأسنان',
    desc: 'استبدال دائم للأسنان المفقودة بزرعات من التيتانيوم تبدو وتعمل كالأسنان الطبيعية.',
    image: 'https://images.pexels.com/photos/6627560/pexels-photo-6627560.jpeg',
    features: ['جراحة موجهة ثلاثية الأبعاد', 'زرع في نفس اليوم', 'مظهر طبيعي'],
  },
  {
    icon: Wind,
    title: 'تقويم الأسنان',
    desc: 'محاذاة أسنانك باستخدام التقويم التقليدي أو المصففات الشفافة وفقاً لنمط حياتك واحتياجاتك.',
    image: 'https://images.pexels.com/photos/6627566/pexels-photo-6627566.jpeg',
    features: ['مصففات شفافة', 'مسح رقمي', 'علاج أسرع'],
  },
  {
    icon: Stethoscope,
    title: 'طب الأسنان العام',
    desc: 'رعاية شاملة للفم تشمل الفحوصات والتنظيف والحشوات والعلاجات الوقائية لجميع الأعمار.',
    image: 'https://images.pexels.com/photos/6627556/pexels-photo-6627556.jpeg',
    features: ['فحوصات دورية', 'رعاية وقائية', 'طب أسنان عائلي'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-600 text-sm font-semibold mb-4">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            رعاية أسنان شاملة
          </h2>
          <p className="text-slate-500 leading-relaxed">
            من التنظيف الدوري إلى الإجراءات التجميلية المتقدمة، نقدم مجموعة كاملة
            من خدمات طب الأسنان للحفاظ على ابتسامتك صحية وجميلة.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-brand-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{service.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 group/link"
                >
                  احجز هذه الخدمة
                  <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
