import { AppState, ChecklistSectionData } from './types';

// ==========================================
// Constants & Configuration
// ==========================================
export const STORAGE_KEY = 'productivity_app_state_v14';
export const JSPDF_URL = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
export const FONT_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/zenkakugothicnew/ZenKakuGothicNew-Regular.ttf';
export const FONT_NAME = "ZenKakuGothicNew-Regular";

export const assetUrl = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const TOP_LOGO = assetUrl('top01.webp');
export const GOKAI_CLOUD = assetUrl('gokai01.webp');
export const GOKAI_CLOUD_2 = assetUrl('gokai02.webp');
export const GOKAI_CLOUD_3 = assetUrl('gokai03.webp');
export const GOKAI_ANSWER = assetUrl('gokai01a.webp');
export const GOKAI_ANSWER_2 = assetUrl('gokai02a.webp');
export const GOKAI_ANSWER_3 = assetUrl('gokai03a.webp');
export const FUBUKI_LEFT = assetUrl('fubuki01.webp');
export const FUBUKI_RIGHT = assetUrl('fubuki02.webp');

export const INITIAL_STATE: AppState = {
  phase: 1,
  viewMode: 'wizard',
  misunderstandingsCleared: [false, false, false],
  checkSheetAnswers: {
    serviceType: null,
    wifi: null,
    devices: {
      sensor: false,
      income: false,
      record: false,
    },
  },
  detailedChecklist: {},
};

// ==========================================
// Data Definitions
// ==========================================
export const TARGET_SERVICES: { category: string; items: string[] }[] = [
  {
    category: '1. 施設系サービス',
    items: [
      '介護老人福祉施設（特別養護老人ホーム）',
      '地域密着型介護老人福祉施設入所者生活介護（地域密着型特養）',
      '介護老人保健施設（老健）',
      '介護医療院'
    ]
  },
  {
    category: '2. 居住系サービス',
    items: [
      '特定施設入居者生活介護（介護付き有料老人ホーム等）',
      '地域密着型特定施設入居者生活介護',
      '認知症対応型共同生活介護（グループホーム）'
    ]
  },
  {
    category: '3. 多機能系サービス',
    items: [
      '小規模多機能型居宅介護',
      '看護小規模多機能型居宅介護（複合型サービス）'
    ]
  },
  {
    category: '4. 短期入所系サービス',
    items: [
      '短期入所生活介護（ショートステイ）',
      '短期入所療養介護（医療型ショートステイ）'
    ]
  }
];

export const QUESTIONS: { id: number; cloudText: string; sunText: string; detail: string }[] = [
  {
    id: 0,
    cloudText: 'Q1. 委員会は毎月開催が必要？',
    sunText: 'いいえ！3ヶ月に1回でOK！',
    detail: '形骸化を防ぐため、3ヶ月に1回以上でよいとされています。他の会議との同時開催も可能です。'
  },
  {
    id: 1,
    cloudText: 'Q2. ITC機器を全室に入れないとダメ？',
    sunText: 'まずは「1台」からでOK！',
    detail: '加算（Ⅱ）なら、見守り・インカム・記録ソフトのうち1つ以上を導入すれば算定可能です。'
  },
  {
    id: 2,
    cloudText: 'Q3. 膨大な書類提出が必要？',
    sunText: '実績報告は年に1回だけ！',
    detail: '厚労省への報告は毎月ではなく、事業年度ごとに1回、Web上で行います。'
  }
];

