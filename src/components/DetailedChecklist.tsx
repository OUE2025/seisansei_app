import { Check, Download, FileText, Loader2 } from 'lucide-react';
import type { ChecklistItemData, ChecklistSectionData, ChecklistSubItemData } from '../types';

export function DetailedChecklist({
  data,
  checkedItems,
  onToggle,
  onGeneratePDF,
  isPdfReady,
  isGenerating,
}: {
  data: ChecklistSectionData[];
  checkedItems: Record<string, boolean>;
  onToggle: (id: string) => void;
  onGeneratePDF: () => void;
  isPdfReady: boolean;
  isGenerating: boolean;
}) {
  return (
    <div className="animate-fade-in-up bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-6 md:p-12 print:shadow-none print:p-0 border border-white/50">
      <div className="relative mb-10 border-b border-slate-100 pb-6 print:border-none">
        <div className="flex flex-col gap-3 w-full pr-0 md:pr-40">
          <h2 className="text-[1.7rem] md:text-4xl font-black text-slate-800 mb-3 tracking-tight">
            生産性向上推進体制加算<br className="md:hidden"/> <span className="text-sky-600">取得チェックリスト</span>
          </h2>
          <p className="text-base text-slate-500 print:text-black leading-relaxed">
            厚生労働省の最新資料に基づいた完全ガイド。進捗を保存して管理できます。
          </p>
        </div>

        <div className="flex justify-end mt-3 md:mt-0 md:absolute md:top-0 md:right-0">
          <button
            onClick={onGeneratePDF}
            disabled={!isPdfReady || isGenerating}
            className={`px-5 py-2.5 rounded-2xl transition-all shadow-sm hover:shadow-md border group flex items-center gap-2 ${
              isPdfReady && !isGenerating
                ? 'bg-slate-50 hover:bg-white text-slate-600 hover:text-sky-600 border-slate-100 cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-100'
            }`}
            title="PDF出力"
          >
            {isGenerating ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Download size={20} className="group-hover:scale-110 transition-transform" />
            )}
            <span className="text-sm font-bold">{isGenerating ? '生成中...' : 'PDF作成'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-10">
        {data.map((section, sIdx) => (
          <ChecklistSection
            key={sIdx}
            section={section}
            checkedItems={checkedItems}
            onToggle={onToggle}
          />
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-slate-100 text-center">
        <p className="text-base text-slate-400 leading-relaxed">
          ※ 本リストの内容は最新の介護報酬改定情報に基づきますが、<br/>
          正式な申請にあたっては必ず指定権者（自治体）の要件をご確認ください。
        </p>
      </div>
    </div>
  );
}

function ChecklistSection({
  section,
  checkedItems,
  onToggle,
}: {
  section: ChecklistSectionData;
  checkedItems: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="break-inside-avoid">
      <div className="relative pl-6 mb-6">
        <div className="absolute left-0 top-1 bottom-1 w-1.5 bg-gradient-to-b from-sky-400 to-blue-500 rounded-full"></div>
        <h3 className="font-bold text-2xl text-slate-800">{section.category}</h3>
        {section.description && <p className="text-sm font-medium text-sky-600 mt-1">{section.description}</p>}
      </div>

      <div className="space-y-4">
        {section.items.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            checkedItems={checkedItems}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

function ChecklistItem({
  item,
  checkedItems,
  onToggle,
}: {
  item: ChecklistItemData;
  checkedItems: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const isChecked = checkedItems[item.id];

  return (
    <div className={`group relative transition-all duration-300 rounded-2xl border ${isChecked ? 'bg-sky-50/50 border-sky-100' : 'bg-white border-transparent hover:border-slate-100 hover:shadow-sm'}`}>
      <div className="flex gap-5 items-start p-4">
        <div className="pt-1 flex-shrink-0">
          <button
            onClick={() => onToggle(item.id)}
            className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
              isChecked
                ? 'bg-sky-500 border-sky-500 text-white shadow-md scale-105'
                : 'bg-white border-slate-200 text-transparent hover:border-sky-300'
            }`}
          >
            <Check size={20} strokeWidth={4} className={isChecked ? 'animate-check-pop' : ''} />
          </button>
        </div>
        <div className="flex-1">
          <div
            onClick={() => onToggle(item.id)}
            className="cursor-pointer"
          >
            <h4 className={`font-bold text-lg mb-2 leading-snug transition-colors ${isChecked ? 'text-sky-800' : 'text-slate-800'}`}>
              {item.label}
            </h4>
            <p className={`text-base leading-relaxed whitespace-pre-wrap transition-colors ${isChecked ? 'text-sky-700/80' : 'text-slate-600'}`}>
              {item.detail}
            </p>
          </div>

          {/* Sub Items */}
          {item.subItems && (
            <div className="mt-4 space-y-3 bg-white/50 rounded-xl p-4 border border-slate-100/50">
              {item.subItems.map((subItem) => {
                const isSubChecked = checkedItems[subItem.id];
                return (
                  <div key={subItem.id} className="flex gap-3 items-start group/sub">
                     <button
                      onClick={() => onToggle(subItem.id)}
                      className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSubChecked
                          ? 'bg-sky-400 border-sky-400 text-white'
                          : 'bg-white border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {isSubChecked && <Check size={14} strokeWidth={4} />}
                    </button>
                    <div
                      onClick={() => onToggle(subItem.id)}
                      className={`text-base cursor-pointer leading-relaxed transition-colors ${isSubChecked ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700 group-hover/sub:text-sky-700'}`}
                    >
                      {subItem.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {item.source && (
            <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-slate-400">
              <FileText size={12} />
              <span>出典: {item.source}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

