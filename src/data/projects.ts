export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  tone: 'blue' | 'lavender' | 'mint' | 'peach';
  label: string;
  features: string[];
};

// These entries are illustrative concepts for the prototype, not claimed client work.
export const projects: Project[] = [
  {
    id: 'service-site',
    title: 'サービス紹介サイト',
    category: 'コーポレート',
    description: 'サービスの特徴が自然に伝わる、すっきりとした情報設計。',
    summary: '情報を整理し、初めて訪れた人にもサービスの内容が伝わるサイトの制作イメージです。',
    tone: 'blue',
    label: 'SERVICE',
    features: ['情報を整理したページ構成', 'スマートフォンでも読みやすいレイアウト', '問い合わせまで迷わない導線'],
  },
  {
    id: 'project-landing',
    title: 'プロジェクト紹介ページ',
    category: 'ランディングページ',
    description: '伝えたいメッセージを、短くわかりやすく届ける構成。',
    summary: 'ひとつのアイデアに焦点を当て、内容と次のアクションを明快にするページの制作イメージです。',
    tone: 'lavender',
    label: 'PROJECT',
    features: ['目的に合わせたコンテンツ設計', '要点が伝わるビジュアル', '次の行動につながるボタン設計'],
  },
  {
    id: 'community-hub',
    title: 'コミュニティサイト',
    category: 'コミュニティ',
    description: '情報を探しやすく、安心して使えるページづくり。',
    summary: '利用者が必要な情報へアクセスしやすい、落ち着いた構成の制作イメージです。',
    tone: 'mint',
    label: 'COMMUNITY',
    features: ['見つけやすいナビゲーション', '使う人を中心にした情報設計', '更新しやすいコンテンツ構成'],
  },
  {
    id: 'prototype-lab',
    title: 'アイデアの試作',
    category: 'プロトタイプ',
    description: 'まず形にして試し、使いながらよりよい形へ。',
    summary: '新しいアイデアの操作感や伝わり方を確かめるためのプロトタイプ制作イメージです。',
    tone: 'peach',
    label: 'EXPERIMENT',
    features: ['アイデアを早く試せる試作', '操作感を確かめるUI', 'フィードバックを考慮した改善'],
  },
];

export function findProject(id: string | undefined): Project | undefined {
  return projects.find((project) => project.id === id);
}
