import React, { useMemo } from 'react';
import { AlertCircle, BarChart3, CheckCircle2, ChevronRight, ClipboardCheck, Clock, CornerDownRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import { FUBUKI_LEFT, FUBUKI_RIGHT } from '../../constants';
import type { CheckSheetAnswers, ResultType } from '../../types';


export function Phase4_Promo({
  result,
  answers,
}: {
  result: ResultType;
  answers: CheckSheetAnswers;
}) {
  const resultData = {
    S: {
      gradient: 'from-orange-400 to-red-500',
      shadow: 'shadow-orange-200',
      icon: <CheckCircle2 className="text-yellow-200 w-12 h-12 mb-2 animate-pulse" />,
      title: '判定S：加算(Ⅰ)候補',
      message: 'おめでとうございます！最高ランクの『加算(Ⅰ)』（月100単位）を狙えるポテンシャルがあります！',
    },
    A: {
      gradient: 'from-sky-400 to-blue-500',
      shadow: 'shadow-blue-200',
      icon: <CheckCircle2 className="text-blue-200 w-12 h-12 mb-2" />,
      title: '判定A：加算(Ⅱ)候補',
      message: '準備は整っています！まずは『加算(Ⅱ)』（月10単位）からスタートして、体制を作りましょう。',
    },
    B: {
      gradient: 'from-slate-400 to-slate-600',
      shadow: 'shadow-slate-200',
      icon: <CornerDownRight className="text-slate-300 w-12 h-12 mb-2" />,
      title: '判定B：対象外です',
      message: '残念です。お客様の事業所は対象外です。',
    }
  };

  const currentResult = resultData[result];
  const isTargetB = result === 'B';
  const { hasRecord, noDevicesSelected, onlyNonRecordSelected } = getDeviceStatus(answers);
  const showConfetti = result === 'S';

  return (
    <div className="animate-fade-in pb-12 pt-4">
      {/* Result Card */}
      <div className={`relative bg-gradient-to-br ${currentResult.gradient} text-white p-10 rounded-[2.5rem] shadow-2xl ${currentResult.shadow} text-center mb-12 transform transition-all duration-1000 translate-y-0 overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent"></div>
        {showConfetti && <ConfettiOverlay />}
        {showConfetti && (
          <>
            <img
              src={FUBUKI_LEFT}
              alt=""
              className="absolute bottom-0 left-0 w-28 md:w-40 pointer-events-none select-none"
              loading="lazy"
              decoding="async"
            />
            <img
              src={FUBUKI_RIGHT}
              alt=""
              className="absolute bottom-0 right-0 w-28 md:w-40 pointer-events-none select-none"
              loading="lazy"
              decoding="async"
            />
          </>
        )}
        <div className="relative z-10 flex flex-col items-center">
          {currentResult.icon}
          <h2 className="text-3xl md:text-4xl font-black mb-4 drop-shadow-md tracking-tight">{currentResult.title}</h2>
          <div className="w-16 h-1 bg-white/30 rounded-full mb-6"></div>
          <p
            className={`text-lg md:text-xl font-medium leading-relaxed opacity-95 max-w-xl ${
              showConfetti ? 'bg-black/40 px-4 py-3 rounded-2xl inline-block' : ''
            }`}
          >
            {currentResult.message}
          </p>
        </div>
      </div>

      {/* Pain Point */}
      <div className="bg-slate-800 text-slate-100 p-8 md:p-10 rounded-3xl shadow-xl mb-10 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
          <Clock size={200} />
        </div>

        {noDevicesSelected && !isTargetB && (
          <div className="mb-6 p-4 bg-slate-700/70 rounded-2xl border border-slate-600 flex items-start gap-3 animate-answer-rise text-base md:text-lg">
            <div className="mt-1 text-yellow-300">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="text-yellow-200 font-bold leading-snug">介護記録ソフトの導入をおすすめします。</p>
              <p className="text-slate-200 leading-relaxed mt-1">
                加算取得には、転記不要で記録・情報共有・請求を一元管理できる<strong className="text-white border-b border-yellow-300 mx-1">「介護記録ソフト Smile One」</strong>の導入がお手軽で簡単です。
              </p>
            </div>
          </div>
        )}
        {onlyNonRecordSelected && !isTargetB && (
          <div className="mb-6 p-4 bg-slate-700/70 rounded-2xl border border-slate-600 flex items-start gap-3 animate-answer-rise text-base md:text-lg">
            <div className="mt-1 text-yellow-300">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="text-yellow-200 font-bold leading-snug">介護記録ソフトの導入が必要です</p>
              <p className="text-slate-200 leading-relaxed mt-1">
                加算取得には、転記不要で記録・情報共有・請求を一元管理できる<strong className="text-white border-b border-yellow-300 mx-1">「介護記録ソフト」</strong>の導入が必須要件となります。<strong className="text-white border-b border-yellow-300 mx-1">「介護記録ソフト Smile One」</strong>の導入がお手軽で簡単です。
              </p>
            </div>
          </div>
        )}

        <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-yellow-400">
          <AlertCircle className="fill-yellow-400 text-slate-800" />
          {isTargetB ? '業務改善の第一歩として' : 'ただし、注意点があります'}
        </h3>

        <div className="space-y-4 relative z-10 text-base md:text-lg text-slate-300 leading-relaxed">
          {isTargetB ? (
            <>
              <p>
                加算対象外でも、本質的な業務改善を進めるには<strong className="text-white bg-white/10 px-2 py-0.5 rounded mx-1">『現状の可視化』</strong>が不可欠です。
              </p>
              <p>
                具体的には、ムリ・ムダを特定する<strong className="text-white border-b-2 border-yellow-400 mx-1">『タイムスタディ調査』</strong>が有効です。<br/>
                しかし、これを手作業で集計するのは、現場にとって過酷な作業です…。
              </p>
               <p>
                弊社の<strong className="text-white border-b-2 border-yellow-400 mx-1">『タイムスタディアプリ』</strong>はボタン一つでスタートストップできて簡単に記録・集計できますので、おすすめです。
              </p>
            </>
          ) : (
            <>
              <p>
                上位の加算（Ⅰ）を取るには<strong className="text-white bg-white/10 px-2 py-0.5 rounded mx-1">「成果の証明」</strong>が必須です。
              </p>
              <p>
                具体的には、紙とストップウォッチを使った<strong className="text-white border-b-2 border-yellow-400 mx-1">「タイムスタディ調査」</strong>が必要です。<br/>
                これを手作業で集計するのは、現場にとって過酷な作業です…。
                </p>
                <p>
                弊社の<strong className="text-white border-b-2 border-yellow-400 mx-1">『タイムスタディアプリ』</strong>はボタン一つでスタートストップできて簡単に記録・集計できますので、おすすめです。
              </p>
            </>
          )}
        </div>
      </div>

      {/* New Product Section if no record software */}
      {!hasRecord && (
        <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden mb-12">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-pink-500"></div>
            <div className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide shadow-md shadow-orange-200">
              記録・請求業務を劇的に効率化
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-8 tracking-tight">
              Smile One <span className="text-slate-400 text-2xl mx-1">&</span> Smile Web+
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-xl text-orange-500">
                  <Tablet size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">音声入力＆タブレット</h4>
                  <p className="text-sm text-slate-500">直感的な操作で、現場の記録負担を大幅軽減。転記ゼロへ。</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex items-start gap-4">
                <div className="bg-pink-100 p-3 rounded-xl text-pink-500">
                  <Monitor size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">請求連動＆LINE連携</h4>
                  <p className="text-sm text-slate-500">記録から請求まで一気通貫。家族との連携もスムーズに。</p>
                </div>
              </div>
            </div>

            <a
              href="https://plus1jp.com/product/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Smileシリーズの詳細を見る <ChevronRight size={20} />
            </a>
            <p className="mt-3 text-xs text-slate-400">※ 外部サイトへ移動します</p>
        </div>
      )}

      {/* Solution (Gain) */}
      <div className="bg-white border border-indigo-50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

        <div className="inline-block bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide shadow-md shadow-indigo-200">
          現場の負担ゼロへ
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">タイムスタディアプリ</h3>
        <p className="text-slate-500 mb-10 text-lg">スマホでタップするだけ。集計・報告まで全自動。</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
          <FeatureCard icon={<Smartphone className="text-white" size={24}/>} title="スマホで完結" desc="ストップウォッチ不要" color="bg-indigo-500" />
          <FeatureCard icon={<BarChart3 className="text-white" size={24}/>} title="自動グラフ化" desc="エクセル入力ゼロ" color="bg-purple-500" />
          <FeatureCard icon={<ClipboardCheck className="text-white" size={24}/>} title="一発出力" desc="厚労省報告対応" color="bg-pink-500" />
        </div>

        <CampaignBanner
          className="mb-6"
          title="今だけ！無料トライアルキャンペーン実施中！"
          description="現在、無料でタイムスタディアプリを導入できるキャンペーンを実施中です。"
        />

        <div className="space-y-4 max-w-md mx-auto">
          <a
            href="https://plus1jp.com/timestudy/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-200 transition transform hover:-translate-y-1 hover:shadow-2xl text-lg flex items-center justify-center gap-2"
          >
            アプリの詳細を見る <ChevronRight size={20} />
          </a>
        </div>

        <p className="mt-8 text-xs text-slate-400 font-medium">
          ※ 外部サイトへ移動します
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 group">
      <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h4 className="font-bold text-slate-700 text-base mb-1">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}

function ConfettiOverlay() {
  const pieces = useMemo(() => (
    Array.from({ length: 80 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 1.5,
      size: 6 + Math.random() * 8,
      color: ['#fbbf24', '#38bdf8', '#f472b6'][Math.floor(Math.random() * 3)],
    }))
  ), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((p, idx) => (
        <span
          key={idx}
          className="absolute animate-confetti block"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 2}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

function CampaignBanner({ title, description, className = '' }: { title: string; description: string; className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400/90 to-pink-500/90 text-white shadow-lg shadow-amber-200/50 ${className}`}>
      <span className="text-sm md:text-base font-black tracking-wide">{title}</span>
      <span className="text-xs md:text-sm font-semibold opacity-95">{description}</span>
    </div>
  );
}


function getDeviceStatus(answers: CheckSheetAnswers) {
  const hasRecord = answers?.devices?.record;
  const deviceCount = answers?.devices ? Object.values(answers.devices).filter(Boolean).length : 0;
  return {
    hasRecord,
    noDevicesSelected: deviceCount === 0,
    onlyNonRecordSelected: !hasRecord && deviceCount > 0,
  };
}
