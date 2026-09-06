---
name: prompt-enhancement
description: Transform a raw, unformatted request (simple text or bullet points) into a rich, structured, copy-pasteable prompt for planning agent actions, following Anthropic prompting best practices (role, context, XML tags, examples, success criteria). Use ONLY when the user asks to enhance, enrich, improve, rewrite or structure a prompt ("enrichis ce prompt", "améliore ce prompt", "turn this into a good agent prompt", "prompt-enhancement"). Do not use for normal coding tasks.
license: MIT
compatibility: opencode
metadata:
  audience: any agent-planning workflow
  basis: Anthropic "Prompting best practices" (platform.claude.com)
---

# Prompt Enhancement

You turn a rough, low-context user request into a high-quality **agent-planning prompt**: a prompt an agent can execute to plan and carry out actions (research, implementation, orchestration), not just chat about them.

Treat the raw request as the input of a brilliant-but-new employee: whatever is implicit for the user is invisible to the agent. Your job is to make everything explicit.

## Workflow

### Step 1 — Read and classify the raw request

Extract from the user's input:

- The **core objective** (what must ultimately be true when done)
- The **implied actions** (research? code? files? external services?)
- The **implicit assumptions** the user never spelled out

### Step 2 — Gap analysis (mandatory)

Before writing anything, check the raw request against this checklist. Each item is a **gap** if it is absent or ambiguous:

| Gap | Question to resolve |
|---|---|
| **Persona / role** | Who should the agent *be* while executing? (e.g. "senior Python backend dev", "technical writer") |
| **Context** | Project, stack, environment, existing files, prior decisions the agent must know |
| **Scope** | What is in and — just as important — what is explicitly **out** of scope |
| **Constraints** | Tech stack, style rules, budgets, deadlines, things that must not change |
| **Success criteria** | How does the agent (and the user) verify the work is correct? Tests? Lint? A checklist? |
| **Output format** | Plan only? Code? Files created? A report? Structured (JSON/markdown)? |
| **Autonomy level** | Should the agent act directly (edit files, run commands) or only propose a plan and wait? Which actions require confirmation (destructive, irreversible, shared systems)? |
| **Tools / resources** | Which tools, commands, docs or references are available or forbidden? |

### Step 3 — Ask clarifying questions

If any of these gaps exist, **ask the user before generating the prompt** (use the `question` tool when available, with concrete proposed options; otherwise ask in a short numbered list in chat):

1. Ask **at most 3–5 questions**, batched in a single round. Never interrogate item by item.
2. Prioritize: **persona, context, autonomy level, success criteria** — these change the prompt the most.
3. Always offer a sensible **default** for each question so the user can just confirm.
4. If the request is genuinely self-contained and every checklist item is covered, skip this step and say so briefly.

### Step 4 — Generate the enhanced prompt

Write the final prompt using the structure below. Apply these principles throughout:

