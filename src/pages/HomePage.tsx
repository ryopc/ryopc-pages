import { ArrowRight, Check, Code2, LayoutTemplate, Palette, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/projects';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><i /> WEB CREATION PROJECT</span>
            <h1>アイデアを、<br /><em>ちょうどいいWeb</em>に。</h1>
            <p className="hero-lead">伝えたいことを、伝わるかたちへ。ryopc pages は、目的に合ったWebサイトを一緒につくるプロジェクトです。</p>
            <div className="button-row">
              <Link to="/works" className="button button--primary">制作実績を見る <ArrowRight size={17} /></Link>
              <Link to="/about" className="button button--secondary">ryopc pagesについて</Link>
            </div>
            <div className="hero-note"><span><Check size={13} /></span> シンプルに、使いやすく、あなたらしく。</div>
          </div>
          <div className="hero-art" aria-label="Webサイトのデザインを表現したイラスト">
            <div className="hero-orb hero-orb--one" /><div className="hero-orb hero-orb--two" />
            <div className="hero-browser">
              <div className="hero-browser__bar"><i /><i /><i /><small>your-idea.jp</small></div>
              <div className="hero-browser__content">
                <span>YOUR IDEA, ONLINE</span>
                <b>伝えたいことを<br />シンプルに。</b>
                <div className="hero-line hero-line--wide" /><div className="hero-line hero-line--mid" />
                <div className="hero-fake-button">詳しく見る <ArrowRight size={12} /></div>
              </div>
            </div>
            <div className="float-note float-note--top"><span className="float-icon"><Palette size={16} /></span><span><b>やさしいデザイン</b><small>見やすさを大切に</small></span></div>
            <div className="float-note float-note--bottom"><span className="float-icon float-icon--green"><Smartphone size={16} /></span><span><b>スマホにも対応</b><small>使いやすい設計</small></span></div>
            <span className="hero-spark hero-spark--one">✳</span><span className="hero-spark hero-spark--two">✳</span>
          </div>
        </div>
        <div className="hero-bottomline"><span /> Small ideas. Thoughtful web.</div>
      </section>

      <section className="section" id="services-preview">
        <div className="container">
          <SectionHeading kicker="WHAT WE DO" title="必要なものを、必要なかたちで。" description="見た目だけでなく、使いやすさや伝わりやすさも大切にします。" align="center" />
          <div className="service-grid">
            <article className="service-card"><div className="service-icon"><LayoutTemplate /></div><span className="service-index">01 / BUILD</span><h3>Webサイト制作</h3><p>目的や見る人に合わせて、情報を整理した見やすいサイトを制作します。</p><Link to="/services">できることを見る <ArrowRight size={15} /></Link></article>
            <article className="service-card"><div className="service-icon"><Palette /></div><span className="service-index">02 / DESIGN</span><h3>デザイン・UI</h3><p>迷わず使える構成と、やさしく統一感のあるデザインを考えます。</p><Link to="/services">できることを見る <ArrowRight size={15} /></Link></article>
            <article className="service-card"><div className="service-icon"><Code2 /></div><span className="service-index">03 / SUPPORT</span><h3>公開・改善サポート</h3><p>公開方法や運用も考えながら、無理なく続けられる形を目指します。</p><Link to="/services">できることを見る <ArrowRight size={15} /></Link></article>
          </div>
        </div>
      </section>

      <section className="section section--tint" id="works-preview">
        <div className="container">
          <div className="section-title-row"><SectionHeading kicker="SELECTED WORKS" title="制作実績" description="アイデアに合わせて、さまざまなWebのかたちを考えます。" /><Link className="text-link" to="/works">すべての実績を見る <ArrowRight size={16} /></Link></div>
          <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
          <p className="sample-note">※ 掲載内容は、サイトの完成イメージを確認するためのサンプルです。</p>
        </div>
      </section>

      <section className="section about-preview">
        <div className="container about-grid">
          <div className="about-illustration"><div className="about-blob" /><div className="about-message"><span>OUR CONCEPT</span><b>大きく見せるより、<br />ちゃんと伝える。</b><small>Simple design, meaningful experience.</small></div><div className="about-ornament">r.</div></div>
          <div className="about-copy"><span className="kicker">ABOUT ryopc pages</span><h2>Webを、もっと身近に。</h2><p>ryopc pages は、Web制作を通じてアイデアや活動をわかりやすく届けるプロジェクトです。</p><p>必要以上に飾らず、使う人にとって自然で、運営する人にも扱いやすいWebを目指します。</p><Link to="/about" className="text-link">私たちについて詳しく <ArrowRight size={16} /></Link><div className="operator-line"><span>OPERATED BY</span><b>ryopc org</b><a href="https://ryopc.org" target="_blank" rel="noreferrer">公式サイト ↗</a></div></div>
        </div>
      </section>

      <section className="contact-band">
        <div className="container"><div className="contact-panel"><div className="contact-deco">✳</div><span className="kicker">LET'S MAKE SOMETHING</span><h2>アイデアを、話してみませんか。</h2><p>サイト制作の相談やプロジェクトについて、まずは気軽にお問い合わせください。</p><Link className="button button--primary" to="/contact">お問い合わせ <ArrowRight size={17} /></Link></div></div>
      </section>
    </main>
  );
}
