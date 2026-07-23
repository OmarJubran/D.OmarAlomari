import { Award, Microscope, HeartHandshake, CheckCircle2 } from 'lucide-react';

const points = [
  'Graduated top of class from a leading dental university',
  'Continuous training in the latest international techniques',
  'Member of the International Dental Association',
];

const features = [
  { icon: Award, title: 'Expert Experience', desc: 'Over 15 years of clinical excellence in cosmetic and restorative dentistry.' },
  { icon: Microscope, title: 'Advanced Technology', desc: '3D imaging, digital scanners, and laser dentistry for precise, painless treatment.' },
  { icon: HeartHandshake, title: 'Patient-First Care', desc: 'Personalized treatment plans in a comfortable, welcoming environment.' },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative animate-fade-up">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6627560/pexels-photo-6627560.jpeg"
              alt="Dr. Omar Alomari"
              className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl shadow-xl p-6 text-white max-w-xs hidden md:block">
              <p className="text-3xl font-extrabold mb-1">15+ Years</p>
              <p className="text-sm text-brand-50">of dedicated service in modern dentistry</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-4">
            About the Clinic
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 leading-tight">
            Meet Dr. Omar Alomari
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Dr. Omar Alomari is a highly skilled dental specialist with a passion for transforming
            smiles. With over 15 years of experience, he has helped thousands of patients achieve
            optimal oral health using the most advanced dental technology available today.
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
