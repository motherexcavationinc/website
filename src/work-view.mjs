export const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function mediaUrl(value) {
  if (typeof value !== 'string') throw new Error('Media URL must be a string.');
  if (/^\/(?!\/)/.test(value)) return escapeHtml(value);
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('External media must use an HTTPS URL without credentials.');
  return escapeHtml(url.href);
}

export function youtubeId(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Use an HTTPS YouTube link.');
  const host = url.hostname.replace(/^www\./, '');
  let id;
  if (host === 'youtu.be') id = url.pathname.split('/')[1];
  else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
    const [, kind, pathId] = url.pathname.split('/');
    id = kind === 'watch' ? url.searchParams.get('v') : ['embed', 'shorts', 'live'].includes(kind) ? pathId : null;
  }
  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) throw new Error('Invalid YouTube video link.');
  return id;
}

export function renderMedia(media, title) {
  if (!media) return '<div class="video-placeholder"><span class="film-mark" aria-hidden="true">▶</span><span>PROJECT VIDEO COMING SOON</span></div>';
  if (media.type === 'youtube') {
    const id = youtubeId(media.url);
    return `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${escapeHtml(title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><a class="media-fallback" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>`;
  }
  if (media.type === 'video') return `<video controls playsinline preload="none" aria-label="${escapeHtml(title)}"${media.poster ? ` poster="${mediaUrl(media.poster)}"` : ''} src="${mediaUrl(media.url)}"></video><a class="media-fallback" href="${mediaUrl(media.url)}" target="_blank" rel="noopener noreferrer">Open video ↗</a>`;
  if (media.type === 'image') return `<img src="${mediaUrl(media.url)}" alt="${escapeHtml(media.alt ?? title)}" loading="lazy">`;
  throw new Error(`Unsupported media type: ${media.type}`);
}

export function renderWork(projects, recentWork) {
  return `<section class="section work" id="work"><div class="container">
    <div class="section-heading"><div><p class="eyebrow">OUR WORK</p><h2>See what goes<br>into the ground.</h2></div><p>A look at the work we do. Sample project layouts below will be updated with project photos and details.</p></div>
    <div class="project-grid">${projects.map(project => `<figure class="project-card"><div class="project-image"><img src="${mediaUrl(project.image)}" alt="${escapeHtml(project.alt)}" loading="lazy">${project.placeholder ? '<span class="sample-label">SAMPLE PROJECT</span>' : ''}</div><figcaption><p class="eyebrow">${escapeHtml(project.category)}</p><h3>${escapeHtml(project.title)}</h3></figcaption></figure>`).join('')}</div>
  </div></section>
  <section class="section recent-work" id="recent-work"><div class="container">
    <div class="section-heading"><div><p class="eyebrow">RECENT WORK</p><h2>On site.<br>In action.</h2></div><p>Project films and photos from the field.</p></div>
    <div class="recent-grid">${recentWork.map(item => `<article class="recent-card"><div class="recent-media">${renderMedia(item.media, item.title)}</div><div class="recent-copy"><p class="eyebrow">${escapeHtml(item.category)}${item.placeholder ? ' · PREVIEW' : ''}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div></article>`).join('')}</div>
  </div></section>`;
}
