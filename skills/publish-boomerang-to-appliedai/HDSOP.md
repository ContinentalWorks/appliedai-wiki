---
standard: "https://hypercontext.wiki/standards/hdsop/v2"
title: "Host a boomerang prompt on appliedai.wiki so the owner can send a link"
id: publish-boomerang-to-appliedai
version: 0.1
skill: publish-boomerang-to-appliedai
doc_status: drafting
tags: [wiki, appliedai, boomerang, publishing]
frequency: "unknown"
est_time_per_run: "unknown"
automation_potential: "unknown"
related_skills: [generate-boomerang-prompt, update-appliedai-wiki]
related_workflows: []
concepts: []
---

# Purpose
A finished BOOMERANG.md becomes a hosted reference skill at a stable URL. The owner hands that link to a tester, a friend or a client's staffer instead of a file. Without this, the prompt travels as an attachment, and no index page on the wiki knows it exists.

# When to use (Trigger)
The owner says "host this boomerang", "put the boomerang on the wiki", "I need a boomerang for X on appliedai" or "give me a link I can send them", or a boomerang has just been authored by `generate-boomerang-prompt` and should live at a stable URL. Do not use it to author the boomerang (that is `generate-boomerang-prompt`) or for ordinary wiki pages (that is `update-appliedai-wiki`).

# Inputs / Prerequisites
- A boomerang that conforms to the BOOMERANG.md standard. If it does not exist yet, run `generate-boomerang-prompt` first.
- The `appliedai-wiki` repo, `pnpm`, `rg` and `curl`.
- The standard page's current version number, for the `conforms_to:` field.

# Roles
| Role | Responsibility |
|---|---|
| **Human operator** | Asks for the hosting and receives the send note and the texted link. |
| **Agent executor** | Names and files the payload, wires the three index pages, validates, builds, pushes, verifies the live URL and hands back the send note. |

# Procedure

Steps say WHAT happens and who does it. The map is drawn from the block below.

```json steps
{
  "ends": [
    {
      "id": "link-delivered",
      "what": "The boomerang is live, verified, and the owner has the send note and the texted link."
    }
  ],
  "steps": [
    {
      "id": "name-and-check-sibling",
      "what": "Pick a kebab-case name that describes the return, not the act (for example bug-report). Run ls static/skills/ and rg -il on the idea's terms in docs/. A boomerang that only retargets an existing one belongs as a Common scenario inside that file.",
      "actor": "agent"
    },
    {
      "id": "file-payload",
      "what": "Write static/skills/<name>/BOOMERANG.md. Set conforms_to: to the standard's current version, read off the standard page. Point the Canonical source line at the www URL of this file.",
      "actor": "agent",
      "after": [
        "name-and-check-sibling"
      ]
    },
    {
      "id": "wire-skills-index",
      "what": "Add a row to The library table in docs/skills/index.md, with the full https://www.appliedai.wiki/skills/<name>/BOOMERANG.md link.",
      "actor": "agent",
      "after": [
        "file-payload"
      ]
    },
    {
      "id": "wire-standard-examples",
      "what": "Add a bullet to Worked Examples in docs/reference/standards/boomerang-md.md, using a pathname:/// link. Update the count sentence underneath it.",
      "actor": "agent",
      "after": [
        "wire-skills-index"
      ]
    },
    {
      "id": "wire-concept-page",
      "what": "Add a Worked examples paragraph to docs/concepts/boomerang-prompt.md, before the closing \"The pattern generalizes\" line.",
      "actor": "agent",
      "after": [
        "wire-standard-examples"
      ]
    },
    {
      "id": "validate",
      "what": "Grep the payload and the three index pages for em dashes and for branding terms. Both must return nothing. Then run pnpm run build.",
      "actor": "agent",
      "after": [
        "wire-concept-page"
      ]
    },
    {
      "id": "push",
      "what": "git add the four files by name, commit with the message \"boomerang: <Title>\", and push.",
      "actor": "agent",
      "after": [
        "validate"
      ]
    },
    {
      "id": "verify-live",
      "what": "Run curl -sL with a ClaudeBot user agent against https://appliedai.wiki/skills/<name>/BOOMERANG.md. Expect 200 and real frontmatter. Poll for about a minute before concluding the deploy failed. On a 403, add skills/ to the negative lookahead in middleware.ts and redeploy.",
      "actor": "agent",
      "after": [
        "push"
      ]
    },
    {
      "id": "hand-back-send-note",
      "what": "Give the owner the send note verbatim in a fenced code block. It names the URL, says to paste it into a fresh ChatGPT, Claude or Grok chat, says dictation and not live voice mode, and says what to do with the finished artifact. Add a short read of what the boomerang will surface.",
      "actor": "agent",
      "after": [
        "verify-live"
      ]
    },
    {
      "id": "text-the-link",
      "what": "Text the owner the live URL with the SKILL's named texting skill, update-gary-on-imessage. A wiki update is not done until the owner has the link.",
      "actor": "agent",
      "after": [
        "hand-back-send-note"
      ],
      "outcomes": [
        {
          "when": "texted",
          "then": "link-delivered"
        }
      ]
    }
  ]
}
```

# Done / Verification
- The payload is at `static/skills/<name>/BOOMERANG.md` and the three index pages list it.
- The em dash and branding greps return nothing, and `pnpm run build` passes.
- The blocked-bot-user-agent fetch returns 200 with real frontmatter, not an error page.
- The owner has the send note in chat and the link by text.

# Exceptions & Troubleshooting
- **403 on the live fetch.** A plain curl returns 200 while the agents the file exists for get 403. The middleware matcher spares only the paths it names, and `.md` is not in the asset-extension skip list. Fix the matcher and redeploy.
- **308 on the apex host.** It redirects to `www`. Follow the redirect with `-L`. This is expected, not a failed deploy.
- **Deploy not live yet.** Vercel takes about a minute. Poll rather than conclude it failed.
- **The standard bumped its version.** Read the current version off the standard page. Do not copy it from a sibling boomerang.
- **Branding or a real client name in the payload.** The generic, unattributed posture applies to the payload too. Remove it.

# Automation Opportunities
- unknown. The skill does not list any.

# Related
- `generate-boomerang-prompt`: authors the boomerang and its return schema.
- `update-appliedai-wiki`: ordinary docs pages, and the router that sends boomerang work here.

# Revision History
| Version | Date | Changes |
|---|---|---|
| 0.1 | 2026-11-06T21:51:00Z | First map, drafted from SKILL.md. |
