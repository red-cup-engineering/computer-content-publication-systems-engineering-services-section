import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { transformBrowserAssetInventory } from '@red-cup-engineering/computer-content-publication-systems-engineering-services-section/transform-browser-asset-inventory';
import { artifactInventory } from '@red-cup-engineering/computer-content-publication-systems-engineering-services-section/serve-http-artifact-inventory';

const css = ':root{--sample-accent:#3D5588}';
const markup = '<!doctype html><link rel="stylesheet" href="/styles.css">';

function project(style, policy = {}) {
  const result = transformBrowserAssetInventory({
    artifacts: [
      { path: 'index.html', body: markup },
      { path: 'styles.css', body: style, mediaType: 'text/css; charset=utf-8', ...policy },
    ],
    config: { includePaths: ['styles.css'] },
  });
  assert.deepEqual(result.diagnostics, []);
  const entries = new Map(result.artifacts.map(({ path, ...record }) => [path, record]));
  return { entries, reference: result.mapping[0], provider: artifactInventory(entries) };
}
const received = (provider, path) =>
  provider.resources[0].handler({ url: new URL(path, 'https://assets.example.test') });

test('fingerprinted CSS retains the cache decision made by its source', async () => {
  for (const [policy, expected] of [
    [{}, 'public, max-age=31536000, immutable'],
    [{ cacheControl: 'private, no-store' }, 'private, no-store'],
    [{ cacheControl: 'public, max-age=30, must-revalidate' }, 'public, max-age=30, must-revalidate'],
    [{ cacheControl: false }, null],
  ]) {
    const { entries, reference, provider } = project(css, policy);
    assert.equal(entries.get(reference.path).cacheControl, expected ?? false);
    const response = received(provider, '/' + reference.path);
    assert.equal(response.cacheControl, expected ?? undefined);
    assert.equal(response.type, 'text/css; charset=utf-8');
    assert.equal(response.body, css);
  }
});

test('a new stylesheet revision changes its reference and serves only the corresponding bytes', async () => {
  const modified = css.replace('#3D5588', '#00695C');
  const prior = project(css);
  const current = project(modified);
  assert.notEqual(current.reference.path, prior.reference.path);
  const expectedIntegrity = 'sha384-' + createHash('sha384').update(modified).digest('base64');
  assert.equal(current.reference.integrity, expectedIntegrity);
  const html = received(current.provider, '/').body;
  assert.ok(html.includes('href="/' + current.reference.path + '"'));
  assert.ok(html.includes('integrity="' + expectedIntegrity + '"'));
  assert.ok(!html.includes(prior.reference.path));
  const artifact = received(current.provider, '/' + current.reference.path);
  assert.equal(artifact.cacheControl, 'public, max-age=31536000, immutable');
  assert.equal(artifact.body, modified);
});
