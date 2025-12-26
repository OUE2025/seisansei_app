import { Check, ChevronRight, Clock, Sun } from 'lucide-react';
import { FUBUKI_LEFT, FUBUKI_RIGHT, GOKAI_ANSWER, GOKAI_ANSWER_2, GOKAI_ANSWER_3, GOKAI_CLOUD, GOKAI_CLOUD_2, GOKAI_CLOUD_3, QUESTIONS } from '../../constants';

export function Phase2_Buster({
  cleared,
  onClear,
  onNext,
}: {
  cleared: boolean[];
  onClear: (index: number) => void;
  onNext: () => void;
}) {
  const allCleared = cleared.every(Boolean);

  return (
    <div className="animate-fade-in space-y-8 py-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-3">3つの「誤解」を晴らしましょう</h2>
        <p className="text-slate-500 font-medium">雲をタップして、隠れた真実を見つけてください</p>
      </div>

      <div className="space-y-5">
        {QUESTIONS.map((q, index) => (
          <div
            key={q.id}
            onClick={() => onClear(index)}
            className={`relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer h-[400px] group border ${
              cleared[index]
                ? 'bg-gradient-to-br from-orange-50 to-white border-orange-100 shadow-md'
                : 'bg-white border-slate-100 hover:border-sky-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            {/* Cloud (Overlay) */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center bg-slate-100/90 backdrop-blur-sm transition-all duration-700 z-10 p-6 ${
              cleared[index] ? 'opacity-0 pointer-events-none translate-y-full' : 'opacity-100'
            }`}>
              <img
                src={
                  index === 1
                    ? GOKAI_CLOUD_2
                    : index === 2
                      ? GOKAI_CLOUD_3
                      : GOKAI_CLOUD
                }
                alt="雲アイコン"
                className="mb-3 drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                style={{ width: 240, height: 240 }}
                loading="lazy"
                decoding="async"
              />
              <p className="font-bold text-slate-600 text-lg">{q.cloudText}</p>
              <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Tap to clear</p>
            </div>

            {/* Sun (Content) */}
            <div className={`absolute inset-0 flex h-full items-center p-6 md:p-8 transition-all duration-500 delay-100 relative ${
              cleared[index] ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
            }`}>
              <div className="flex h-full items-center w-full">
                <div className="flex items-start gap-5">
                  <div className="bg-orange-100 p-3 rounded-full flex-shrink-0 text-orange-500">
                    <Sun size={28} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-600 text-xl mb-1">{q.sunText}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{q.detail}</p>
                  </div>
                </div>
              </div>
              {cleared[index] && (
                <img
                  src={
                    index === 1
                      ? GOKAI_ANSWER_2
                      : index === 2
                        ? GOKAI_ANSWER_3
                        : GOKAI_ANSWER
                  }
                  alt="回答中イメージ"
                  className="absolute bottom-4 right-4 w-28 h-28 md:w-36 md:h-36 object-contain opacity-0 animate-answer-rise"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-24 flex items-center justify-center">
        {allCleared ? (
          <div className="animate-bounce-in text-center">
            <p className="text-sky-600 font-bold mb-4 animate-pulse">すべての誤解が解けました！</p>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-200 flex items-center gap-2 mx-auto transform hover:scale-105 transition-all"
            >
              取得可能性をチェック <ChevronRight />
            </button>
          </div>
        ) : (
          <div className="text-slate-300 text-sm font-medium flex items-center gap-2">
            <Clock size={16} /> 残りの誤解: {cleared.filter(c => !c).length}つ
          </div>
        )}
      </div>

      <StepUpCard />
    </div>
  );
}

function StepUpCard() {
  return (
    <div className="bg-blue-50/80 border border-blue-100 p-6 rounded-2xl text-sm text-slate-600 leading-relaxed flex gap-4 items-start">
      <div className="bg-blue-200 text-blue-700 p-1.5 rounded-full mt-0.5"><Check size={16} strokeWidth={3}/></div>
      <div>
        <h4 className="font-bold text-blue-800 mb-1 text-base">ステップアップが基本です</h4>
        いきなり高い目標を掲げる必要はありません。国も「まずは加算（Ⅱ）で慣れてから、加算（Ⅰ）へ」という段階的な取り組みを推奨しています。
      </div>
    </div>
  );
}
