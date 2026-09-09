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
