import { describe, expect, it } from 'vitest';
import { findProject, projects } from './projects';

describe('project catalogue', () => {
  it('contains at least four portfolio entries', () => {
    expect(projects.length).toBeGreaterThanOrEqual(4);
  });

  it('has unique IDs for every project', () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('finds an existing project and returns undefined for an unknown ID', () => {
    expect(findProject('service-site')?.title).toBe('サービス紹介サイト');
    expect(findProject('not-a-real-project')).toBeUndefined();
  });

  it('has consistent data model with required fields', () => {
    expect(projects.every((project) => project.features.length > 0 && project.summary.length > 0)).toBe(true);
  });
});
