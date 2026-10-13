---
title: "Hyperlocal Context"
slug: /concepts/hyperlocal-context
description: "A placement rule for everything an agent has to know: each piece of context lives beside the work it is about, and the agent reads it only when that work comes up. One memory that only grows is read whole on every turn, and that is where it fails."
image: "/img/comics/concepts/hyperlocal-context.webp"
---

# Hyperlocal Context

*A placement rule for everything an agent has to know: each piece of context lives beside the work it is about, and the agent reads it only when that work comes up. [Hyperlocal Skills](/concepts/hyperlocal-skills) is the same rule applied to skills.*

![Three-panel warm editorial ink-and-wash strip on a cream ground, titled HYPERLOCAL CONTEXT. In every panel the same woman in her forties with curly auburn hair, round tortoiseshell glasses and a mustard cardigan sits at a wooden desk, seen over her right shoulder, facing a glowing translucent amber laptop. Panel one, labeled ONE PILE, READ WHOLE: inside the screen a small rounded agent in a gold military cap is buried under one enormous unrolled scroll, holding a single small envelope, while she waits with her chin on her hand. Panel two, labeled FILED BESIDE THE WORK: she points at the screen, directing, while inside it the agent cuts the scroll into strips with scissors and slides each strip into its own coloured folder on a shelf. Panel three, labeled READ WHEN IT COMES UP: the agent holds the envelope and reads one open folder while every other folder stays closed on the shelf, and she leans back holding a mug of tea.](/img/comics/concepts/hyperlocal-context.webp)

---

## The problem: one memory that only grows

The default home for a lesson is the top of the pile. The harness appends it to a [memory file](/concepts/memory-files), or the operator adds a line to the always-loaded [agent rule file](/concepts/agent-rule-files). Both feel safe, because the agent will see the lesson every session.

That is the cost. The agent reads the whole pile on every turn, whatever the turn is about. A rule about deploying one app is in the room while the agent drafts an email. Fifty such rules are in the room together, and each one takes a little attention from the task in front of it.

The pile also loses its shape. Lessons arrive in the order they were learned, so the third rule about invoices sits forty lines from the first. Nobody can say which line governs what, and the agent stops applying them the way the operator meant.

## The rule: route by trigger, not by importance

For every piece of context, ask one question: **when does this need to fire?** The answer names its home.

| It matters... | It lives in... |
| --- | --- |
| Only while doing one task | that task's [skill file](/concepts/skill-files) |
| Only inside one repo | that repo's agent rule file |
| Only inside one project | that project's state file |
| Only when one person comes up | that person's file |
| At a moment nobody can predict | the always-loaded rule file, as one line |

Importance is the wrong sorting key, and it is the one people reach for. A rule that prevents a broken deploy is important. It still belongs with the deploy, because that is the only moment it can help. Putting it at the top because it matters means it is read a thousand times and used ten.

## Why a folder does the work

Software engineering calls this **separation of concerns**: the code that builds a PDF does not also build a slide deck, because a change to one should never break the other. Instructions behave the same way. Mix two concerns in one file and an edit for the first quietly changes the second.

A folder separates them without any machinery. The path is the trigger. A harness already reads the rule file nearest to where it is working, plus that file's ancestors (the nested cascade described in [Agent Rule Files](/concepts/agent-rule-files)). It already loads a skill only when a request matches the skill's description. So context filed beside its subject arrives when the subject does, and stays out of the way otherwise.

No retrieval system is involved. The agent finds the file the way an engineer would, by where it sits. This is the same bet as [agentic search over a corpus on disk](/perspectives/rag-is-the-wrong-default-for-knowledge-bases), made one step earlier: at the moment of filing, where it costs almost nothing.

## What stays global

Only the rules whose trigger cannot be predicted. A privacy rule, a rule about commits, a rule about how to ask the operator a question: these can fire in the middle of any work, so they have to be loaded for all of it.

That set is smaller than it feels. One operator's always-loaded file had grown to 52,000 characters, because it was the place every lesson went. Sorting each rule by its trigger brought the file to 12,000. The rest moved into the skills and repos the rules were about.

Keep a test for anything asking to go in the global file. If the lesson only matters while doing X, it goes with X.

## Hyperlocal home, global pointer

Context filed locally has one weakness: from outside its folder, nothing knows it exists. An agent working somewhere else will reinvent the rule, or break it.

The fix is a pointer. The always-loaded file carries one line that names the topic and says where the full rule lives. The line costs a sentence of attention on every turn. The rule it points at costs nothing until it is needed. Where the harness supports it, an import line does the same job: the rule gets its own file, and every place that needs it carries a reference to that one file.

Never paste the rule into two places. Two copies of one rule means one of them goes stale, and both still read correctly on their own, so nobody notices. This is the delivery half of the problem, covered in [Discoverability Is a Just-in-Time Problem](/perspectives/discoverability-is-a-just-in-time-problem).

## Moving a rule

Placement is a first guess, and it gets corrected in both directions.

- **Push down.** A line in the global file that only applies to one task is paying rent on every turn. Move it to the task.
- **Promote.** A rule buried in one project's notes that turns out to apply everywhere should move up, as one line.
- **Wait for the second case.** A rule that has come up once belongs where it came up. Promote it when a second place needs it.

Promoting is cheap and demoting is expensive. A local rule that proves general is easy to lift. A global rule that was really about one repo has usually drifted by the time anyone checks, because nothing made it change when the repo did.

## Failure modes this prevents

- **The diluted session.** Every turn carries every rule, and the agent follows the relevant ones less reliably as the file grows.
- **The stale rule.** Context kept far from its subject does not change when the subject changes. Kept in the same folder, it shows up in the same diff.
- **The forked rule.** The same instruction in two files, edited separately, now disagreeing.
- **The invisible rule.** A good rule in a folder nobody is standing in, with no pointer to it.

---

## Sources

- Jake Van Clief, ["Why Does Your AI Forget How You Like Things Done?"](https://youtube.com/shorts/_T-luiUAidY) (2026). The short that makes the folder argument from separation of concerns.

## Further Reading

- [Hyperlocal Skills](/concepts/hyperlocal-skills): this rule applied to skills, with the symlink index that serves as the global pointer.
- [Agent Rule Files](/concepts/agent-rule-files): the always-loaded layer, and the nested cascade that makes a folder act as a trigger.
- [Memory Files](/concepts/memory-files): the pile this rule replaces, and where each kind of remembered thing belongs.
- [Context Engineering](/disciplines/context-engineering): the discipline this placement rule belongs to.
- [Discoverability Is a Just-in-Time Problem](/perspectives/discoverability-is-a-just-in-time-problem): why a pointer has to arrive at the moment of use.
- [Personal Agentic Edge](https://supersuit.wiki/concepts/personal-agentic-edge): what the context is and why it is yours. This page covers where it sits.
