import { useState, type FormEvent } from 'react';
import { X, Mail, Lock, User, Loader2, AlertCircle, Stethoscope } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { validateEmail, sanitizeText } from '@/lib/validation';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const emailResult = validateEmail(email);
    if (!emailResult.valid) {
      setError(emailResult.error || 'البريد الإلكتروني غير صحيح');
      return;
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setLoading(true);
    const cleanEmail = sanitizeText(email, 254);

    const result = mode === 'login'
      ? await signIn(cleanEmail, password)
      : await signUp(cleanEmail, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-1">
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h2>
          <p className="text-sm text-slate-500">
            {mode === 'login'
              ? 'ادخل إلى حسابك للمتابعة'
              : 'أنشئ حساباً جديداً للوصول إلى الدورات'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full pr-4 pl-11 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-4 pl-11 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-700"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-600/30 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <User className="w-5 h-5" />
                {mode === 'login' ? 'دخول' : 'إنشاء حساب'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {mode === 'login' ? (
            <>
              ليس لديك حساب؟{' '}
              <button
                onClick={() => { setMode('signup'); setError(''); }}
                className="font-semibold text-brand-600 hover:text-brand-700"
              >
                أنشئ حساباً
              </button>
            </>
          ) : (
            <>
              لديك حساب بالفعل؟{' '}
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className="font-semibold text-brand-600 hover:text-brand-700"
              >
                سجل الدخول
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
