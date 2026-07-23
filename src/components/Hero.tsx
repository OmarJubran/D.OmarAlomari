import { Calendar, Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-400 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-300 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg')] bg-cover bg-center opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-sm text-brand-50 font-medium">رعاية أسنان متقدمة</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            ابتسامتك تستحق
            <span className="block bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
              أفضل رعاية
            </span>
          </h1>

          <p className="text-lg text-brand-50/80 leading-relaxed mb-8 max-w-xl">
            في عيادة د. عمر العماري لطب الأسنان، نمزج بين الخبرة الطويلة وأحدث التقنيات
            لنمنحك ابتسامة صحية وواثقة تدوم مدى الحياة.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#booking"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-brand-700 font-bold shadow-xl hover:bg-brand-50 transition-all duration-200 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              احجز موعداً
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              خدماتنا
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: Star, label: 'تقييم المرضى 4.9/5' },
              { icon: ShieldCheck, label: 'طبيب مختص معتمد' },
              { icon: Sparkles, label: 'تقنيات حديثة' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-brand-50">
                <item.icon className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-400/30 to-cyan-300/30 rounded-3xl blur-2xl" />
            <img
              src="https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg"
              alt="رعاية الأسنان"
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-3 animate-float">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-800">+15</p>
                <p className="text-xs text-slate-500">سنة خبرة</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-800">+5000</p>
                <p className="text-xs text-slate-500">مريض سعيد</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path d="M0 100V40C240 80 480 0 720 20C960 40 1200 80 1440 40V100H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
