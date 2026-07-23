import { useState, useEffect } from 'react';
import { Menu, X, Stethoscope, GraduationCap, LogIn, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const navLinks = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'من نحن', href: '#about' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'النتائج', href: '#gallery' },
  { label: 'الحجز', href: '#booking' },
  { label: 'تواصل', href: '#contact' },
];

type NavbarProps = {
  onOpenAuth: () => void;
};

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
            scrolled ? 'bg-brand-600' : 'bg-white/20 backdrop-blur-sm border border-white/30'
          }`}>
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className={`block font-display font-bold text-lg leading-tight ${scrolled ? 'text-slate-800' : 'text-white'}`}>
              د. عمر العمري
            </span>
            <span className={`block text-xs ${scrolled ? 'text-brand-600' : 'text-brand-100'}`}>
              عيادة الأسنان
            </span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  scrolled
                    ? 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/courses"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1.5 ${
                scrolled
                  ? 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              الدورات
            </a>
          </li>
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1.5 text-sm font-medium ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
                <UserCircle className="w-5 h-5" />
                {user.email}
              </span>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-all"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all"
            >
              <LogIn className="w-4 h-4" />
              دخول
            </button>
          )}
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:shadow-brand-600/40 transition-all duration-200 hover:scale-105"
          >
            احجز موعداً
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-white shadow-xl border-t border-slate-100 animate-fade-in">
          <ul className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-brand-50 font-medium transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/courses"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-brand-50 font-medium transition-colors"
              >
                الدورات
              </a>
            </li>
            <li>
              {user ? (
                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="block w-full text-center px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  تسجيل الخروج ({user.email})
                </button>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); setMenuOpen(false); }}
                  className="block w-full text-center px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  دخول / تسجيل
                </button>
              )}
            </li>
            <li>
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl bg-brand-600 text-white text-center font-semibold"
              >
                احجز موعداً
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
