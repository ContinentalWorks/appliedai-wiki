---
title: "Agents Should Write Like Aircraft Manuals"
slug: /perspectives/agents-should-write-like-aircraft-manuals
description: "Tell your agent to write in Simplified Technical English, the standard for aircraft maintenance manuals. Short, plain sentences take less of your attention to check, and they show you the claims that are false."
image: "/img/comics/perspectives/agents-should-write-like-aircraft-manuals.webp"
---

# Agents Should Write Like Aircraft Manuals

*Tell your agent to write in Simplified Technical English (ASD-STE100), the standard for aircraft maintenance manuals. You read everything the agent writes, so plain words save the attention you spend to check it. They also show you the claims that are false.*

![Three-panel strip titled WRITE LIKE AN AIRCRAFT MANUAL. The same woman with a silver bob, glasses and an olive-green cardigan sits at a wooden desk, seen from behind her shoulder, with a glowing amber laptop in front of her. Panel 1, labeled "Clever prose takes long to check.": on the screen a small figure in a gold cap unrolls a long scroll of tangled, looping script, and she holds her head. Panel 2, labeled "Plain lines take seconds to check.": the figure holds up a short checklist of plain ruled lines with a small airplane-wing drawing, and she reads with a mug in her hand. Panel 3, labeled "A false claim stands out fast.": she points at the screen, one line on the checklist glows red, and the figure crosses it out with a gold pencil.](/img/comics/perspectives/agents-should-write-like-aircraft-manuals.webp)

---

## The problem: agent prose costs you attention

A model writes fluent prose by default. It likes long sentences, clever images and new terms. Each of these adds work for the person who reads the output.

The reader is you. In agentic work, you are the one who checks the output. Andrej Karpathy calls the AI an "over-eager junior intern savant" who "bullshits you all the time." So he keeps it on "a very tight leash" ([his post on AI-assisted coding](https://x.com/karpathy/status/1915581920022585597)). A leash only works if you can read fast what the agent says.

On 2026-10-31 the operator who runs this wiki told his agent: "you use language that's a little bit annoyingly like clever or complex." That is the cost. A clever sentence makes you decode it before you can judge it.

## What the standard says

Simplified Technical English is a controlled language for technical writing. The European aerospace industry made it in the late 1970s, at the request of the airlines. [The maintenance group's site](https://www.asd-ste100.org/) gives the goal: to make maintenance manuals "easier to understand for readers with only a basic command of English." The first guide came out in 1986. Issue 9 is from January 2025, and you can get a free copy there.

[The group's "About" page](https://www.asd-ste100.org/about.html) gives the reason in one line: "Complex technical instructions can be misunderstood and misunderstandings can lead to accidents."

The standard has two parts: writing rules and a dictionary. [The ASD summary page](https://www.asd-europe.org/standards-specifications/simplified-technical-english/what-are-the-basics-of-simplified-technical-english) lists the main rules:

- Use the active voice.
- Write one instruction in each sentence.
- Use no synonyms or jargon that you do not need.
- Keep sentences short.
- Use the same words across all your documents.

The dictionary has about 900 approved words, and each word has one meaning. The page gives an example: STE uses "start," never "begin," "commence" or "initiate."

## Why it fits an agent so well

**One word, one meaning, helps you catch drift.** An agent that writes "start" in one paragraph and "initiate" in the next makes you ask if two things are different. Under the standard, a new word means a new thing. So a new word gets your attention, and that is where the attention should go.

**Short sentences hold one claim each.** You can check a claim only when you can find it. A 40-word sentence can hold three claims, a hedge and a metaphor. A 20-word sentence holds one claim, and you can say true or false.

**Active voice names the actor.** Passive voice leaves out who did the action. "The agent updates the file" tells you who. In agentic work, who did the action is often the whole question.

**The rules are countable.** Taste is hard to check with code. Sentence length, passive voice and a word list are easy to check. So the rule can be a [gate](/concepts/gates-and-hooks) that refuses bad text.

**Plain text serves both readers.** Karpathy also wrote that "99.9% of attention is about to be LLM attention, not human attention" ([his post on writing for LLMs](https://x.com/karpathy/status/1899876370492383450)). The standard began for readers with basic English, so a model reads it as well as a person does. One plain document serves [the two readers](/concepts/the-two-readers).

## Plain words find false claims

On 2026-10-31 the operator also had his agent rewrite ten pages of a product wiki in plain English. He then asked for more: "A rewrite checks the content, not only the words."

Each claim had to fit in a short, plain sentence. A claim in plain words is easy to check against the product. The pages got much shorter:

- The front page of the product went from 3,906 words to 852.
- The page about where user data goes went from 5,625 words to 1,767.
- The page about the product's web app went from 1,865 words to 691.

The pass also found claims that the product does not make. One page said the maker was a subsidiary company that does not exist. One page described a downloadable app, but the product installs with a script. One page described a standing meeting that had stopped. Fluent prose hid each one. Plain sentences made each one easy to see.

So the standard does two jobs. It saves your attention, and it is a test of what is true. A claim that you cannot say plainly is often a claim that nobody checked.

## How to apply it

1. Write the rule into the agent's standing instructions. A [rule file](/concepts/agent-rule-files) is the right place.
2. Name the standard and give the limits as numbers. Use 20 words for an instruction and 25 for a description.
3. Give a check that code can run. Count sentence length, find passive verbs and flag words from a jargon list.
4. Run the check on what the agent publishes. Fail the build when it finds a new problem.
5. Check the content, not only the words. Tell the agent to cut each claim that it cannot confirm.

Set a scope for the rule. It is for the agent's own writing: its replies, its specs, its skill files and its technical articles. It is not for writing in your own voice. Your essays, your messages and your letters stay yours.

The check does not make your text "STE compliant." The maintenance group does not approve or certify any tool, AI tools included ([downloads page](https://www.asd-ste100.org/STE_downloads.html)). Its [white paper on STE and AI](https://www.asd-ste100.org/assets/files/WhitePaper-ASD-STE100_and_AI.pdf) (June 2026) says that AI tools "cannot replace human oversight." The rule here is a writing rule for your agent, modeled on the standard. You still read what it writes. The rule makes that reading fast.

## Sources

- ASD Simplified Technical English Maintenance Group, [ASD-STE100 home page](https://www.asd-ste100.org/) and [About ASD-STE100](https://www.asd-ste100.org/about.html).
- ASD, [What are the basics of Simplified Technical English?](https://www.asd-europe.org/standards-specifications/simplified-technical-english/what-are-the-basics-of-simplified-technical-english)
- STEMG, [White Paper: ASD-STE100 Simplified Technical English and Artificial Intelligence](https://www.asd-ste100.org/assets/files/WhitePaper-ASD-STE100_and_AI.pdf), June 2026.
- Andrej Karpathy, [post on the inner loop of AI-assisted coding](https://x.com/karpathy/status/1915581920022585597), April 25, 2025.
- Andrej Karpathy, [post on writing for LLM attention](https://x.com/karpathy/status/1899876370492383450), March 12, 2025.

## Further Reading

- [The Two Readers](/concepts/the-two-readers): every artifact has a reader, either the next session or a person
- [The perspective on precise procedures](/perspectives/precise-procedures-are-written-for-the-agent): the other direction, where the agent is the reader
- [Gates and Hooks](/concepts/gates-and-hooks): how to turn a written rule into a check that refuses
- [Agent Rule Files](/concepts/agent-rule-files): where a standing writing rule lives
- [Generation Is Cheap, Discrimination Is the Job](/perspectives/generation-is-cheap-discrimination-is-the-job): why your attention to check output is the constraint
