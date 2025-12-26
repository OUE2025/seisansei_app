import { useEffect, useState } from 'react';
import { FONT_NAME, FONT_URL, JSPDF_URL } from '../constants';
import type { ChecklistSectionData } from '../types';

// Utilities
// ==========================================

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

// ==========================================
// Custom Hooks
// ==========================================

// --- usePDFGenerator Hook ---
// Handles font loading and PDF generation logic using jsPDF
export function usePDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPdfReady, setIsPdfReady] = useState(false);

  useEffect(() => {
    loadScript(JSPDF_URL).then(() => {
      setIsPdfReady(true);
    }).catch(err => console.error("Failed to load PDF library", err));
  }, []);

  const generatePDF = async (data: ChecklistSectionData[], checkedItems: Record<string, boolean>) => {
    if (!window.jspdf) {
      alert("PDF生成ライブラリの読み込み中です。少々お待ちください。");
      return;
    }

    setIsGenerating(true);

    try {
      // 1. Fetch Japanese Font
      const fontRes = await fetch(FONT_URL);
      if (!fontRes.ok) throw new Error("Failed to fetch font");
      const fontBlob = await fontRes.blob();

      const fontBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === 'string') {
              const base64data = result.split(',')[1];
              resolve(base64data);
            } else {
              reject(new Error('Failed to read font data'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(fontBlob);
      });

      // 2. Initialize jsPDF
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: true });

      // Set Metadata
      doc.setProperties({ title: "生産性向上推進体制加算 取得チェックリスト" });

      // 3. Add & Set Font
      doc.addFileToVFS("ZenKakuGothicNew-Regular.ttf", fontBase64);
      doc.addFont("ZenKakuGothicNew-Regular.ttf", FONT_NAME, "normal");
      doc.setFont(FONT_NAME);

      // 4. Layout Constants
      const margin = 15;
      const pageWidth = 210;
      const pageHeight = 297;
      const contentWidth = pageWidth - (margin * 2);
      const bottomLimit = pageHeight - margin;
      let y = margin;

      const checkColor = [14, 165, 233] as const; // Sky-500
      const grayColor = [148, 163, 184] as const; // Slate-400

      // Helper: Check Page Break
      const checkPageBreak = (heightNeeded: number) => {
        if (y + heightNeeded > bottomLimit) {
          doc.addPage();
          y = margin;
          return true;
        }
        return false;
      };

      // Helper: Calculate text height
      const getTextHeight = (text: string | null | undefined, fontSize: number, maxWidth: number) => {
        if (!text) return 0;
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        return lines.length * (fontSize * 0.3527 * 1.5);
      };

      // 5. Draw Header
      doc.setFontSize(22);
      doc.setTextColor(0, 0, 0);
      doc.text("生産性向上推進体制加算 取得チェックリスト", margin, y + 8);
      y += 18;

      doc.setFontSize(10);
      doc.setTextColor(...grayColor);
      doc.text("本チェックリストは厚生労働省の資料に基づき作成されています。", margin, y);
      y += 15;

      // 6. Draw Content Loop
      for (const section of data) {
        // Section Header Height Calc
        const secTitleHeight = 12;
        let descHeight = 0;
        if(section.description) {
            descHeight = getTextHeight(section.description, 9, contentWidth) + 5;
        }
        checkPageBreak(secTitleHeight + descHeight + 10);

        // Section Background & Title
        doc.setFillColor(240, 249, 255);
        doc.rect(margin, y, contentWidth, 12, 'F');
        doc.setFillColor(...checkColor);
        doc.rect(margin, y, 1.5, 12, 'F');

        doc.setFontSize(14);
        doc.setTextColor(30, 58, 138);
        doc.text(section.category, margin + 4, y + 8);
        y += 18;

        if(section.description) {
           doc.setFontSize(9);
           doc.setTextColor(...checkColor);
           const descLines = doc.splitTextToSize(section.description, contentWidth);
           doc.text(descLines, margin, y);
           y += descHeight;
        } else {
           y += 5;
        }

        // Items Loop
        for (const item of section.items) {
           const isChecked = checkedItems[item.id];

           // Calculate total height needed for item
           const titleH = getTextHeight(item.label, 11, contentWidth - 10) + 2;
           const detailH = getTextHeight(item.detail, 9, contentWidth - 10) + 2;
           let subItemsH = 0;
           if (item.subItems) {
               for (const sub of item.subItems) {
                   subItemsH += getTextHeight(sub.text, 9, contentWidth - 25) + 3;
               }
               if (item.subItems.length > 0) subItemsH += 2;
           }
           let sourceH = 0;
           if (item.source) {
               sourceH = getTextHeight(`出典: ${item.source}`, 7, contentWidth - 10) + 3;
           }

           // Check Page Break for Item
           checkPageBreak(titleH + detailH + subItemsH + sourceH + 10);

           // Checkbox
           doc.setDrawColor(203, 213, 225);
           doc.setFillColor(255, 255, 255);
           if (isChecked) {
             doc.setDrawColor(...checkColor);
             doc.setFillColor(...checkColor);
           }
           doc.roundedRect(margin, y, 6, 6, 1, 1, 'FD');

           if (isChecked) {
             doc.setDrawColor(255, 255, 255);
             doc.setLineWidth(0.8);
             doc.line(margin + 1.5, y + 3, margin + 2.5, y + 4.5);
             doc.line(margin + 2.5, y + 4.5, margin + 4.5, y + 1.5);
           }

           // Title
           doc.setFontSize(11);
           doc.setTextColor(isChecked ? 21 : 51, isChecked ? 90 : 65, isChecked ? 153 : 85);
           const titleLines = doc.splitTextToSize(item.label, contentWidth - 10);
           doc.text(titleLines, margin + 10, y + 4.5);
           y += titleH + 1;

           // Detail
           doc.setFontSize(9);
           doc.setTextColor(71, 85, 105);
           const detailLines = doc.splitTextToSize(item.detail, contentWidth - 10);
           doc.text(detailLines, margin + 10, y);
           y += detailH + 2;

           // SubItems
           if (item.subItems) {
             for (const sub of item.subItems) {
                const isSubChecked = checkedItems[sub.id];

                doc.setDrawColor(203, 213, 225);
                doc.setFillColor(255, 255, 255);
                if (isSubChecked) {
                  doc.setDrawColor(...checkColor);
                  doc.setFillColor(56, 189, 248);
                }
                doc.roundedRect(margin + 12, y, 4, 4, 0.5, 0.5, 'FD');

                if (isSubChecked) {
                  doc.setDrawColor(255, 255, 255);
                  doc.line(margin + 13, y + 2, margin + 13.5, y + 3);
                  doc.line(margin + 13.5, y + 3, margin + 15, y + 1);
                }

                doc.setFontSize(9);
                doc.setTextColor(isSubChecked ? 148 : 51, isSubChecked ? 163 : 65, isSubChecked ? 184 : 85);
                const subLines = doc.splitTextToSize(sub.text, contentWidth - 25);
                doc.text(subLines, margin + 20, y + 3);
                y += getTextHeight(sub.text, 9, contentWidth - 25) + 3;
             }
             y += 2;
           }

           // Source
           if (item.source) {
             doc.setFontSize(7);
             doc.setTextColor(...grayColor);
             const sourceLines = doc.splitTextToSize(`出典: ${item.source}`, contentWidth - 10);
             doc.text(sourceLines, margin + 10, y);
             y += sourceH;
           }
           y += 4;
        }
        y += 6;
      }

      // 7. Output
      const pdfBlob = doc.output('bloburl');
      window.open(pdfBlob, '_blank');

    } catch (error) {
      console.error("PDF Gen Error", error);
      alert("PDF生成中にエラーが発生しました。\n(日本語フォントの読み込みに失敗した可能性があります。通信環境を確認してください)");
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, isPdfReady, generatePDF };
}
