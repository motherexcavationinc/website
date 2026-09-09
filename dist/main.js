const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const workLists = document.querySelectorAll('[data-work-list]');

if (menuButton && navigation) {
  menuButton.hidden = false;
  document.documentElement.classList.add('js');
  const closeMenu = () => menuButton.setAttribute('aria-expanded', 'false');
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
  });
  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (
      event.target instanceof Node &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    )
      closeMenu();
  });
  matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
}

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
  );

const mediaUrl = (value) => {
  if (typeof value !== 'string') throw new Error('Media URL must be a string.');
  if (/^\/(?!\/)/.test(value)) return escapeHtml(value);
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('External media must use an HTTPS URL without credentials.');
  }
  return escapeHtml(url.href);
};

const youtubeId = (value) => {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('Use an HTTPS YouTube link.');
  }
  const host = url.hostname.replace(/^www\./, '');
  let id;

  if (host === 'youtu.be') {
    id = url.pathname.split('/')[1];
  } else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
    const [, kind, pathId] = url.pathname.split('/');
    id =
      kind === 'watch'
        ? url.searchParams.get('v')
        : ['embed', 'shorts', 'live'].includes(kind)
          ? pathId
          : null;
  }

  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) throw new Error('Invalid YouTube video link.');
  return id;
};

const formatDate = (value) => {
  if (!value) return '<span class="project-date">Date unknown</span>';
  return `<time datetime="${escapeHtml(value)}">${new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))}</time>`;
};

const sortProjects = (projects) =>
  [...projects].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

const renderMedia = (media, title) => {
  if (!media) {
    return '<div class="media-slide"><div class="video-placeholder"><span class="film-mark" aria-hidden="true">▶</span><span>PROJECT VIDEO COMING SOON</span></div></div>';
  }

  if (media.type === 'youtube') {
    const id = youtubeId(media.url);
    return `<div class="media-slide"><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${escapeHtml(title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><a class="media-fallback" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div>`;
  }

  if (media.type === 'video') {
    return `<div class="media-slide"><video controls playsinline preload="none" aria-label="${escapeHtml(title)}" ${media.poster ? `poster="${mediaUrl(media.poster)}"` : ''} src="${mediaUrl(media.url)}"></video><a class="media-fallback" href="${mediaUrl(media.url)}" target="_blank" rel="noopener noreferrer">Open video ↗</a></div>`;
  }

  if (media.type === 'image') {
    return `<div class="media-slide"><img src="${mediaUrl(media.url)}" alt="${escapeHtml(media.alt ?? title)}" loading="lazy" /></div>`;
  }

  throw new Error(`Unsupported media type: ${media.type}`);
};

const renderProject = (project) => {
  const media = Array.isArray(project.media) && project.media.length ? project.media : [null];
  return `<article class="project-card">
    <div class="media-carousel" data-media-carousel>
      <div class="media-track" tabindex="0" aria-label="${escapeHtml(project.title)} media">
        ${media.map((item) => renderMedia(item, project.title)).join('')}
      </div>
      ${
        media.length > 1
          ? `<div class="media-controls" aria-label="Project media controls">
              <button type="button" data-scroll-media="-1" aria-label="Previous media">←</button>
              <span>${media.length} items</span>
              <button type="button" data-scroll-media="1" aria-label="Next media">→</button>
            </div>`
          : ''
      }
    </div>
    <div class="recent-copy">
      ${project.placeholder ? '<p class="eyebrow">SAMPLE PROJECT</p>' : ''}
      <h3>${escapeHtml(project.title)}</h3>
      ${formatDate(project.date)}
      <p>${escapeHtml(project.description)}</p>
    </div>
  </article>`;
};

const activateMediaControls = (root = document) => {
  root.querySelectorAll('[data-scroll-media]').forEach((button) => {
    button.addEventListener('click', () => {
      const carousel = button.closest('[data-media-carousel]');
      const track = carousel?.querySelector('.media-track');
      const direction = Number(button.dataset.scrollMedia);
      if (!track || !direction) return;
      track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
    });
  });
};

const loadWork = async () => {
  if (!workLists.length) return;

  try {
    const response = await fetch(new URL('content/work.json', document.baseURI));
    if (!response.ok) throw new Error('Project work could not be loaded.');
    const projects = sortProjects(await response.json());
    const html = projects.length
      ? projects.map(renderProject).join('')
      : '<p class="work-loading">Project work coming soon.</p>';

    workLists.forEach((list) => {
      list.innerHTML = html;
      activateMediaControls(list);
    });
  } catch (error) {
    workLists.forEach((list) => {
      list.innerHTML =
        '<p class="work-loading">Project work is temporarily unavailable. Please check back soon.</p>';
    });
    console.error(error);
  }
};

loadWork();
