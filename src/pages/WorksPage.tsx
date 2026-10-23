import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function WorksPage() {
  return <main className="inner-page">
    <div className="inner-hero"><div className="container"><div className="breadcrumbs"><Link to="/">ホーム</Link><span>/</span><span>制作実績</span></div><span className="kicker">SELECTED WORKS</span><h1>制作実績</h1><p>アイデアに合わせたWebの形を、制作イメージとともに紹介します。</p></div></div>
    <div className="container inner-content">
      <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      <div className="inline-cta"><h2>こんなWebを作ってみたい、から。</h2><p>まだ具体的に決まっていない段階でも、目的から一緒に整理できます。</p><Link to="/contact" className="button button--primary">お問い合わせ <span>→</span></Link></div>
    </div>
  </main>;
}
