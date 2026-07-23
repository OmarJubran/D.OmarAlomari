import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

type Case = {
  id: number;
  title: string;
  before: string;
  after: string;
};

const cases: Case[] = [
  {
    id: 1,
    title: 'Veneers Transformation',
    before: 'https://images.pexels.com/photos/6627556/pexels-photo-6627556.jpeg',
    after: 'https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg',
  },
  {
    id: 2,
    title: 'Implant Restoration',
    before: 'https://images.pexels.com/photos/6627560/pexels-photo-6627560.jpeg',
    after: 'https://images.pexels.com/photos/6627566/pexels-photo-6627566.jpeg',
  },
  {
    id: 3,
    title: 'Whitening & Alignment',
    before: 'https://images.pexels.com/photos/6627570/pexels-photo-6627570.jpeg',
    after: 'https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg',
  },
];

function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="group">
      <div className="ba-slider relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] select-none">
        {/* After (full) */}
        <img src={after} alt={`${title} - After`} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={before}
            alt={`${title} - Before`}
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${(100 / Math.max(position, 1)) * 100}%`, maxWidth: 'none' }}
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/70 text-white text-xs font-semibold backdrop-blur-sm">
          Before
        </span>
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-600/90 text-white text-xs font-semibold backdrop-blur-sm">
          After
        </span>

        {/* Divider line */}
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
          <div className="w-0.5 h-full bg-white shadow-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-2 border-brand-500 shadow-xl flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-brand-600" />
          </div>
        </div>

        {/* Range input overlay */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          aria-label={`Drag to compare before and after for ${title}`}
        />
      </div>
      <p className="text-center mt-4 font-semibold text-slate-700">{title}</p>
      <p className="text-center text-xs text-slate-400">Drag the slider to compare</p>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-4">
            Before & After
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            Real Transformations
          </h2>
          <p className="text-slate-500 leading-relaxed">
            See the difference our treatments make. Drag the sliders to reveal the
            amazing before and after results from real patients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <div key={c.id} className="animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <BeforeAfterSlider before={c.before} after={c.after} title={c.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
