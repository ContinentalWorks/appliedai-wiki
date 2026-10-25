---
title: "Refactor in Cycles, Not Up Front"
description: "When building is nearly free, over-engineering at the start is a bet on patterns you have not seen yet. Build what your intuition says, then refactor and delete in recurring cycles, once the patterns that work have shown themselves."
image: "/img/comics/refactor-in-cycles-not-up-front.webp"
---

# Refactor in Cycles, Not Up Front

*When building is nearly free, the right architecture is the one you discover. Build a bunch of features on intuition, then every so often stop and do a major refactor that generalizes what worked and deletes what did not.*

![Three-panel warm editorial strip titled REFACTOR IN CYCLES. Panel 1, captioned Build a bunch of things on instinct.: a woman with short black hair in a rust-red sweater feeds sketches into a glowing amber laptop where a holographic Chief of Agents directs tiny agents building many mismatched wooden contraptions that spill onto her bench. Panel 2, captioned Step back and see what worked.: she stands back with arms crossed, studying the crowded bench, where a few contraptions glow, a few look clumsy and a few are half-built. Panel 3, captioned Keep the good ones, delete the rest.: she sweeps the clumsy ones into a bin while inside the laptop the agents fit the good ones together into one clean machine, and the bench is clear.](/img/comics/refactor-in-cycles-not-up-front.webp)

---

## Two years, or a weekend

At Google I spent two years migrating a huge portion of the Google Cloud front-end code base from Angular 1 to Angular 2. With modern coding tools, that is something that would take a weekend.

That gap changes the economics of architecture. The old discipline said to design carefully up front, because changing the structure later was the expensive part. A migration ate years of a team's life, so you tried hard to only ever need one. When a refactor costs a weekend, or an afternoon, that reasoning inverts. Getting the structure right at the start is no longer the cheap option. It is a guess you pay for in advance, about patterns you have not seen yet.

## The Goldilocks zone

There is a new Goldilocks zone, and you can work in it as a pretty solid intuitive systems architect. It sits between two failures.

**Too much up front.** You over-engineer from the start, building abstractions for a future you are only imagining. You just don't know what's actually going to work, so most of that scaffolding generalizes the wrong thing.

**Too little, forever.** You keep throwing features at the wall and never step back. The code grows in every direction, and each new thing is harder to add than the last.

The zone is the rhythm between them: build out a bunch of features, then every so often do a major refactor. Maybe you throw ten things at the wall and realize three are not great, three are really good, and three need to be refactored. Sometimes the whole thing needs to be refactored. Either way you are refactoring against evidence, the features that actually earned their place, instead of against a forecast.

## Surrender to the process

The posture is surrendering to the process. Follow your intuition. Build a bunch of stuff. Hold your own hypotheses about which patterns are generalizable, and wait to act on them. Then, in cycles, refactor for generalizability and elegance, and delete code.

Recurringly, not all the time. Refactoring constantly is over-engineering spread thin, and never refactoring is how a codebase becomes a junk drawer. The cycle is what makes both halves safe: you can build loosely because you know the cleanup is coming, and the cleanup is good because it has real material to work from.

A useful rule for when a hypothesis is ready: **abstract from the second instance.** The first time you see a pattern, you have an anecdote. The second time, you have something you can name, two callers you can point at, and a shape the abstraction has to fit. Abstracting earlier is the over-engineering this page warns about.

When the flow is working, it feels amazing. You get the speed of building without a plan and the elegance of a codebase that has been thought through, because it has been, just afterwards.

## A real one: the agent's own rulebook

A good example is the agents.md file that every Pluma user's agent reads before it acts, the rulebook for how it behaves. It got bigger and bigger. Each rule was added for a real reason, on the day something went wrong, which is the build-on-intuition half working as intended.

A rulebook that only grows is the junk drawer, though. Today I was able to refactor it and remove a lot of things that didn't make sense: rules that only applied to one task moved into that task's own instructions, duplicates collapsed into one, and lines that no longer earned their place came out. The rules that survived were the ones the evidence had proven. That cycle could not have happened up front, because nobody could have written those rules before the incidents that produced them.

The same shape applies to prompts, skills and wikis as much as to code. Anything that accretes needs a pruning cycle.

## How to tell it is time

- **Adding the next thing is harder than the last one was.** That friction is the codebase telling you its structure no longer fits what it holds.
- **You have seen the same pattern twice.** The second instance is your license to generalize.
- **You are reading around things to find what matters.** Dead code and stale rules tax every future read, by you and by your agents.
- **A batch of features just landed.** The end of a building burst is the natural seam to look back across it.

Then do the refactor as a real event, with a start and an end: name what worked, generalize it, and delete the rest.

## Further Reading

- [Disciplined Compounding](https://compounding.wiki/concepts/disciplined-compounding): why the cycles are what make the gains stack.
- [Iterate at the Speed of Revelation](https://agenticbusiness.wiki/principles/iterate-at-the-speed-of-revelation): the business-level version of letting the evidence reveal the shape.
- [A Bias for Iteration Is the Price of Admission Now](/perspectives/a-bias-for-iteration-is-the-price-of-admission-now)
- [Fixing the Generator Does Not Fix the Fleet](/perspectives/fixing-the-generator-does-not-fix-the-fleet)
- [Software Is Disposable, Context Is the Asset](/perspectives/software-is-disposable-context-is-the-asset)
