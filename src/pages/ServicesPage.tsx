import { ArrowRight, Code2, LayoutTemplate, Palette, Rocket, Smartphone, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';

const services = [
  { number: '01', title: 'Webサイト制作', icon: LayoutTemplate, text: '伝えたい内容や目的を整理し、初めて訪れた人にも伝わるWebサイトを考えます。', points: ['ページ構成と情報設計', 'レスポンシブなレイアウト', '公開後も編集しやすい構成'] },
  { number: '02', title: 'デザイン・UI', icon: Palette, text: '色、余白、文字、ボタンの一つひとつを整え、自然に使える画面を目指します。', points: ['デザインの方向性づくり', '読みやすいタイポグラフィ', 'わかりやすい導線と操作'] },
  { number: '03', title: '公開・改善サポート', icon: Rocket, text: '公開方法や更新のしやすさまで見据え、無理なく育てられるサイトを考えます。', points: ['公開方法の整理', '使い方・更新方法の案内', '改善しやすいコード構成'] },
];

export default function ServicesPage() {
  return <main className="inner-page">
    <div className="inner-hero"><div className="container"><div className="breadcrumbs"><Link to="/">ホーム</Link><span>/</span><span>できること</span></div><span className="kicker">WHAT WE DO</span><h1>できること</h1><p>必要なものを、必要なかたちで。目的に合わせて、一つずつ丁寧に形にします。</p></div></div>
    <div className="container inner-content">
      <SectionHeading kicker="OUR SERVICES" title="大切にしている3つのこと" description="見た目だけでなく、使いやすさや伝わりやすさを軸に考えます。" align="center" />
      <div className="service-detail-list">{services.map((service) => { const Icon = service.icon; return <article className="service-detail" key={service.number}><div className="service-detail__icon"><Icon size={25} /></div><div><span className="service-index">{service.number} / SERVICE</span><h2>{service.title}</h2><p>{service.text}</p><ul>{service.points.map((point) => <li key={point}><span><ArrowRight size={13} /></span>{point}</li>)}</ul></div></article>; })}</div>
      <div className="service-principles"><div><span className="principle-icon"><Smartphone /></span><b>スマートフォンでも<br />使いやすく</b><p>小さな画面でも迷わず読める構成に。</p></div><div><span className="principle-icon"><Code2 /></span><b>後から編集しやすい<br />コードに</b><p>構造を整理し、変更しやすさを意識。</p></div><div><span className="principle-icon"><Wrench /></span><b>運用まで見据えて<br />設計する</b><p>公開したあとも扱いやすい形を目指す。</p></div></div>
      <div className="inline-cta"><h2>まだイメージが固まっていなくても大丈夫。</h2><p>作りたいものや、伝えたいことから一緒に整理していきます。</p><Link to="/contact" className="button button--primary">相談してみる <ArrowRight size={16} /></Link></div>
    </div>
  </main>;
}
