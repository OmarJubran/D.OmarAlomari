import { Sparkles, Disc3, Wind, Stethoscope, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'Teeth Whitening',
    desc: 'Professional whitening treatments that remove stains and brighten your smile by several shades in a single visit.',
    image: 'https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg',
    features: ['Laser whitening', 'Safe & painless', 'Long-lasting results'],
  },
  {
    icon: Disc3,
    title: 'Dental Implants',
    desc: 'Permanent tooth replacement using titanium implants that look, feel, and function like natural teeth.',
    image: 'https://images.pexels.com/photos/6627560/pexels-photo-6627560.jpeg',
    features: ['3D-guided surgery', 'Same-day implants', 'Natural appearance'],
  },
  {
    icon: Wind,
    title: 'Orthodontics',
    desc: 'Straighten your teeth with traditional braces or clear aligners tailored to your lifestyle and needs.',
    image: 'https://images.pexels.com/photos/6627566/pexels-photo-6627566.jpeg',
    features: ['Clear aligners', 'Digital scanning', 'Faster treatment'],
  },
  {
    icon: Stethoscope,
    title: 'General Dentistry',
    desc: 'Comprehensive oral care including checkups, cleanings, fillings, and preventive treatments for all ages.',
    image: 'https://images.pexels.com/photos/6627556/pexels-photo-6627556.jpeg',
    features: ['Routine checkups', 'Preventive care', 'Family dentistry'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-600 text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="text-slate-500 leading-relaxed">
            From routine cleanings to advanced cosmetic procedures, we offer a full range
            of dental services to keep your smile healthy and beautiful.
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
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
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
                  Book this service
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
