# Mother Excavation v3

A dependency-free static website based on v2's business information, original photos, and exact brand palette. The homepage and four service pages share one layout and content module.

## Development

Requires Node.js 22+ and Python 3 for the local preview.

- `npm run build` generates the five HTML pages.
- `npm run check` validates local links, anchors, assets, and page metadata.
- `npm run dev` serves `dist` at http://127.0.0.1:5173.

Edit page templates in `src/build.mjs`, service content in `src/services.mjs`, and shared presentation in `dist/styles.css` and `dist/main.js`. CSS, JavaScript, and photos in `dist` are authored assets; do not delete the directory before building.

Phone and email links open the visitor's phone or email application. There is no form backend or simulated submission. Navigation remains accessible without JavaScript.

V2's experience claims conflict (20 years on the homepage and over 6 on service pages), so v3 omits a numeric claim. Service areas, licensing claims, and contact details are carried over from v2.

## Project photos and recent work

Edit `src/work.mjs` to replace the clearly labeled sample projects and recent-work placeholders. Set `placeholder: false` only after adding real project details. Photo URLs can be local paths under `dist/images/` or externally hosted HTTPS URLs. Supply descriptive alt text. Order recent-work entries newest first.

For YouTube videos, use `{ type: 'youtube', url: 'https://youtu.be/VIDEO_ID' }` as the entry's `media`. Watch, share, Shorts, live, and embed links are supported. Upload the video to YouTube as public or unlisted and enable embedding; private videos will not play for ordinary visitors. Unlisted links can be shared by anyone who has them. The website uses YouTube's privacy-enhanced embed with an external viewing fallback.

For videos hosted elsewhere, use `{ type: 'video', url: 'https://your-media-host.com/project.mp4', poster: '/images/project.jpg' }`. Use a direct playable HTTPS URL, not a cloud-storage preview page. The host must serve the correct video content type and should support byte-range requests. MP4 with H.264 video and AAC audio is a broadly compatible choice. No video binary is stored in this repository; the browser streams from the chosen host. No media-host account or paid service is provisioned by this site.

The current version intentionally has no live project video until a real URL is supplied. Run `node --test src/work-view.test.mjs` to validate media URL handling, then `npm run build` and `npm run check` after editing content.

References: [YouTube embedding](https://support.google.com/youtube/answer/171780) and [video visibility](https://support.google.com/youtube/answer/157177).
