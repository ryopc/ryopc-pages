import { ArrowUpRight, Check, HeartHandshake, Lightbulb, MonitorSmartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return <main className="inner-page">
    <div className="inner-hero"><div className="container"><div className="breadcrumbs"><Link to="/">ホーム</Link><span>/</span><span>私たちについて</span></div><span className="kicker">ABOUT ryopc pages</span><h1>私たちについて</h1><p>アイデアを、使いやすく伝わるWebのかたちへ。</p></div></div>
    <div className="container inner-content">
      <section className="about-page-lead"><div className="about-illustration"><div className="about-blob" /><div className="about-message"><span>OUR CONCEPT</span><b>大きく見せるより、<br />ちゃんと伝える。</b><small>Simple design, meaningful experience.</small></div><div className="about-ornament">r.</div></div><div><span className="kicker">OUR IDEA</span><h2>Webを、もっと身近に。</h2><p>Webサイトは、情報を置くだけの場所ではなく、人やアイデアをつなぐ入口です。ryopc pagesは、必要な情報がきちんと伝わり、使う人が迷わないことを大切にします。</p><p>必要以上に飾らず、使う人にとって自然で、運営する人にも扱いやすいWebを目指します。</p></div></section>
      <section className="values-section"><div className="section-heading"><span className="kicker">WHAT MATTERS</span><h2>大切にしていること</h2></div><div className="value-grid"><article><span><Lightbulb /></span><h3>伝わること</h3><p>情報を整理して、初めて訪れた人にも要点が伝わる設計を考えます。</p></article><article><span><MonitorSmartphone /></span><h3>使いやすいこと</h3><p>端末や画面サイズにかかわらず、自然に読めて操作できることを大切にします。</p></article><article><span><HeartHandshake /></span><h3>無理なく続けられること</h3><p>公開して終わりではなく、更新や改善を続けやすい構成を目指します。</p></article></div></section>
      <section className="operator-panel"><div><span className="kicker">OPERATED BY</span><h2>ryopc org</h2><p>ryopc pagesは、ryopc orgが運営するWeb制作プロジェクトです。</p></div><a href="https://ryopc.org" target="_blank" rel="noreferrer" className="button button--secondary">ryopc orgの公式サイト <ArrowUpRight size={16} /></a></section>
      <div className="inline-cta"><h2>アイデアを、少しずつ形に。</h2><p>制作についての相談や質問は、お問い合わせページから。</p><Link to="/contact" className="button button--primary">お問い合わせ <Check size={16} /></Link></div>
    </div>
  </main>;
}
