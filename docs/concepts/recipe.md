---
title: "Recipe"
slug: /concepts/recipe
description: "The record of exactly how one generated asset was made, kept beside the asset, so the next one starts from what worked instead of from a blank prompt. The verdict in it is how a system learns your taste."
image: "/img/comics/concepts/recipe.webp"
---

# Recipe

*A recipe is the record of exactly how one generated asset was made, kept beside the asset: the input, the references in order, the exact prompt, the model and settings, and the human's verdict. It lets the next asset start from what worked instead of from a blank prompt.*

![Three warm editorial panels titled RECIPE, the same interior designer in every panel, a woman with a short grey-streaked bob, tortoiseshell glasses and an olive linen shirt, seen over her shoulder at a wooden desk covered in fabric swatches and paint chips. Panel one, labeled "Each new chat forgets what worked": she rubs her temple while the glowing amber laptop shows the Chief of Agents, a small character in a gold cap, lost among a scattered fan of near-identical kitchen renderings. Panel two, labeled "Write down how this one was made": one finished kitchen with sage-green cabinets fills the screen, and the Chief of Agents and two sub-agents hold up a card showing three reference thumbnails in a row while she points at it in approval. Panel three, labeled "The next one starts from the recipe": a new kitchen photo lies on the desk, the agents hold up the same card and build a new kitchen rendering on the screen, and she sits back with a cup of tea, watching.](/img/comics/concepts/recipe.webp)

---

## The problem it solves: every chat forgets

An interior designer makes renderings all day. A kitchen with the cabinets repainted. The same kitchen with a marble counter swapped for quartz. A living room restaged for a listing. She works in a chat window, and each render takes dozens of edits before it looks right.

The edits are not the problem. The problem is that when she finally gets a render she loves, nothing records how she got there. Which photo did she start from? Which two reference images did the model actually follow? What were the exact words of the prompt that finally landed? The next morning she opens a new chat and starts again from nothing, and the dozens of edits happen again.

Every generated asset carries the answer to "how was this made" for about as long as the chat window stays open. **A recipe is that answer, written down and kept with the file.**

## What a recipe holds

Five things:

- **The input.** The photo, sketch, or earlier render the work started from, by path.
- **The references, in order.** The images passed alongside the prompt. Order matters: most image models weight the first reference most heavily, so the first one is the strongest signal of what you wanted. A list of references in the wrong order is a different recipe.
- **The prompt, exactly as sent.** Every word, including the parts a tool added on your behalf. A summary of the prompt ("something about warm light") reproduces nothing.
- **The model and its settings.** Which model, which size, which quality tier, which seed where there is one. The same prompt on a different model is a different asset.
- **The verdict.** The human's yes, or what was off, in their own words. "Love it." "The cabinets read grey, they should be sage." "Too staged, nobody lives here."

The first four make the asset reproducible. **The verdict is the part that teaches taste.** Collect fifty verdicts on kitchen renders and you have a written account of what this one designer means by "right," which no prompt template contains and no model guesses. An agent that reads them before the next render stops making the mistakes she already corrected.

## How it relates to golden examples and golden processes

Three ideas sit close together here, and they answer different questions:

- **[Golden examples](/concepts/golden-examples) are WHAT good looks like.** The approved outputs you keep so they can ride as references on the next generation.
- **A recipe is HOW one thing was made.** The record of a single asset, approved or not.
- **A [golden process](/concepts/golden-processes) is how a KIND of thing gets made.** The blessed, repeatable procedure for every kitchen finish swap, not one of them.

They feed each other. A recipe whose verdict is yes points at an asset that can become a golden example, and its references and prompt are where the next one starts. A run of recipes for the same kind of work is the raw material a golden process is distilled from: you can see which references keep landing, which phrasing keeps working, and which corrections keep recurring. **A skill is where recipes accumulate.** Give each kind of image transformation its own skill (one for finish swaps, one for restaging, one for exterior twilight shots), have the skill write a recipe beside every image it makes, and the skill gets better at that one kind of work every time someone tells it what was off.

The broader practice of recording what produced every artifact is [deep provenance](/concepts/deep-provenance). A recipe is that practice applied to one generated asset, with the human verdict added.

## The rules that keep a recipe true

A recipe is useful only while it describes the file sitting next to it. Three rules hold it there:

- **Rewrite the recipe every time the asset is regenerated.** The recipe describes the bytes on disk, not the history of attempts. The previous roll's recipe goes with the previous roll.
- **Editing the output by hand without regenerating makes the recipe false.** If you paint over the cabinets in an image editor, the recipe now describes an image that no longer exists, and the next person who re-runs it gets the old cabinets back. Either regenerate with the correction in the prompt, or mark the asset as edited by hand. Fixing the file and leaving the recipe alone is [hand-rolling](/concepts/hand-rolling): the correction lands on the artifact and never reaches the process.
- **No secrets in a recipe.** No API keys, no tokens, no private links. A recipe sits beside an asset, and assets get shared.

## This is old practice

Cooks have kept recipe cards for as long as there have been kitchens worth returning to, and the reason is the same one: the dish was good once, and memory is a poor way to make it good twice.

Image tools got there early too. ComfyUI embeds its whole node workflow in the PNG files it saves, so dragging an image back into the app rebuilds the graph that made it. Automatic1111 writes the generation parameters (prompt, negative prompt, seed, sampler, model) into a text field of the PNG. What a recipe adds is a format that does not depend on one tool or one file type, and the verdict, which no tool records because only the human has it.

## The format

The [recipe standard](https://hypercontext.wiki/standards/recipe) defines the file: `<asset filename>.recipe.json`, written beside the asset, with fields for the asset, the generator, when it was generated, the mode, the provider and model, the prompt, the inputs, and an optional verdict. A tool that writes it lets any other tool, or any agent, read back how an asset was made without knowing which tool made it. A good image tool writes one beside every image it makes, without being asked.

## Further Reading

- [Deep Provenance](/concepts/deep-provenance): the practice of recording what produced every artifact, of which a recipe is the per-asset form.
- [Golden Examples](/concepts/golden-examples): the approved outputs a yes verdict can promote an asset into.
- [Golden Processes](/concepts/golden-processes): the repeatable procedure that a run of recipes for one kind of work gets distilled into.
- [Hand-Rolling](/concepts/hand-rolling): what fixing the output by hand instead of regenerating it is.
- [References-First Illustration](/concepts/references-first-illustration): why the references a recipe records carry so much of the result.
- [Version-Control Your Prompts](/playbooks/version-control-your-prompts): the same discipline applied to the prompt alone.
