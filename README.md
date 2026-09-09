# Mother Excavation website

## Start locally

Install Node.js 22 or newer and Python 3, then run:

```sh
npm ci
npm run build
npm run dev
```

Open http://127.0.0.1:5173. Run `npm test` and `npm run check` to validate changes. Run `npm run format` to format source files.

## Add a project (photos or videos)

1. Put new photos in `public/images/work/` (create the folder if needed). Use lowercase filenames with hyphens.
2. Open `content/work.json`. Copy a project object, keep commas between objects, and edit its title, description, date, and media.
3. Set `placeholder` to `false` for real work. Run the build and checks, then commit your changes.

Every project appears in the single Our Work section on the homepage and ALL four service pages. Projects sort automatically by date, newest first. Set `date` to `""`, `null`, or omit it when unknown; these show “Date unknown” after dated projects, in file order. Dates must otherwise use `YYYY-MM-DD`.

Example project:

```json
{
  "title": "Residential site preparation",
  "description": "Grading and material hauling for a residential site.",
  "date": "2026-09-09",
  "placeholder": false,
  "media": [
    {
      "type": "image",
      "url": "/images/work/site-preparation.jpg",
      "alt": "Excavator grading the residential site"
    },
    {
      "type": "youtube",
      "url": "https://youtu.be/YOUR_VIDEO_ID"
    }
  ]
}
```

Replace the sample video URL with your real link, or remove that media item. Add multiple images or videos to the same media list. HTTPS image URLs work too.

### Videos stay outside GitHub

Upload footage to YouTube, enable embedding, and use its public or unlisted link. Unlisted links can be watched and shared by anyone who has them. Private videos will not work for ordinary visitors. Watch, share, Shorts, live, and embed links are supported.

Alternatively use a direct HTTPS video link from your media host:

```json
{
  "type": "video",
  "url": "https://your-media-host.com/project.mp4",
  "poster": "/images/work/project-poster.jpg"
}
```

Use a playable media URL, not a cloud-storage preview page. The host should serve the correct content type and support byte ranges. An H.264/AAC MP4 is a practical choice. The site streams from that host; no video binary belongs in this repository. Hosting accounts are not created by this code.

## Upload to GitHub and publish

1. Create a GitHub repository and upload this project's source, including `.github/workflows/pages.yml`, `public`, `content`, `src`, `package.json`, and `package-lock.json`. The supplied ZIP excludes local Git history and Sites-specific settings.
2. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push to `main` or `master`, or manually run **Publish website** from Actions.
4. The workflow installs locked dependencies, tests, builds, checks links, and publishes `dist` to GitHub Pages. GitHub shows the resulting website URL in Pages settings.

Relative links work with both `username.github.io/repository/` and a custom-domain root. No domain, repository, or GitHub deployment has been created for you. If you use another default branch, update the workflow branch list.

## Source structure

- `content/work.json`: the only file needed to add project records.
- `public/`: authored photos, CSS, and browser JavaScript.
- `src/build.mjs`: shared layout, homepage, and service-page templates.
- `src/services.mjs`: service descriptions.
- `src/work.mjs`: content validation and chronological sorting.
- `src/work-view.mjs`: project gallery and video rendering.
- `dist/`: formatted generated website. Edit the source, not these copies.

V2 supplied the business details and photos. Its conflicting experience counts were omitted. The sample projects do not claim real completion dates. Contact links open phone/email apps; no form backend is required.

References: [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [YouTube embedding](https://support.google.com/youtube/answer/171780).
