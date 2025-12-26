import { ArrowLeft, ListTodo, RotateCcw, Smartphone } from 'lucide-react';
import type { AppState } from '../types';

export function AppHeader({
  viewMode,
  currentPhase,
  onToggleView,
  onReset,
  onBack,
  progressII,
  progressI,
}: {
  viewMode: AppState['viewMode'];
  currentPhase: AppState['phase'];
  onToggleView: () => void;
  onReset: () => void;
  onBack: () => void;
  progressII: number;
  progressI: number;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-4 py-3 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            {(viewMode === 'checklist' || (viewMode === 'wizard' && currentPhase > 1)) && (
              <button
                onClick={viewMode === 'checklist' ? onToggleView : onBack}
                className="text-slate-400 hover:text-sky-600 transition-colors p-1 hover:bg-slate-100 rounded-full"
                title="戻る"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-base md:text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent truncate flex items-center gap-2">
              {viewMode === 'checklist' ? (
                <span className="flex items-center gap-2 text-slate-800"><ListTodo className="text-sky-500" /> 取得チェックリスト</span>
              ) : (
                <span className="flex items-center gap-2">生産性向上推進体制加算ナビ</span>
              )}
            </h1>
          </div>

          <div className="flex flex-row items-center justify-end gap-2 sm:gap-3">
            <button
              onClick={onToggleView}
              aria-label={viewMode === 'checklist' ? '診断に戻る' : 'チェックリストを開く'}
              className={`flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold transition-all shadow-sm ${
                viewMode === 'checklist'
                  ? 'bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600'
              }`}
            >
              {viewMode === 'checklist' ? <Smartphone size={16} /> : <ListTodo size={16} />}
            </button>

            <button
              onClick={onReset}
              aria-label="トップへ戻る"
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {viewMode === 'checklist' && (
          <div className="flex gap-6 pt-2 border-t border-slate-100/50 mt-2 animate-slide-down">
            <div className="flex-1 group cursor-default">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-[10px] font-bold text-sky-600 tracking-wide uppercase">加算（Ⅱ）達成度</span>
                <span className="text-sm font-black text-sky-600 font-mono">{progressII}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                  style={{ width: `${progressII}%` }}
                ></div>
              </div>
            </div>

            <div className="flex-1 group cursor-default">
                <div className="flex justify-between items-end mb-1.5">
                <span className="text-[10px] font-bold text-orange-600 tracking-wide uppercase">加算（Ⅰ）達成度</span>
                <span className="text-sm font-black text-orange-600 font-mono">{progressI}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                  style={{ width: `${progressI}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
