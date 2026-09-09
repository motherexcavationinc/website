import { readFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
import { services } from './services.mjs';

const root = resolve('dist');
const pages = ['index.html', ...services.map((service) => `${service.slug}/index.html`)];
let references = 0;
for (const page of pages) {
  const html = await readFile(join(root, page), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${page}: expected one h1`);
  assert.match(html, /<meta\s+name="description"\s+content="[^"]+"/);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:mailto:|tel:|https?:)/.test(reference)) continue;
    const [path, anchor] = reference.split('#');
    let target = path ? resolve(root, page, '..', path) : join(root, page);
    if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
    await stat(target);
    if (anchor)
      assert.ok(
        (await readFile(target, 'utf8')).includes(`id="${anchor}"`),
        `${page}: missing ${reference}`,
      );
    references++;
  }
}
console.log(`Validated ${pages.length} pages and ${references} local references.`);
