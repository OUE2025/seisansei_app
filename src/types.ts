export type DeviceKey = 'sensor' | 'income' | 'record';
export type ResultType = 'S' | 'A' | 'B';

export type ChecklistSubItemData = { id: string; text: string };
export type ChecklistItemData = {
  id: string;
  label: string;
  detail: string;
  source?: string;
  subItems?: ChecklistSubItemData[];
};
export type ChecklistSectionData = {
  category: string;
  description: string | null;
  items: ChecklistItemData[];
};

export type CheckSheetAnswers = {
  serviceType: boolean | null;
  wifi: boolean | null;
  devices: Record<DeviceKey, boolean>;
};

export type AppState = {
  phase: 1 | 2 | 3 | 4; // 1: Intro, 2: Buster, 3: Check, 4: Result/Promo
  viewMode: 'wizard' | 'checklist';
  misunderstandingsCleared: boolean[];
  checkSheetAnswers: CheckSheetAnswers;
  detailedChecklist: Record<string, boolean>;
};

declare global {
  interface Window {
    jspdf?: typeof import('jspdf');
  }
}

export {};
