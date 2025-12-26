import { ChevronRight } from 'lucide-react';
import { TOP_LOGO } from '../../constants';

export function Phase1_Intro({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-16 animate-fade-in-up">
      <div className="mb-16 -mt-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200 shadow-sm text-xs md:text-sm font-bold text-sky-700 tracking-wide">
          Presented by <span className="text-slate-700">株式会社プラスワン</span>
        </span>
      </div>
      <div className="relative mb-10 group">
        <div className="absolute inset-0 bg-sky-200 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div className="bg-gradient-to-br from-white to-sky-50 p-10 rounded-full shadow-2xl relative z-10 border border-white">
          <img
            src={TOP_LOGO}
            alt="生産性向上推進体制加算ロゴ"
            className="w-28 h-28 object-contain drop-shadow-lg"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <h2 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-6 tracking-tight">
        生産性向上推進体制加算<br/>
        <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">あきらめていませんか？</span>
      </h2>

      <p className="text-lg md:text-xl font-bold text-red-500 bg-red-50 px-6 py-2 rounded-full mb-8 inline-block shadow-sm">
        実は『誤解』だらけです。
      </p>

      <p className="text-slate-600 max-w-lg mx-auto text-base md:text-lg leading-relaxed mb-12">
        「要件が難しそう」「現場が大変になりそう」...<br/>
        そんな不安を、たった3分で解消します。<br/>
        <span className="font-bold text-sky-600">あなたの事業所の「本当の可能性」</span>を見つけましょう。
      </p>

      <button
        onClick={onNext}
        className="group relative bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-5 px-12 rounded-full shadow-[0_10px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_15px_30px_rgba(14,165,233,0.4)] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3 text-lg">
          誤解を晴らす <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
}

