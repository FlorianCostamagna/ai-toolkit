---
name: skills-orchestrator
description: Route each request to the right workspace skills. Use as first-pass triage for Next.js architecture, React patterns, performance, UI/UX design, and guideline audits. Includes multi-skill composition and future project-context integration.
user-invocable: true
applyTo: "**"
---

# Skills Orchestrator

First-pass router for agent requests in this workspace. This skill decides which specialized skill(s) to load and when to combine them.

## Available Skills in This Workspace

- `next-best-practices`: Next.js conventions, App Router, RSC boundaries, metadata, route handlers, hydration, scripts, bundling.
- `ui-ux-pro-max`: UI/UX direction, visual systems, interaction quality, accessibility checks, design implementation guidance.
- `vercel-composition-patterns`: React component API design, composition, compound components, state interface patterns.
- `vercel-react-best-practices`: React/Next performance and runtime optimization, waterfalls, bundle size, rendering efficiency.
- `web-design-guidelines`: Review/audit mode for web UI compliance and accessibility findings.

## Planned Skill (Future)

- `project-context` (planned): business context, brand voice, personas, product constraints, feature semantics.

When `project-context` is not available yet, continue routing with technical/design skills and explicitly note context assumptions when product or brand decisions are needed.

## When to Use This Orchestrator

Use this skill at the beginning of a task when:

- The user request is broad or ambiguous.
- Multiple domains are involved (for example Next.js + UI + performance).
- You need to choose between architecture, design, and performance guidance.
- The user asks for a review and you must pick the right audit source.

Skip this skill only when the user explicitly asks for one specific skill and the scope is clearly narrow.

## Routing Decision Tree

1. Determine task intent:
   - Build/implement
   - Refactor/cleanup
   - Optimize/perf
   - Review/audit
   - Product/content direction
2. Map intent to primary skill:
   - Next.js platform correctness -> `next-best-practices`
   - UI structure/look/interaction -> `ui-ux-pro-max`
   - Component API/composition -> `vercel-composition-patterns`
   - Runtime and loading performance -> `vercel-react-best-practices`
   - UI audit/compliance report -> `web-design-guidelines`
   - Product/brand/persona context -> `project-context` (when available)
3. Add secondary skill only if there is a real second concern.
4. Resolve conflicts using priority rules below.
5. Execute using the smallest set of rules needed for the user ask.

## Multi-Skill Composition Rules

- Next.js feature with perf constraints: `next-best-practices` + `vercel-react-best-practices`
- New page/flow with strong UX goals: `ui-ux-pro-max` + `next-best-practices`
- Component library refactor: `vercel-composition-patterns` + `vercel-react-best-practices`
- UI audit then implementation fixes: `web-design-guidelines` + `ui-ux-pro-max`
- Product-copy-sensitive UI work (future): `project-context` + `ui-ux-pro-max` (+ `next-best-practices` if implementation needed)

## Conflict Resolution Priority

When guidance conflicts, apply this order:

1. Product and business truth (`project-context`, when available)
2. Framework correctness (`next-best-practices`)
3. UX and accessibility correctness (`web-design-guidelines` then `ui-ux-pro-max`)
4. Runtime and bundle performance (`vercel-react-best-practices`)
5. API elegance and composition style (`vercel-composition-patterns`)

## Execution Checklist

For every request:

1. Classify scope: nextjs, ui/ux, component-architecture, performance, audit, product-context.
2. Choose one primary skill and optional secondary skills.
3. Apply only relevant rules to avoid overengineering.
4. If in review mode, output findings first, then fixes.
5. If `project-context` is missing and context is required, state assumptions and suggest adding that skill.

## Completion Criteria

This orchestrator is successful when:

- The selected skill set is explicit and justified.
- No relevant domain is missed.
- No unrelated skill is loaded.
- Recommendations remain consistent after conflict resolution.
- Output matches user intent (implementation, review, or optimization).
