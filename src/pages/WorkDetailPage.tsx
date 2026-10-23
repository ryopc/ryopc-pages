import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ProjectVisual } from '../components/ProjectCard';
import { findProject } from '../data/projects';
import NotFoundPage from './NotFoundPage';

export default function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = findProject(id);
  if (!project) return <NotFoundPage />;

  return <main className="inner-page">
    <div className="inner-hero"><div className="container"><div className="breadcrumbs"><Link to="/">ホーム</Link><span>/</span><Link to="/works">制作実績</Link><span>/</span><span>{project.title}</span></div><span className="kicker">{project.category.toUpperCase()}</span><h1>{project.title}</h1><p>{project.description}</p></div></div>
    <div className="container inner-content"><div className="detail-grid"><ProjectVisual project={project} /><div className="detail-copy"><span className="tag">{project.category}</span><h2>プロジェクト概要</h2><p>{project.summary}</p><h3>大切にしたポイント</h3><ul className="check-list">{project.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul><Link to="/contact" className="button button--primary">このようなサイトを相談する <ArrowRight size={16} /></Link></div></div><Link to="/works" className="back-link"><ArrowLeft size={15} /> 制作実績一覧へ戻る</Link></div>
  </main>;
}
