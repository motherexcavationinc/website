import test from 'node:test';
import assert from 'node:assert/strict';
import { youtubeId, renderMedia } from './work-view.mjs';

test('normalizes supported YouTube share formats', () => {
  for (const url of [
    'https://youtu.be/M7lc1UVf-VE?t=20',
    'https://www.youtube.com/watch?v=M7lc1UVf-VE&feature=share',
    'https://youtube.com/shorts/M7lc1UVf-VE',
    'https://youtube.com/live/M7lc1UVf-VE',
    'https://www.youtube-nocookie.com/embed/M7lc1UVf-VE',
  ]) assert.equal(youtubeId(url), 'M7lc1UVf-VE');
});

test('rejects malformed URLs and unsafe media sources', () => {
  for (const url of ['https://youtube.com.evil.test/watch?v=M7lc1UVf-VE', 'https://youtube.com/watch?v=bad', 'javascript:alert(1)', 'http://youtu.be/M7lc1UVf-VE']) {
    assert.throws(() => youtubeId(url));
  }
  for (const url of ['//evil.test/video.mp4', 'javascript:alert(1)', 'https://user:password@example.com/video.mp4']) {
    assert.throws(() => renderMedia({ type: 'video', url }, 'Video'));
  }
});

test('renders embeds and hosted files with accessible controls and fallbacks', () => {
  const youtube = renderMedia({ type: 'youtube', url: 'https://youtu.be/M7lc1UVf-VE' }, 'Digging & grading');
  assert.match(youtube, /youtube-nocookie.com\/embed\/M7lc1UVf-VE/);
  assert.match(youtube, /title="Digging &amp; grading"/);
  assert.match(youtube, /Watch on YouTube/);
  const video = renderMedia({ type: 'video', url: 'https://media.example.com/job.mp4' }, 'Job');
  assert.match(video, /controls playsinline preload="none"/);
  assert.match(video, /Open video/);
  assert.doesNotMatch(renderMedia(null, 'Coming soon'), /<iframe|<video|<button/);
});
