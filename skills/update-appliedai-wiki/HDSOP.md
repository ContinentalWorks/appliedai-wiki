---
standard: "https://hypercontext.wiki/standards/hdsop/v2"
title: "Route an input to the right page on appliedai.wiki and ship it"
id: update-appliedai-wiki
version: 0.1
skill: update-appliedai-wiki
doc_status: drafting
tags: [wiki, appliedai, writing, publishing]
frequency: "unknown"
est_time_per_run: "unknown"
automation_potential: "unknown"
related_skills: [publish-boomerang-to-appliedai, add-appliedai-wiki-qa, intake-field-note-into-garys-wikis, supersuit-org-comic]
related_workflows: []
concepts: []
---

# Purpose
An idea that belongs in the applied-AI craft canon becomes a new page or an enriched existing page, in the wiki's voice, with a hero image, built and deployed. The skill also routes input that is not a reflection to the specialist skill that owns it. Without it, near-duplicate pages appear, and hosted files get written up as prose.

# When to use (Trigger)
The owner says "update the applied ai wiki", "add this to appliedai.wiki", "create an appliedai wiki page", "reflection for the applied ai wiki", "publish this skill on appliedai" or "host this skill on the wiki", or describes a concept, claim or playbook for the applied-AI craft canon. It is not for the other SupersuitUp wikis and not for personal-site or FaithWalk content.

# Inputs / Prerequisites
- The input: a reflection (the default), an outside resource, a real question, a boomerang, a skill file to host, or a page to unhide.
- The wiki repo's own CLAUDE.md and the parent supersuit-repos CLAUDE.md, read before drafting.
- `pnpm`, `rg`, `git` worktrees, and the `supersuit-org-comic` skill for the hero.

# Roles
| Role | Responsibility |
|---|---|
| **Human operator** | Supplies the take or file. Tells the skill when a page should come back or a hero should be skipped. |
| **Agent executor** | Classifies the input, checks for an existing page, drafts, makes the hero, builds, commits, pushes and verifies. |

# Procedure

Steps say WHAT happens and who does it. The map is drawn from the block below.

