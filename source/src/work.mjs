import { readFile } from 'node:fs/promises';
import { renderMedia } from './work-view.mjs';

export function sortProjects(projects) {
  return [...projects].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export async function loadWork() {
  const projects = JSON.parse(await readFile('source/content/work.json', 'utf8'));
  if (!Array.isArray(projects)) throw new Error('source/content/work.json must contain a list.');
  for (const [index, project] of projects.entries()) {
    try {
      if (!project || typeof project.title !== 'string' || !project.title.trim())
        throw new Error('A title is required.');
      if (typeof project.description !== 'string') throw new Error('A description is required.');
      if (project.date != null && project.date !== '') {
        if (typeof project.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(project.date))
          throw new Error('Use YYYY-MM-DD or leave date blank.');
        const parsed = new Date(project.date);
        if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== project.date)
          throw new Error('Invalid project date.');
      }
      if (typeof project.placeholder !== 'boolean' || !Array.isArray(project.media))
        throw new Error('Provide placeholder and media fields.');
      if (!project.placeholder && !project.media.length)
        throw new Error('Real projects need a photo or video.');
      for (const media of project.media) {
        if (
          !media ||
          (media.type === 'image' && (typeof media.alt !== 'string' || !media.alt.trim()))
        )
          throw new Error('Photos need descriptive alt text.');
        renderMedia(media, project.title);
      }
    } catch (error) {
      throw new Error(`source/content/work.json project ${index + 1}: ${error.message}`);
    }
  }
  return sortProjects(projects);
}
