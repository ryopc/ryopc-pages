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

// Production projects data. Replace this array with actual portfolio entries.
// Each entry follows the Project type structure for easy maintenance.
export const projects: Project[] = [
  {
    id: 'ryopc-site',
    title: 'ryopc org公式サイト',
    category: 'コーポレート',
    description: '情報を整理し、サービスの魅力を伝えるための公式サイト。',
    summary: 'サービスの特徴や利用方法をわかりやすく伝えるため、情報を整理した公式サイトを制作しました。',
    tone: 'blue',
    label: 'PROJECT',
    features: ['サービスの特徴を整理した情報設計', '利用方法をわかりやすく伝えるコンテンツ構成', 'サービスの魅力を引き出すビジュアルデザイン'],
  },
  {
    id: 'koshi-docs',
    title: 'koshi公式ドキュメント',
    category: 'ドキュメント',
    description: '利用者が必要な情報をすぐに見つけられる、わかりやすいドキュメントサイト。',
    summary: '利用者が必要な情報をすぐに見つけられる、わかりやすいドキュメントサイト。',
    tone: 'lavender',
    label: 'DOCUMENTATION',
    features: ['利用者が必要な情報をすぐに見つけられる情報設計', 'わかりやすいコンテンツ構成', '更新しやすいドキュメント構成'],
  },
  {
    id: 'game_ryo-site',
    title: 'game_ryo個人サイト',
    category: '個人',
    description: '個人の活動や作品を紹介するためのポートフォリオサイト。',
    summary: '個人の活動や作品を紹介するためのポートフォリオサイト。',
    tone: 'mint',
    label: 'PORTFOLIO',
    features: ['個人の活動や作品を紹介する情報設計', '魅力的なビジュアルデザイン', 'ユーザーが使いやすいナビゲーション'],
  }
];

export function findProject(id: string | undefined): Project | undefined {
  return projects.find((project) => project.id === id);
}
