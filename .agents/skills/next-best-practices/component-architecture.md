# Component Architecture — Separation of Concerns

## Rule: Keep utility/business logic OUT of component files

Large pure functions (data formatters, exporters, validators, computations) must live in dedicated files under `src/lib/` — never inline in a React component file.

### Why

- **Readability**: Component files should describe UI, not algorithms.
- **Testability**: Pure functions in `lib/` are trivially unit-testable without rendering.
- **Reusability**: Other components or server routes can import the same logic.
- **Bundle size**: Tree-shaking works better with clear module boundaries.

### Threshold

Move a function out when ANY of these apply:
- It is **> 15 lines** and does not reference React hooks or JSX.
- It performs **I/O formatting** (text export, PDF generation, CSV serialisation).
- It is a **domain computation** (pricing, validation, scheduling).
- It is duplicated (or likely to be reused) across components.

### Where to put it

| Kind | Location |
|------|----------|
| Domain logic (workday, pricing, order) | `src/lib/<domain>/<fn>.ts` |
| Generic helpers (dates, strings) | `src/lib/utils/<fn>.ts` |
| API-specific formatting | co-located with the route handler |

### Example (bad → good)

```tsx
// ❌ Bad — 100-line export builder inside a component
// src/components/workday/WorkdayDashboard.tsx
function buildExportTxt(tasks, locale) { /* … 100 lines … */ }
export default function WorkdayDashboard() { /* … */ }
```

```tsx
// ✅ Good — util extracted, component stays lean
// src/lib/workday/exportTxt.ts
export function buildExportTxt(tasks, locale) { /* … */ }

// src/components/workday/WorkdayDashboard.tsx
import { buildExportTxt } from "@/lib/workday/exportTxt";
export default function WorkdayDashboard() { /* … */ }
```

### Companion helpers kept in the component file

Small (< 10 lines) formatting helpers tightly coupled to the view layer — e.g. `formatPlannedSlot` used only in a single `<TaskCard>` — may stay in the component file. If they grow or get reused, extract them.
