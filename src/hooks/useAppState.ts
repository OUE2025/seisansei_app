import { useCallback, useEffect, useMemo, useState } from 'react';
import { FULL_CHECKLIST_DATA, INITIAL_STATE, STORAGE_KEY } from '../constants';
import type { AppState, ChecklistItemData, ChecklistSubItemData, DeviceKey, ResultType } from '../types';

// --- useAppState Hook ---
export function useAppState() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restoredChecklist = parsed?.detailedChecklist ?? {};
        setState(prev => ({ ...prev, detailedChecklist: restoredChecklist }));
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const payload = { detailedChecklist: state.detailedChecklist };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  }, [state, isLoaded]);

  const setPhase = (phase: AppState['phase']) => {
    setState(prev => ({ ...prev, phase, viewMode: 'wizard' } as AppState));
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (state.phase > 1) {
      setState(prev => {
        const previousPhase = (prev.phase - 1) as AppState['phase'];
        return { ...prev, phase: previousPhase };
      });
      window.scrollTo(0, 0);
    }
  };

  const toggleViewMode = () => {
    window.scrollTo(0, 0);
    setState(prev => ({
      ...prev,
      viewMode: prev.viewMode === 'checklist' ? 'wizard' : 'checklist'
    }));
  };

  const clearMisunderstanding = (index: number) => {
    const newCleared = [...state.misunderstandingsCleared];
    newCleared[index] = !newCleared[index];
    setState(prev => ({ ...prev, misunderstandingsCleared: newCleared }));
  };

  const updateAnswer = (key: 'serviceType' | 'wifi', value: boolean) => {
    setState(prev => ({
      ...prev,
      checkSheetAnswers: { ...prev.checkSheetAnswers, [key]: value }
    }));
  };

  const toggleDevice = (deviceKey: DeviceKey) => {
    setState(prev => ({
      ...prev,
      checkSheetAnswers: {
        ...prev.checkSheetAnswers,
        devices: {
          ...prev.checkSheetAnswers.devices,
          [deviceKey]: !prev.checkSheetAnswers.devices[deviceKey]
        }
      }
    }));
  };

  const toggleChecklistItem = (id: string) => {
    setState(prev => {
       const newChecklist = { ...prev.detailedChecklist };
       let targetItem: ChecklistItemData | ChecklistSubItemData | null = null;
       let parentItem: ChecklistItemData | null = null;

      // Search for item and its parent
      for (const section of FULL_CHECKLIST_DATA) {
        for (const item of section.items) {
          if (item.id === id) targetItem = item;
          if (item.subItems) {
            for (const subItem of item.subItems) {
              if (subItem.id === id) {
                targetItem = subItem;
                parentItem = item;
              }
            }
          }
          if (targetItem) break;
        }
        if (targetItem) break;
      }

      if (!targetItem) return prev;

      const nextValue = !newChecklist[id];
      newChecklist[id] = nextValue;

      // Logic: Parent -> Children
      if ('subItems' in targetItem && targetItem.subItems) {
        targetItem.subItems.forEach((sub: ChecklistSubItemData) => {
          newChecklist[sub.id] = nextValue;
        });
      }

      // Logic: Child -> Parent
      if (parentItem && parentItem.subItems) {
        const isOrLogic = parentItem.id === 'ii_2';
        if (isOrLogic) {
          const anyChecked = parentItem.subItems.some(sub =>
            sub.id === id ? nextValue : newChecklist[sub.id]
          );
          newChecklist[parentItem.id] = anyChecked;
        } else {
          const allChecked = parentItem.subItems.every(sub =>
            sub.id === id ? nextValue : newChecklist[sub.id]
          );
          newChecklist[parentItem.id] = allChecked;
        }
      }

      return { ...prev, detailedChecklist: newChecklist };
    });
  };

  const resetApp = () => {
    setState(INITIAL_STATE);
    localStorage.removeItem(STORAGE_KEY);
    window.scrollTo(0, 0);
  };

   const calculateResult = useMemo<ResultType>(() => {
   const { serviceType, wifi, devices } = state.checkSheetAnswers;
   const deviceCount = Object.values(devices).filter(Boolean).length;
   const hasAnyDevice = deviceCount >= 1;

    if (serviceType === false) return 'B';
    if (!hasAnyDevice) return 'A';

    if (wifi === false) return 'S';      // Wi-Fiなしでも機器があればS
    if (wifi === true) return 'S';       // Wi-Fiありで機器があればS
    return 'A';                          // Wi-Fi未回答はA
  }, [state.checkSheetAnswers]);

  const calculateProgress = useCallback((excludeIndex: number | null = null) => {
    let total = 0;
    let checked = 0;
    FULL_CHECKLIST_DATA.forEach((section, index) => {
      if (excludeIndex !== null && index === excludeIndex) return;
      section.items.forEach(item => {
        total++;
        if (state.detailedChecklist[item.id]) checked++;
        if (item.subItems) {
          item.subItems.forEach(subItem => {
            total++;
            if (state.detailedChecklist[subItem.id]) checked++;
          });
        }
      });
    });
    return total === 0 ? 0 : Math.round((checked / total) * 100);
  }, [state.detailedChecklist]);

  return {
    state,
    isLoaded,
    actions: {
      setPhase,
      goBack,
      toggleViewMode,
      clearMisunderstanding,
      updateAnswer,
      toggleDevice,
      toggleChecklistItem,
      resetApp
    },
    computed: {
      calculateResult,
      progressII: calculateProgress(2),
      progressI: calculateProgress(null)
    }
  };
}
