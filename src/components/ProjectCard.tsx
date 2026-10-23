import { ArrowUpRight, Blocks, Compass, LayoutTemplate, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

const iconById = {
  'ryopc-site': LayoutTemplate,
  'koshi-docs': Compass,
  'game_ryo-site': Blocks,
  'service-site': LayoutTemplate,
  'project-landing': Compass,
  'community-hub': Blocks,
  'prototype-lab': Sparkles,
};

export function ProjectVisual({ project }: { project: Project }) {
  const Icon = iconById[project.id as keyof typeof iconById] ?? LayoutTemplate;
  
  if (project.image) {
    return (
      <div className={`project-visual project-visual--${project.tone}`} aria-hidden="true">
        <img 
          src={project.image} 
          alt={`${project.title} のスクリーンショット`}
          className="project-image"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`project-visual project-visual--${project.tone}`} aria-hidden="true">
      <div className="preview-window">
        <div className="preview-window__bar"><i /><i /><i /><span>preview.page</span></div>
        <div className="preview-window__inside">
          <span className="preview-label">{project.label}</span>
          <div className="preview-headline" />
          <div className="preview-headline preview-headline--short" />
          <div className="preview-line" />
          <div className="preview-tiles"><i /><i /><i /></div>
        </div>
      </div>
      <div className="preview-sticker"><Icon size={19} strokeWidth={1.8} /></div>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card" to={`/works/${project.id}`}>
      <ProjectVisual project={project} />
      <div className="project-card__body">
        <span className="tag">{project.category}</span>
        <h3>{project.title}<ArrowUpRight size={17} /></h3>
        <p>{project.description}</p>
      </div>
    </Link>
  );
}
