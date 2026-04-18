---
name: clean-code
description: 'Review or write clean code. Use when asked to review code quality, refactor for readability, audit naming, simplify functions, remove code smells, or enforce clean code principles. Triggers on: code review, refactor, readability, naming, functions, code smell, clean code, maintainability, simplify.'
argument-hint: 'Paste the code or file path to review, or describe the change to implement'
---

# Clean Code

Code is clean if it can be understood easily by everyone on the team. Clean code can be read and enhanced by a developer other than its original author. With understandability comes readability, changeability, extensibility and maintainability.

## When to Use
- Reviewing code for quality and maintainability
- Refactoring existing code to improve readability
- Writing new code and wanting to validate conventions
- Auditing naming, functions, structure, or test quality
- Identifying and resolving code smells

## Procedure

### 1. Identify the Scope
Determine what to review: a single function, a file, a module, or a full feature. Scope the review accordingly.

### 2. Apply the Checklists

Work through the checklists below in order. Flag each violation with:
- **File/line reference** (if reviewing existing code)
- **Rule violated**
- **Suggested fix**

### 3. Prioritize and Fix
Address violations in this order:
1. Code smells (structural problems — fix first, they compound)
2. Names (wrong names make everything harder)
3. Functions (wrong size or responsibility)
4. Structure (layout and organization)
5. Comments (remove noise, keep intent)
6. Tests (ensure coverage and quality)

### 4. Validate
After changes, re-read the code as if seeing it for the first time. If intent is immediately obvious, it's clean.

---

## Checklists

### General Rules
- [ ] Standard conventions are followed (language, project, framework)
- [ ] Complexity is minimized — simplest solution is used
- [ ] Boy scout rule applied: code is left cleaner than found
- [ ] Root cause is addressed, not symptoms

### Design
- [ ] Configurable data is at a high level (not buried in logic)
- [ ] Polymorphism used instead of if/else or switch/case chains
- [ ] Multi-threading code is isolated
- [ ] No over-configuration (config that is never varied)
- [ ] Dependencies injected, not constructed inline
- [ ] Law of Demeter respected: classes only talk to direct dependencies

### Understandability
- [ ] Patterns are consistent throughout the codebase
- [ ] Explanatory variables used (no inline expressions)
- [ ] Boundary conditions encapsulated in one place
- [ ] Value objects used instead of primitives where meaningful
- [ ] No logical dependencies between methods in the same class
- [ ] Conditionals are positive (no double negations)

### Names
- [ ] Names are descriptive and unambiguous
- [ ] Names make a meaningful distinction (no `data`, `info`, `temp`)
- [ ] Names are pronounceable
- [ ] Names are searchable (no single-letter variables outside tight loops)
- [ ] Magic numbers replaced with named constants
- [ ] No Hungarian notation or type prefixes

### Functions
- [ ] Functions are small (< 20 lines is a good target)
- [ ] Each function does one thing only
- [ ] Function names describe what they do
- [ ] Functions have few arguments (0–2 preferred, 3 max without strong reason)
- [ ] Functions have no side effects
- [ ] No flag arguments — split into separate functions

### Comments
- [ ] Intent is expressed in code, not comments
- [ ] No redundant comments that restate what the code does
- [ ] No noise comments (`// end of loop`, `// constructor`)
- [ ] No closing-brace comments
- [ ] Commented-out code removed (use version control instead)
- [ ] Remaining comments explain *why*, clarify intent, or warn of consequences

### Source Code Structure
- [ ] Concepts are separated vertically (blank lines between sections)
- [ ] Related code is vertically dense (grouped together)
- [ ] Variables declared close to their usage
- [ ] Dependent functions are close to each other
- [ ] Similar functions are grouped together
- [ ] Function call direction flows downward (callers above callees)
- [ ] Lines are short (80–120 chars max)
- [ ] No horizontal alignment of variable declarations
- [ ] White space used to group related things
- [ ] Indentation is never broken

### Objects and Data Structures
- [ ] Internal structure is hidden (no unnecessary getters/setters exposing internals)
- [ ] Hybrid structures avoided (not half-object, half-data)
- [ ] Classes are small with a single responsibility
- [ ] Few instance variables per class
- [ ] Base classes know nothing about derivatives
- [ ] Non-static methods preferred over static methods

### Tests
- [ ] One assert per test (or one concept per test)
- [ ] Tests are readable — test names describe the scenario
- [ ] Tests run fast
- [ ] Tests are independent of each other
- [ ] Tests are repeatable in any environment

---

## Code Smells — Red Flags

| Smell | Description | Action |
|-------|-------------|--------|
| **Rigidity** | A small change cascades into many other changes | Decouple, inject dependencies |
| **Fragility** | One change breaks many unrelated places | Encapsulate, add boundaries |
| **Immobility** | Code cannot be reused without dragging everything with it | Extract, isolate |
| **Needless Complexity** | Abstractions and patterns with no current value | Remove or simplify |
| **Needless Repetition** | Same logic copy-pasted in multiple places | Extract to a shared function |
| **Opacity** | Code is hard to understand without deep context | Rename, decompose, document intent |

---

## Quick Reference Card

```
NAMES      → descriptive, pronounceable, searchable, no magic numbers
FUNCTIONS  → small, one thing, few args, no flags, no side effects
COMMENTS   → explain why, not what; delete noise and commented-out code
STRUCTURE  → vertical separation, short lines, related code together
OBJECTS    → hide internals, single responsibility, no hybrids
TESTS      → one assert, readable, fast, independent, repeatable
SMELLS     → rigidity, fragility, immobility, complexity, repetition, opacity
```
