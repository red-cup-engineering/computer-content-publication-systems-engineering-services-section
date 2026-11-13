# Computer Content Publication Systems Engineering

<!-- 561-group-standards:badges:start -->
[![Red Cup Engineering](https://img.shields.io/badge/561%20Group-Red%20Cup%20Engineering-c0392b)](https://github.com/red-cup-engineering)
[![License: MIT](https://img.shields.io/badge/license-MIT-c0392b)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/red-cup-engineering/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

This section renders and assembles publication content into audiobook, browser, progressive-web-app, and HTTP artifacts. Install its published package as `@red-cup-engineering/computer-content-publication-systems-engineering-services-section`.

Groups the applications and release services that assemble publication content
into complete web artifacts. Generic HTTP server, edge, platform, SSE, MCP, and
build-projector contracts remain with their systems and networking owners.

- [VICTOR](https://github.com/red-cup-engineering/static-site-publisher) — the Voxelized Information Catalog Topos Orienting Relations website server, serving through `@red-cup-engineering/computer-web-server`.
- [News Property](apps/news-property) owns the news publication application.
- [release candidates](services/web-release-candidate-computer-systems-publishing-engineering-services-section/README.md) and [static-site conformance](services/static-site-conformance-computer-systems-publishing-engineering-services-section/README.md) — publication release verification.
- [artifact inventory serving](scripts/serve-http-artifact-inventory.mjs), [browser asset projection](services/project-browser-asset-tree-computer-systems-publishing-engineering-services-section/README.md), [asset transformation](scripts/transform-browser-asset-inventory.mjs), and [progressive web app projection](scripts/project-progressive-web-app-artifacts.mjs) — completed artifact construction and delivery.
- [site administration reading](services/website-administration-reading-computer-systems-publishing-engineering-services-section/) — configured site administration and endpoint observations.
- `src/audiobook-production.mjs` — the systems interpreter for a
  `SoundScoreNarrationLayer`: provider-limit synthesis grouping, content-addressed
  dispatch, cue rendering, ffmpeg normalization/mastering and M4B muxing, and
  injected Whisper transcription proof. Pure score derivation and edition
  records remain with ebook and voice-audio data owners.

Produce a configured title with:

```sh
node scripts/produce-audiobook-edition.mjs /absolute/path/to/audiobook.json
```

The command writes the admitted specification, fabrication record, and
automated proof named by the configuration. Live provider synthesis is not a
repository check; `test/audiobook-production.test.mjs` uses a stub synthesizer
while exercising real ffmpeg MP3 mastering and chapter-marked M4B muxing.

## Ebook rendition production

The `./ebook-production` export composes the Data-owned fixed edition profile
with the Pandoc/XeLaTeX rendition effect. EPUB, screen PDF, typographic and
illustrated covers, print interiors and wraps, batch production, corpus
assembly, edition issuance and proof extraction have one Systems owner here.
Templates are resolved through the exact ebook Data package exports; paths
never depend on a surrounding checkout. The Kindle pipeline uses this
composition. `ebook-production-cli` is the existing application face.

Production requires Pandoc, XeLaTeX, Fontconfig, Poppler, zip and unzip on the
selected host. Fabrication produces bytes; it does not assert editorial
acceptance or retail publication. Keep manuscript, metadata, cover adoption,
rights and token provenance with the content owner.
