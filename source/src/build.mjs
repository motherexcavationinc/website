import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { services } from './services.mjs';
import { loadWork } from './work.mjs';
import { format } from 'prettier';
import { renderWork } from './work-view.mjs';

await loadWork();

const arrow = '<span aria-hidden="true">↗</span>';
const email = 'motherexcavationinc@gmail.com';
const brand = '<span class="brand-name">MOTHER<span>EXCAVATION INC.</span></span>';
const serviceLinks = services
  .map((service) => `<a href="/${service.slug}/">${service.name}</a>`)
  .join('');

function layout(title, description, content) {
  return /* HTML */ `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${description}" />
        <meta name="theme-color" content="#080808" />
        <title>${title} | Mother Excavation Inc.</title>
        <link rel="icon" href="/images/logo.jpg" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/main.js" defer></script>
      </head>
      <body>
        <a class="skip-link" href="#main">Skip to content</a>
        <div class="utility">
          <div class="container">
            <span>NORTHERN VIRGINIA · MARYLAND · D.C.</span
            ><a href="tel:+15713439675">LET’S TALK <span>(571) 343-9675</span></a>
          </div>
        </div>
        <header class="header">
          <div class="container navigation">
            <a class="brand" href="/" aria-label="Mother Excavation home"
              ><img src="/images/logo.jpg" width="52" height="52" alt="" />${brand}</a
            >
            <button class="menu-toggle" aria-controls="navigation" aria-expanded="false" hidden>
              Menu <span aria-hidden="true">+</span>
            </button>
            <nav id="navigation" aria-label="Main navigation">
              <a href="/#services">Our services</a><a href="/#work">Our work</a
              ><a href="/#about">Our company</a><a href="/#contact">Contact</a
              ><a class="button compact" href="/#contact">Get a free quote ${arrow}</a>
            </nav>
          </div>
        </header>
        <main id="main">${content}</main>
        <footer>
          <div class="container footer-grid">
            <div>
              <a class="brand" href="/">${brand}</a>
              <p>Hard work. Honest service.<br />From our family to your jobsite.</p>
            </div>
            <div>
              <h2>Explore</h2>
              ${serviceLinks}
            </div>
            <div>
              <h2>Get in touch</h2>
              <a href="tel:+15713439675">English · (571) 343-9675</a
              ><a href="tel:+15717782868">Español · (571) 778-2868</a
              ><a class="email" href="mailto:${email}">${email}</a>
            </div>
          </div>
          <div class="container footer-bottom">
            <span>© ${new Date().getFullYear()} Mother Excavation Inc.</span
            ><span>Family-owned. Built on trust.</span>
          </div>
        </footer>
      </body>
    </html>`;
}

const contact = /* HTML */ `<section class="contact section" id="contact">
  <div class="container contact-grid">
    <div>
      <p class="eyebrow">LET’S GET TO WORK</p>
      <h2>Your next project.<br />Our next job.</h2>
      <p>
        Tell us about your site, the work you need, and your timeline. We’ll take it from there.
      </p>
      <a class="button" href="mailto:${email}?subject=Project%20quote%20request"
        >Request a free quote ${arrow}</a
      >
    </div>
    <div class="contact-details">
      <a href="tel:+15713439675"
        ><span>CALL US · ENGLISH</span><strong>(571) 343-9675</strong>${arrow}</a
      ><a href="tel:+15717782868"
        ><span>LLÁMANOS · ESPAÑOL</span><strong>(571) 778-2868</strong>${arrow}</a
      ><a class="email" href="mailto:${email}">${email} ${arrow}</a>
    </div>
  </div>
</section>`;

