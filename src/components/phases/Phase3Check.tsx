import { Check, CheckCircle2, ChevronRight, ClipboardCheck, HelpCircle, Smartphone, X } from 'lucide-react';
import { TARGET_SERVICES } from '../../constants';
import type { CheckSheetAnswers, DeviceKey } from '../../types';
import { useState } from 'react';

export function Phase3_Check({
  answers,
  onUpdate,
  onToggleDevice,
  onNext,
}: {
  answers: CheckSheetAnswers;
  onUpdate: (key: 'serviceType' | 'wifi', value: boolean) => void;
  onToggleDevice: (key: DeviceKey) => void;
  onNext: () => void;
}) {
  const isComplete = answers.serviceType !== null && answers.wifi !== null;
  const [showServiceList, setShowServiceList] = useState(false);
  const deviceOptions: { key: DeviceKey; label: string; icon: JSX.Element }[] = [
    { key: 'sensor', label: '見守り機器（センサー等）', icon: <CheckCircle2 size={20}/> },
    { key: 'income', label: 'インカム（スマホチャット含）', icon: <Smartphone size={20}/> },
    { key: 'record', label: '介護記録ソフト（Smile One等）', icon: <ClipboardCheck size={20}/> },
  ];

  return (
    <div className="animate-fade-in space-y-10 py-6 relative">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">取得可能性チェック</h2>
        <p className="text-slate-500 font-medium">3つの質問で、あなたの事業所のポテンシャルを判定</p>
      </div>

      {/* Q1 */}
      <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 relative group hover:border-sky-100 transition-colors">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
            <span className="bg-sky-100 text-sky-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shadow-inner">1</span>
            対象サービスですか？
          </h3>
          <button
            onClick={() => setShowServiceList(true)}
            className="text-sky-500 hover:text-sky-600 hover:bg-sky-50 p-2 rounded-full transition-all"
            aria-label="詳細"
          >
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="flex gap-4">
          <SelectionButton
            selected={answers.serviceType === true}
            onClick={() => onUpdate('serviceType', true)}
            label="はい"
          />
          <SelectionButton
            selected={answers.serviceType === false}
            onClick={() => onUpdate('serviceType', false)}
            label="いいえ"
          />
        </div>
      </div>

      {/* Q2 */}
      <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-sky-100 transition-colors">
        <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-3">
          <span className="bg-sky-100 text-sky-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shadow-inner">2</span>
          施設内にWi-Fi環境がありますか？
        </h3>
        <div className="flex gap-4">
          <SelectionButton
            selected={answers.wifi === true}
            onClick={() => onUpdate('wifi', true)}
            label="はい"
          />
          <SelectionButton
            selected={answers.wifi === false}
            onClick={() => onUpdate('wifi', false)}
            label="いいえ"
          />
        </div>
      </div>

      {/* Q3 */}
      <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-sky-100 transition-colors">
        <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-3">
          <span className="bg-sky-100 text-sky-600 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shadow-inner">3</span>
          導入済み・予定の機器（複数選択）
        </h3>
        <div className="space-y-4">
          {deviceOptions.map((item) => (
            <button
              key={item.key}
              onClick={() => onToggleDevice(item.key)}
              className={`w-full text-left p-5 rounded-2xl border-2 flex items-center justify-between transition-all duration-200 ${
                answers.devices[item.key]
                  ? 'border-sky-500 bg-sky-50 text-sky-800 shadow-md ring-2 ring-sky-200 ring-offset-2'
                  : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-300'
              }`}
            >
              <span className="font-bold flex items-center gap-3">{item.icon} {item.label}</span>
              {answers.devices[item.key] && (
                <span className="bg-sky-500 text-white rounded-full p-1 animate-check-pop">
                  <Check size={14} strokeWidth={4} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center pt-6 pb-8">
        <button
          onClick={onNext}
          disabled={!isComplete}
          className={`w-full md:w-auto py-5 px-16 rounded-full font-bold shadow-xl text-lg flex items-center gap-3 justify-center mx-auto transition-all transform ${
            isComplete
              ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white hover:scale-105 hover:shadow-2xl'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          診断結果を見る <ChevronRight />
        </button>
      </div>

      {/* Service List Modal */}
      {showServiceList && (
        <ServiceListModal onClose={() => setShowServiceList(false)} />
      )}
    </div>
  );
}

function SelectionButton({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all duration-200 transform ${
        selected
          ? 'border-sky-500 bg-sky-500 text-white shadow-lg scale-105 ring-4 ring-sky-100'
          : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
}

function ServiceListModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col scale-100 animate-pop-in" onClick={e => e.stopPropagation()}>
        <div className="bg-slate-50 border-b p-5 flex justify-between items-center flex-shrink-0">
          <h3 className="font-bold text-xl text-slate-800">対象サービス一覧</h3>
          <button onClick={onClose} className="bg-white p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-8 overflow-y-auto">
          {TARGET_SERVICES.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-sky-700 mb-3 pb-2 border-b border-sky-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                {section.category}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 pl-4 border-l-2 border-slate-100 hover:border-sky-200 transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
