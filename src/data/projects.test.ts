import { describe, expect, it } from 'vitest';
import { findProject, projects } from './projects';

describe('project catalogue', () => {
  it('contains at least three portfolio entries', () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });

  it('has unique IDs for every project', () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('finds an existing project and returns undefined for an unknown ID', () => {
    expect(findProject('ryopc-site')?.title).toBe('ryopc org公式サイト');
    expect(findProject('not-a-real-project')).toBeUndefined();
  });

  it('has consistent data model with required fields', () => {
    expect(projects.every((project) => project.features.length > 0 && project.summary.length > 0)).toBe(true);
  });

  it('has image field for each project', () => {
    expect(projects.every((project) => project.image && project.image.startsWith('/images/projects/'))).toBe(true);
  });
});
