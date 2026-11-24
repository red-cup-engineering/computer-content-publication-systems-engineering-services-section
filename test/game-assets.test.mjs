import assert from 'node:assert/strict';
import test from 'node:test';
import {transformBrowserAssetInventory} from '@red-cup-engineering/computer-content-publication-systems-engineering-services-section/transform-browser-asset-inventory';
import {projectProgressiveWebAppArtifacts} from '@red-cup-engineering/computer-content-publication-systems-engineering-services-section/project-progressive-web-app-artifacts';
import {artifactInventory} from '@red-cup-engineering/computer-content-publication-systems-engineering-services-section/serve-http-artifact-inventory';

test('a game page links to the same fingerprinted module that its offline worker caches and its server returns', () => {
  const assets = new Map([['index.html','<script src="./game.js"></script>'],['game.js','window.turn = 1;']]);
  const transformed = transformBrowserAssetInventory({artifacts:assets});
  assert.deepEqual(transformed.diagnostics, []);
  const [{path}] = transformed.mapping;
  const inventory = new Map(transformed.artifacts.map(record => [record.path,record]));
  const served = artifactInventory(inventory).resources[0];
  const get = path => served.handler({url:new URL(path,'https://game.test/')});
  assert.ok(String(get('/').body).includes(path));
  assert.equal(String(get('/'+path).body), assets.get('game.js'));
  assert.match(get('/'+path).cacheControl, /immutable/);
  assert.ok(get('/'+path).etag);
  assert.equal(get('/absent').status, 404);
  const offline = projectProgressiveWebAppArtifacts({artifacts:inventory, config:{manifest:{name:'Game'}}});
  assert.deepEqual(offline.diagnostics, []);
  assert.ok(offline.artifacts.some(record => record.body.includes('/'+path)));
});