```json steps
{
  "ends": [
    {
      "id": "page-live",
      "what": "The page or hosted file is on main, built, and verified at its live URL."
    },
    {
      "id": "handed-off",
      "what": "A specialist skill owns the work and this skill stops."
    }
  ],
  "steps": [
    {
      "id": "read-conventions",
      "what": "Read the wiki's CLAUDE.md and the parent supersuit-repos CLAUDE.md. They hold page types, anatomy, voice, sidebar wiring and the generic-unattributed posture.",
      "actor": "agent"
    },
    {
      "id": "classify-input",
      "what": "Classify the input. A reflection is the default and stays here. An outside resource goes to applied-ai-field-notes or intake-field-note-into-garys-wikis. A real question goes to add-appliedai-wiki-qa. A boomerang goes to publish-boomerang-to-appliedai. A skill file to host, or a page that used to exist, goes to its own path.",
      "actor": "agent",
      "after": [
        "read-conventions"
      ],
      "outcomes": [
        {
          "when": "outside resource, question or boomerang",
          "do": "invoke the specialist skill",
          "then": "handed-off"
        },
        {
          "when": "skill file to host, or page to restore",
          "then": "route-special-path"
        }
      ]
    },
    {
      "id": "route-special-path",
      "what": "A SKILL.md or script to host goes to the hosting step. A page that was hidden or deleted goes to the unhide step.",
      "actor": "agent",
      "after": [
        "classify-input"
      ],
      "outcomes": [
        {
          "when": "file to host",
          "then": "host-agent-file"
        },
        {
          "when": "page to restore",
          "then": "unhide-page"
        }
      ]
    },
    {
      "id": "host-agent-file",
      "what": "Hosting a SKILL.md or script means shipping the file under static/skills/<name>/, not writing a prose page about it. Check it is not a copy of something with its own public repo. Genericize it: no personal paths or names, an overridable personal command, honest platform limits. Add one row to docs/skills/index.md. Cross-link it both ways. Build, commit, push. Verify with a ClaudeBot user agent, then fetch any hosted script and run bash -n on it.",
      "actor": "agent",
      "after": [
        "route-special-path"
      ],
      "outcomes": [
        {
          "when": "hosted and verified",
          "then": "page-live"
        }
      ]
    },
    {
      "id": "unhide-page",
      "what": "Find the page in git history with git log --diff-filter=D and the hide commit. Restore the original. Never redraft it from memory. Follow the Unhiding checklist in the wiki's own CLAUDE.md: inbound links, redirects, outbound links and the changelog's suppression. Re-link by hand, because the hide commit's diff will not reverse-apply.",
      "actor": "agent",
      "after": [
        "route-special-path"
      ],
      "outcomes": [
        {
          "when": "restored and built",
          "then": "page-live"
        }
      ]
    },
    {
      "id": "make-worktree",
      "what": "Create a throwaway git worktree of appliedai-wiki off main, per the Isolation section of the parent CLAUDE.md. Make every edit and the hero inside it.",
      "actor": "agent",
      "after": [
        "classify-input"
      ]
    },
    {
      "id": "create-or-update",
      "what": "Read all page titles under docs/, then rg several angles: the idea's terms, its metaphor, its opposite and its audience. Expand a spoken name to its likely words first. If the idea smells like a deleted page, search git history for deletions. If a page covers the idea, update it. A bullet or section on an existing page beats a new page.",
      "actor": "agent",
      "after": [
        "make-worktree"
      ]
    },
    {
      "id": "pick-page-type",
      "what": "For a new page only, pick the type: concept, perspective, playbook, discipline, role or engagement pattern. A perspective title is a short declarative claim, not a noun label.",
      "actor": "agent",
      "after": [
        "create-or-update"
      ]
    },
    {
      "id": "draft-page",
      "what": "Follow the page anatomy: frontmatter, H1, one italic definition line, H2 sections, optional Sources, and Further Reading. No branding, no em dashes, no filler. Cross-link the canonical home of every concept.",
      "actor": "agent",
      "after": [
        "pick-page-type"
      ]
    },
    {
      "id": "make-hero",
      "what": "Every new page ships with a comic hero in the same session, through supersuit-org-comic (wiki hero ... --write). Rewrite the alt text it emits, and add inbound links from the nearest pages. If generation fails after reasonable retries, tell the owner before pushing a page without a hero. Skip this for an edit to a page that already has a hero.",
      "actor": "agent",
      "after": [
        "draft-page"
      ]
    },
    {
      "id": "check-sidebar",
      "what": "Most sections are autogenerated, so a new page needs no sidebars.ts edit. Confirm against sidebars.ts before assuming.",
      "actor": "agent",
      "after": [
        "make-hero"
      ]
    },
    {
      "id": "validate-page",
      "what": "Grep the edited files for em dashes and for branding terms. Run pnpm run build and read the line \"no broken internal links\" that prebuild prints.",
      "actor": "agent",
      "after": [
        "check-sidebar"
      ]
    },
    {
      "id": "commit-and-push",
      "what": "Stage the page, the hero and its recipe by name. Commit with a prefix such as \"perspective: <Title>\". Merge to main and push, which deploys.",
      "actor": "agent",
      "after": [
        "validate-page"
      ]
    },
    {
      "id": "verify-docs-page",
      "what": "Fetch the live page with a browser user agent, not a bot one, and check the title tag. The title ships as <title data-rh=true>. For a renamed page, check the old slug's redirect stub by its canonical href.",
      "actor": "agent",
      "after": [
        "commit-and-push"
      ],
      "outcomes": [
        {
          "when": "title matches",
          "then": "page-live"
        }
      ]
    }
  ]
}
```

# Done / Verification
- `pnpm run build` passes and prints "no broken internal links".
- The page has a hero and no em dashes or branding terms.
- The page is live. A docs page is checked with a browser user agent. A hosted file is checked with a bot user agent.
- No near-duplicate was created. Candidates dropped for being covered already are reported.

# Exceptions & Troubleshooting
- **The idea is already covered.** Update that page. Reporting what was dropped and why is part of the output.
- **A docs page returns 403 to a bot user agent.** That is the middleware doing its job. Verify docs pages with a browser user agent.
- **A redirect stub also returns 200.** Check the title tag, not just the status.
- **A page hidden before a section-wide rename comes back with the old convention.** Say so, and offer the rename with redirects.
- **A spoken name matches nothing.** Expand it to its likely words before concluding the idea is new.

# Automation Opportunities
- unknown. The skill does not list any.

# Related
- `publish-boomerang-to-appliedai`: hosts a boomerang under `static/skills/`.
- `add-appliedai-wiki-qa`: answers a real question as a Q&A page.
- `intake-field-note-into-garys-wikis`: the cross-wiki router for outside material.
- `supersuit-org-comic`: makes the hero.

# Revision History
| Version | Date | Changes |
|---|---|---|
| 0.1 | 2026-11-06T21:51:00Z | First map, drafted from SKILL.md. |
