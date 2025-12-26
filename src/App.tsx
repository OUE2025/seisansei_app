import { AppHeader } from './components/AppHeader';
import { DetailedChecklist } from './components/DetailedChecklist';
import { Phase1_Intro } from './components/phases/Phase1Intro';
import { Phase2_Buster } from './components/phases/Phase2Buster';
import { Phase3_Check } from './components/phases/Phase3Check';
import { Phase4_Promo } from './components/phases/Phase4Promo';
import { FULL_CHECKLIST_DATA } from './constants';
import { useAppState } from './hooks/useAppState';
import { usePDFGenerator } from './hooks/usePDFGenerator';

export default function App() {
  const { state, isLoaded, actions, computed } = useAppState();
  const { isGenerating, isPdfReady, generatePDF } = usePDFGenerator();

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-medium">Loading Application...</div>;

  const mainContainerClass = state.viewMode === 'checklist' ? 'max-w-6xl' : 'max-w-2xl';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative selection:bg-sky-100 selection:text-sky-800 overflow-x-hidden">

      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 print:hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-3xl opacity-60 delay-1000 animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-50/50 blur-3xl opacity-50 delay-2000"></div>
      </div>

      <AppHeader
        viewMode={state.viewMode}
        currentPhase={state.phase}
        onToggleView={actions.toggleViewMode}
        onReset={actions.resetApp}
        onBack={actions.goBack}
        progressII={computed.progressII}
        progressI={computed.progressI}
      />

      <main className={`${mainContainerClass} mx-auto px-4 pb-32 pt-28 md:pt-32 transition-all duration-500 ease-in-out relative z-10`}>
        {state.viewMode === 'checklist' ? (
          <DetailedChecklist
            data={FULL_CHECKLIST_DATA}
            checkedItems={state.detailedChecklist}
            onToggle={actions.toggleChecklistItem}
            onGeneratePDF={() => generatePDF(FULL_CHECKLIST_DATA, state.detailedChecklist)}
            isPdfReady={isPdfReady}
            isGenerating={isGenerating}
          />
        ) : (
          <div className="transition-opacity duration-300 ease-in">
            {state.phase === 1 && <Phase1_Intro onNext={() => actions.setPhase(2)} />}
            {state.phase === 2 && <Phase2_Buster cleared={state.misunderstandingsCleared} onClear={actions.clearMisunderstanding} onNext={() => actions.setPhase(3)} />}
            {state.phase === 3 && <Phase3_Check answers={state.checkSheetAnswers} onUpdate={actions.updateAnswer} onToggleDevice={actions.toggleDevice} onNext={() => actions.setPhase(4)} />}
            {state.phase === 4 && <Phase4_Promo result={computed.calculateResult} answers={state.checkSheetAnswers} />}
          </div>
        )}
        <p className="text-center text-xs text-slate-400 mt-10">このアプリはAIで作成しています。</p>
      </main>
    </div>
  );
}
