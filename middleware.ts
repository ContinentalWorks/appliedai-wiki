// POSTURE (2026-10-27, Gary): Continental Works' wiki, MEMBERS ONLY. Every page sits behind the
// Supersuit account (Freedom-account gate, read mode: sign-in at freedom.continentalworks.ai).
// One-page share links (/s/<sig>/<route>) still open a single page for anyone with no sign-in:
// the preset's share layer answers a genuine address before the gate refuses. It needs
// WIKI_PASS_SECRET and WIKI_GATE_SECRET on the Vercel project; a WIKI_PASSWORD opens nothing.
//
// `openPaths` narrows the gate's open set to /skills/ and /generators/ only, because the default
// also leaves .md, .txt and /llms-full.txt open, and /llms-full.txt is every page in one file.
//
// Vercel Routing Middleware from the preset: the family bot-block, the one-page share layer,
// then the account gate.
import { createMiddleware, createFreedomAccountGate } from '@supersuit/docusaurus-preset-wiki/middleware';

const gate = createFreedomAccountGate({ openPaths: /^\/(skills\/|generators\/)/ });

export default createMiddleware({ gate });

export const config = {
  // Run on HTML routes only. Skip static assets so we do not pay function
  // invocations on every CSS, JS, image, or font fetch.
  //
  // `skills/` and `generators/` are intentionally excluded too: this wiki hosts
  // canonical agent SKILL.md and GENERATE.md files under static/skills/<name>/SKILL.md
  // and static/generators/<name>/GENERATE.md, served openly so agents (including
  // blocked-UA crawlers) can fetch and run them while the rest of the wiki stays
  // sealed. Without this, an agent told to fetch a hosted recipe gets a 403 and
  // the recipe is undeliverable, which is exactly what happened before 2026-07-29.
  // Note the `.md` extension is NOT in the asset list below, so these paths would
  // otherwise be matched and blocked. Do not remove these two exclusions.
  matcher: [
    '/((?!assets/|img/|skills/|generators/|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\.(?:js|css|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|map|json|xml)$).*)',
  ],
  runtime: 'edge',
};
