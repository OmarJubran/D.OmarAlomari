import { Award, Microscope, HeartHandshake, CheckCircle2 } from 'lucide-react';

const points = [
  'متخرج من أوائل دفعة جامعة أسنان رائدة',
  'تدريب مستمر في أحدث التقنيات العالمية',
  'عضو في جمعية طب الأسنان الدولية',
];

const features = [
  { icon: Award, title: 'خبرة متميزة', desc: 'أكثر من 15 عاماً من التميز السريري في طب وتجميل الأسنان.' },
  { icon: Microscope, title: 'تقنيات متقدمة', desc: 'تصوير ثلاثي الأبعاد وماسحات رقمية وليزر لعلاج دقيق دون ألم.' },
  { icon: HeartHandshake, title: 'رعاية تركز على المريض', desc: 'خطط علاج مخصصة في بيئة مريحة ومرحبة.' },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative animate-fade-up">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6627560/pexels-photo-6627560.jpeg"
              alt="د. عمر العماري"
              className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl shadow-xl p-6 text-white max-w-xs hidden md:block">
              <p className="text-3xl font-extrabold mb-1">+15 سنة</p>
              <p className="text-sm text-brand-50">من الخدمة المخلصة في طب الأسنان الحديث</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-4">
            عن العيادة
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 leading-tight">
            تعرف على د. عمر العماري
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            د. عمر العماري طبيب أسنان مختص وشغوف بتحويل الابتسامات. بخبرة تزيد عن 15 عاماً،
            ساعد آلاف المرضى على تحقيق صحة فموية مثالية باستخدام أحدث تقنيات طب الأسنان المتاحة اليوم.
          </p>

          <div className="space-y-3 mb-8">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{point}</span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {features.map((feat) => (
              <div key={feat.title} className="p-5 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-brand-200 transition-all duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center mb-3">
                  <feat.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
