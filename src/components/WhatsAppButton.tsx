import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9627XXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="دردش على واتساب"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl shadow-green-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </a>
  );
}