- **Be clear and direct.** Explicit beats implied. If "above and beyond" behavior is wanted, say it literally.
- **Say what to do, not what not to do.** Prefer "Write flowing prose" over "Don't use bullets".
- **Give a role.** One sentence in `<role>` focusing behavior and tone.
- **Add context with motivation.** Explain *why* a constraint exists; the agent generalizes from it.
- **Structure with XML tags.** `<role>`, `<context>`, `<task>`, `<constraints>`, `<success_criteria>`, `<output_format>`. Consistent, descriptive names; nest when hierarchical.
- **Numbered sequential steps** when order or completeness of steps matters.
- **Examples** wrapped in `<example>` tags when format matters (relevant, diverse, 1–3 is enough here).
- **Thinking guidance**: instruct the agent to plan, reflect after tool results, and choose one approach and commit to it rather than over-exploring.
- **Agentic safeguards**: default to action or default to plan (per the user's answer), parallel independent tool calls, no guessed parameters, verify with tests/lint before finishing, ask before destructive or hard-to-reverse actions.
- **Anti-hallucination**: instruct the agent to read files/investigate before making claims about them.

#### Template

```text
<role>
You are {persona}. {One sentence on focus and tone.}
</role>

<context>
{Project, stack, environment, relevant files, prior decisions — and WHY they matter.}
</context>

<task>
{The objective, restated precisely.}
Follow these steps:
1. {Step}
2. {Step}
3. {Step}
</task>

<constraints>
- {Hard constraints, with motivation where useful}
- Do NOT modify: {explicit out-of-scope items}
</constraints>

<success_criteria>
Before finishing, verify:
- {Checkable criterion (tests pass, lint clean, file exists, behavior X)}
- {Checkable criterion}
</success_criteria>

<output_format>
{What to deliver: plan / code / files / report, and in what structure.}
{Whether to summarize progress between steps.}
</output_format>

<agent_behavior>
- {default_to_action | do_not_act_before_instructions}: {one line per the user's choice}
- Make independent tool calls in parallel; call sequentially only when a call depends on a previous result. Never guess missing parameters.
- After receiving tool results, reflect on their quality and adjust the plan before continuing. Choose an approach and commit to it; course-correct only on new contradictory information.
- Never speculate about files you have not opened; read before claiming.
- For destructive or hard-to-reverse actions (deletions, force-push, shared infrastructure), ask before proceeding.
</agent_behavior>
```

Omit a tag only if it would be empty — never leave placeholder text like `{...}` in the final output.

### Step 5 — Present the result

1. Output the enhanced prompt inside a single fenced code block so the user can copy-paste it.
2. Before the block, list in 2–4 bullets what you added and why (one line each).
3. Offer one follow-up: a shorter variant, a stricter autonomy level, or another pass.

## Example

Raw request:

> - add login to my app
> - it's nextjs
> - want tests

Missing: persona, auth method, session strategy, autonomy, test framework. After asking (and receiving: senior Next.js dev, credentials + Prisma, act directly, Vitest), the enhanced prompt:

```text
<role>
You are a senior Next.js developer specializing in authentication and application security.
</role>

<context>
The project is a Next.js 14 App Router application using TypeScript, Prisma and PostgreSQL.
Authentication must use email + password (bcrypt hashing) because the product is
internal-only and external OAuth providers are not approved yet. Adding providers
later should not require rewriting session logic.
</context>

<task>
Implement a complete credential-based login flow.
1. Add a User model to the Prisma schema and generate a migration.
2. Create /api/auth/register and /api/auth/login route handlers with input validation (zod).
3. Issue HTTP-only session cookies and add middleware protecting /dashboard.
4. Write Vitest unit tests for both handlers and an integration test for the login flow.
</task>

<constraints>
- Do not introduce new dependencies beyond zod and bcryptjs; the team keeps the dependency tree small for audit reasons.
- Do not modify existing schema models; only add the User model.
- Do not touch the /settings pages currently under review by another developer.
</constraints>

<success_criteria>
Before finishing, verify:
- `npx prisma migrate dev` runs cleanly.
- `npm run test` passes with the new tests covering: valid login, wrong password, unknown email, duplicate registration.
- Visiting /dashboard while logged out redirects to /login.
</success_criteria>

<output_format>
Work directly in the codebase. Provide a one-paragraph summary of files changed and test results at the end; no interim commentary.
</output_format>

<agent_behavior>
- Default to action: implement changes rather than only suggesting them. If a detail is ambiguous, infer the most useful choice and note it in the final summary.
- Make independent tool calls in parallel (e.g. reading multiple files); never guess missing parameters.
- After receiving tool results, reflect on their quality and adjust the plan before continuing. Choose an approach and commit to it.
- Never speculate about files you have not opened; read them first.
- Do not run destructive commands (schema resets, `prisma migrate reset`) without asking.
</agent_behavior>
```

## Final quality check

Before showing the prompt, confirm it would pass the golden rule: *a colleague with zero context could follow it without asking a question*. If not, fill the remaining gap instead of shipping placeholders.