export const FULL_CHECKLIST_DATA: ChecklistSectionData[] = [
  {
    category: "【1. 事前準備・必須環境】",
    description: null,
    items: [
      {
        id: "pre_1",
        label: "対象サービスの確認",
        detail: "施設系（特養、老健、医療院等）、居住系（特定施設、グループホーム等）、短期入所系、多機能系サービスのいずれかですか？（※通所・訪問は対象外）",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.6,"
      },
      {
        id: "pre_2",
        label: "「GビズIDプライム」アカウントの取得",
        detail: "※実績報告はLIFEではなく、厚労省の「生産性向上推進体制加算実績報告システム」を使用します。ログインには「GビズIDプライム」が必須です。",
        source: "介護保険最新情報Vol.1315「生産性向上推進体制加算を算定する事業所における生産性向上の取組に関する実績データの厚生労働省への報告について」"
      }
    ]
  },
  {
    category: "【2. 加算（Ⅱ）】月10単位（体制整備・データ提出）",
    description: "要件：機器を1種以上導入し、委員会活動とデータ提出を行うこと。成果（時間の短縮等）は問われません。",
    items: [
      {
        id: "ii_1_1",
        label: "① 委員会の設置・運営（3ヶ月に1回以上）",
        detail: "「生産性向上委員会（利用者の安全並びに介護サービスの質の確保及び職員の負担軽減に資する方策を検討するための委員会）」を設置し、3ヶ月に1回以上開催していますか？",
        source: "介護保険最新情報Vol.1236「生産性向上推進体制加算に関する基本的考え方並びに事務処理手順及び様式例等の提示について」（以下、「解釈通知」）,"
      },
      {
        id: "ii_1_2",
        label: "構成員の要件",
        detail: "構成員に「管理者」だけでなく「ケアを行う職員（現場職員）」を含めていますか？",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.9"
      },
      {
        id: "ii_1_3",
        label: "検討項目の確認",
        detail: "委員会で、以下の4項目すべてについて検討・確認を行っていますか？",
        subItems: [
          { id: "ii_1_3_1", text: "利用者の安全・ケアの質の確保（ヒヤリハット分析など）" },
          { id: "ii_1_3_2", text: "職員の負担軽減・勤務状況への配慮（ストレスチェックなど）" },
          { id: "ii_1_3_3", text: "介護機器の定期的な点検（メーカーと連携した点検体制など）" },
          { id: "ii_1_3_4", text: "職員に対する研修（機器操作、役割分担など）" }
        ],
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.10,"
      },
      {
        id: "ii_2",
        label: "② テクノロジー機器の導入（いずれか1つ以上）",
        detail: "以下の①〜③の機器のうち、いずれか1つ以上を導入していますか？",
        subItems: [
          { id: "ii_2_1", text: "① 見守り機器（離床検知・外部通信／1台以上）※（Ⅱ）の場合" },
          { id: "ii_2_2", text: "② インカム等（スマホチャット等／同一時間帯の全介護職員）" },
          { id: "ii_2_3", text: "③ 介護記録ソフト等（転記不要・一元管理）" }
        ],
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.12"
      },
      {
        id: "ii_3",
        label: "③ 業務改善の実施",
        detail: "厚労省の「生産性向上ガイドライン」に基づいた改善活動を行っていますか？",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.6,"
      },
      {
        id: "ii_4_1",
        label: "④ データ提出：利用者の満足度・QOL",
        detail: "利用者の満足度・QOL（WHO-5、生活・認知機能尺度／対象：5名程度）",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.14"
      },
      {
        id: "ii_4_2",
        label: "④ データ提出：職員の総業務時間・残業時間",
        detail: "職員の総業務時間・残業時間（対象：機器導入フロアの介護職員）※原則として「毎年10月」（初年度は算定開始月）の実績を用います。",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.14"
      },
      {
        id: "ii_4_3",
        label: "④ データ提出：年次有給休暇の取得状況",
        detail: "年次有給休暇の取得状況（対象：機器導入フロアの介護職員）",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.14"
      }
    ]
  },
  {
    category: "【3. 加算（Ⅰ）】月100単位（成果の確認・高度な運用）",
    description: "要件：（Ⅱ）の要件に加え、3種全ての機器導入、全職員対象のデータ測定、成果の実証が必要。",
    items: [
      {
        id: "i_1_1",
        label: "① テクノロジー機器の「3種すべて」の導入",
        detail: "以下の①〜③をすべて導入・運用していますか？",
        subItems: [
          { id: "i_1_1_1", text: "① 見守り機器： 全ての居室に設置している（※利用者の意向で停止している場合は可）。" },
          { id: "i_1_1_2", text: "② インカム等： 同一時間帯の全ての介護職員が使用している。" },
          { id: "i_1_1_3", text: "③ 介護記録ソフト： 記録・保存・活用を一元管理できている。" }
        ],
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.12,"
      },
      {
        id: "i_2",
        label: "② 職員間の役割分担（タスクシェア・シフト）",
        detail: "介護助手（周辺業務を行う者）の活用や業務の外部委託など、役割分担を行っていますか？",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.13,"
      },
      {
        id: "i_3_1",
        label: "③ 期間の要件（重要）",
        detail: "機器導入後、生産性向上の取組を「3ヶ月以上」継続しましたか？",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.23-24,"
      },
      {
        id: "i_3_2",
        label: "③ 成果確認",
        detail: "機器導入前後のデータを比較し、以下の「成果」を確認しましたか？",
        subItems: [
          { id: "i_3_2_1", text: "利用者の満足度等： 悪化していない（維持または向上）。" },
          { id: "i_3_2_2", text: "総業務時間・残業時間： 短縮している。" },
          { id: "i_3_2_3", text: "年次有給休暇： 維持または増加している。" }
        ],
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.23-24,"
      },
      {
        id: "i_4",
        label: "④ データ測定対象の拡大と追加項目",
        detail: "（Ⅱ）と異なり、「全ての介護職員」が対象になります。",
        subItems: [
          { id: "i_4_1", text: "職員の総業務時間・残業時間（対象：全ての介護職員）" },
          { id: "i_4_2", text: "年次有給休暇の取得状況（対象：全ての介護職員）" },
          { id: "i_4_3", text: "【追加】職員の心理的負担（SRS-18、モチベーション変化／対象：全ての介護職員）" },
          { id: "i_4_4", text: "【追加】タイムスタディ調査（5日間／対象：複数人の職員）" }
        ],
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.14-15,"
      }
    ]
  },
  {
    category: "【4. 毎年のルーチン（維持管理）】",
    description: null,
    items: [
      {
        id: "routine_1",
        label: "実績データの提出（年1回）",
        detail: "年に1回、厚労省のシステムへ実績データを提出する。※令和6年度分の提出期限は令和7年3月31日までです。",
        source: "介護保険最新情報Vol.1315「生産性向上推進体制加算を算定する事業所における生産性向上の取組に関する実績データの厚生労働省への報告について」"
      },
      {
        id: "routine_2",
        label: "委員会の継続開催",
        detail: "委員会を3ヶ月に1回以上継続開催し、議事録等の記録を保存する。",
        source: "社保審－介護給付費分科会 第239回資料「令和６年度介護報酬改定 生産性向上推進体制加算について」P.10"
      }
    ]
  }
];

