import { useState } from 'react';
import { GraduationCap, Play, Clock, BarChart3, ShoppingCart, CheckCircle2, Lock, ArrowRight, Star, X, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { Course } from '@/lib/supabase';

const courses: Course[] = [
  {
    id: '1',
    title: 'أساسيات طب الأسنان الحديث',
    description: 'دورة شاملة للمبتدئين تغطي أساسيات الفحص والتشخيص وعلاج النخر.',
    price: 199,
    thumbnail: 'https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg',
    video_url: null,
    lessons_count: 24,
    duration: '6 ساعات',
    level: 'مبتدئ',
  },
  {
    id: '2',
    title: 'زراعة الأسنان المتقدمة',
    description: 'تقنيات الزراعة ثلاثية الأبعاد والتخطيط الرقمي للزرعات.',
    price: 349,
    thumbnail: 'https://images.pexels.com/photos/6627560/pexels-photo-6627560.jpeg',
    video_url: null,
    lessons_count: 32,
    duration: '10 ساعات',
    level: 'متقدم',
  },
  {
    id: '3',
    title: 'تجميل الأسنان والفينير',
    description: 'فن وعلم تركيب الفينير وتصميم الابتسامة الرقمي.',
    price: 299,
    thumbnail: 'https://images.pexels.com/photos/6627566/pexels-photo-6627566.jpeg',
    video_url: null,
    lessons_count: 28,
    duration: '8 ساعات',
    level: 'متوسط',
  },
  {
    id: '4',
    title: 'تقويم الأسنان والمصففات الشفافة',
    description: 'من الأساسيات إلى الحالات المتقدمة في التقويم التقليدي والرقمي.',
    price: 279,
    thumbnail: 'https://images.pexels.com/photos/6627570/pexels-photo-6627570.jpeg',
    video_url: null,
    lessons_count: 26,
    duration: '7 ساعات',
    level: 'متوسط',
  },
];

const levelColors: Record<string, string> = {
  'مبتدئ': 'bg-green-100 text-green-700',
  'متوسط': 'bg-amber-100 text-amber-700',
  'متقدم': 'bg-red-100 text-red-700',
};

export default function Courses({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [checkoutError, setCheckoutError] = useState('');

  const handleBuyNow = (course: Course) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setSelectedCourse(course);
    setCheckoutStatus('idle');
    setCheckoutError('');
  };

  const handleCheckout = async () => {
    if (!selectedCourse) return;
    setCheckoutStatus('loading');
    setCheckoutError('');

    try {
      // Placeholder checkout — integrate Stripe here later
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCheckoutStatus('success');
    } catch {
      setCheckoutStatus('error');
      setCheckoutError('فشل إتمام الدفع. يرجى المحاولة مرة أخرى.');
    }
  };

  const closeCheckout = () => {
    setSelectedCourse(null);
    setCheckoutStatus('idle');
    setCheckoutError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-600 text-sm font-semibold mb-4">
            <GraduationCap className="w-4 h-4 inline ml-1" />
            منصة التعليم
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            دورات طب الأسنان
          </h1>
          <p className="text-slate-500 leading-relaxed">
            دورات احترافية من د. عمر العماري لتطوير مهاراتك في طب الأسنان الحديث.
            تعلم بأحدث التقنيات والطرق السريرية.
          </p>
        </div>

        {/* Course grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Thumbnail with video player placeholder */}
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedCourse(course)}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-brand-600 mr-1" fill="currentColor" />
                  </div>
                </div>
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level] || 'bg-slate-100 text-slate-700'}`}>
                  {course.level}
                </span>
              </div>

              {/* Course info */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{course.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{course.description}</p>

                <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4" />
                    {course.lessons_count} درساً
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400" fill="currentColor" />
                    ))}
                    <span className="text-xs text-slate-400 mr-1">(4.9)</span>
                  </div>
                  <span className="text-2xl font-extrabold text-brand-600">
                    {course.price}$
                  </span>
                </div>

                <button
                  onClick={() => handleBuyNow(course)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-600/30 hover:bg-brand-700 transition-all duration-200 hover:scale-[1.02]"
                >
                  {user ? (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      اشترِ الآن
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      سجل الدخول للشراء
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeCheckout} />

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-up">
            <button
              onClick={closeCheckout}
              className="absolute top-4 left-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutStatus === 'success' ? (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-3">تم الشراء بنجاح!</h3>
                <p className="text-slate-500 mb-6">
                  يمكنك الآن الوصول إلى جميع دروس دورة «{selectedCourse.title}».
                </p>
                <button
                  onClick={closeCheckout}
                  className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
                >
                  ابدأ التعلم
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-2">إتمام الشراء</h2>
                <p className="text-sm text-slate-500 mb-6">راجع تفاصيل الطلب قبل المتابعة</p>

                {/* Video player placeholder */}
                <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-900 mb-5">
                  <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-7 h-7 text-brand-600 mr-1" fill="currentColor" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-semibold">
                    معاينة الفيديو
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">الدورة</span>
                    <span className="font-semibold text-slate-800 text-sm">{selectedCourse.title}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">عدد الدروس</span>
                    <span className="font-semibold text-slate-800">{selectedCourse.lessons_count} درساً</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">المدة</span>
                    <span className="font-semibold text-slate-800">{selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500 text-sm">السعر</span>
                    <span className="text-2xl font-extrabold text-brand-600">{selectedCourse.price}$</span>
                  </div>
                </div>

                {checkoutStatus === 'error' && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {checkoutError}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={checkoutStatus === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-600/30 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {checkoutStatus === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      ادفع {selectedCourse.price}$
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5" />
                  دفع آمن ومشفّر
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Back to home */}
      <div className="text-center mt-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          <ArrowRight className="w-4 h-4" />
          العودة إلى الرئيسية
        </a>
      </div>
    </div>
  );
}