const home = /* HTML */ ` <section class="hero">
    <img
      class="hero-image"
      src="/images/hero-main.png"
      alt="Mother Excavation black dump trucks at the jobsite"
      fetchpriority="high"
    />
    <div class="hero-shade"></div>
    <div class="container hero-content">
      <h1>READY FOR<br />THE WORK<br /><span>AHEAD.</span></h1>
      <p class="hero-description">
        Excavation, hauling, demolition, and dumpsters.<br />One hardworking team behind your next
        project.
      </p>
      <div class="hero-actions">
        <a class="button" href="#contact">Get a free quote ${arrow}</a
        ><a class="text-link" href="#services"
          >Explore our services <span aria-hidden="true">↓</span></a
        >
      </div>
    </div>
  </section>
  <section class="section services" id="services">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">WHAT WE DO</p>
          <h2>Heavy-duty work.<br />Done right.</h2>
        </div>
        <p>
          From the first dig to the final cleanup, we bring the equipment and experience to get your
          site ready.
        </p>
      </div>
      <div class="service-grid">
        ${services
          .map(
            (service) =>
              /* HTML */ `<a class="service-card" href="/${service.slug}/"
                ><div class="service-image">
                  <img
                    src="/images/${service.image}"
                    alt="${service.name} equipment"
                    loading="lazy"
                  />
                </div>
                <div class="service-heading">
                  <h3>${service.name}</h3>
                  ${arrow}
                </div>
                <p>${service.description}</p>
                <span class="service-more">EXPLORE SERVICE</span></a
              >`,
          )
          .join('')}
      </div>
    </div>
  </section>
  <section class="section about" id="about">
    <div class="container about-grid">
      <div class="about-photo">
        <img src="/images/about-main.png" alt="Mother Excavation equipment" loading="lazy" />
        <div class="photo-label">
          <span class="red-dash"></span> BUILT ON HARD WORK. BACKED BY FAMILY.
        </div>
      </div>
      <div class="about-copy">
        <p class="eyebrow">WHO WE ARE</p>
        <h2>Our name.<br />Our word.<br /><span>Your ground.</span></h2>
        <p>
          Mother Excavation Inc. is a family-operated business built on dedication, precision, and
          honesty. We bring hands-on experience in excavation, trucking, and site work across
          Virginia.
        </p>
        <p>
          Our approach is simple: deliver reliable results and treat every project like it’s our
          own.
        </p>
        <div class="about-facts">
          <span>Professional operators</span><span>Clean, safe jobsites</span
          ><span>Commercial & residential</span><span>Licensed & insured</span>
        </div>
        <a class="text-link" href="#contact">Meet your next project partner ${arrow}</a>
      </div>
    </div>
  </section>
  ${renderWork()} ${contact}`;

await rm('dist', { force: true, recursive: true });
await mkdir('dist', { recursive: true });
await cp('source/public', 'dist', { recursive: true });
await cp('source/content', 'dist/content', { recursive: true });
await savePage(
  'dist/index.html',
  layout(
    'Excavation & Site Services',
    'Family-owned excavation, hauling, demolition, and dumpster services across Northern Virginia, Maryland, and D.C.',
    home,
  ),
);

for (const service of services) {
  const content = /* HTML */ `<section class="detail-hero container">
      <a class="breadcrumb" href="/#services">← All services</a>
      <p class="eyebrow">MOTHER EXCAVATION / ${service.name.toUpperCase()}</p>
      <h1>${service.title}</h1>
      <p>${service.description}</p>
      <a class="button" href="#contact">Get a ${service.name.toLowerCase()} quote ${arrow}</a>
    </section>
    <div class="container detail-photo">
      <img src="/images/${service.image}" alt="${service.name} equipment" fetchpriority="high" />
    </div>
    <section class="section container detail-grid">
      <div>
        <p class="eyebrow">${service.name.toUpperCase()} SERVICES</p>
        <h2>Ready for your site.</h2>
        <p>${service.detail}</p>
        <ul class="capabilities">
          ${service.items.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div>
        <p class="eyebrow">HOW WE WORK</p>
        <h2>A clear plan.<br />A job done right.</h2>
        <p>${service.process}</p>
      </div>
    </section>
    ${renderWork()}${contact}`;
  await mkdir(`dist/${service.slug}`, { recursive: true });
  await savePage(
    `dist/${service.slug}/index.html`,
    layout(service.name, service.description, content),
  );
}
console.log('Built homepage and four service pages.');

async function savePage(path, html) {
  // Relative URLs work on both custom domains and GitHub repository subpaths.
  const prefix = path === 'dist/index.html' ? './' : '../';
  const portable = html.replace(/(href|src|poster)="\/(?!\/)/g, `$1="${prefix}`);
  await writeFile(path, await format(portable, { parser: 'html', printWidth: 100 }));
}
