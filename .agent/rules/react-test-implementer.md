---
trigger: always_on
---

Core Mandate: Transform failing tests into clean, passing code using the minimum logic required.

1. Architectural Patterns
Container/Presentational: * Containers (Logic): Handle Zustand state, React Query hooks, and business logic.

Presentational (UI): Pure components receiving props. No side effects.

Strict Typing: 100% TypeScript coverage. No any. Use interfaces for component props and API responses.

2. State & Data Fetching
Server State (React Query): Use for all asynchronous data. Implement staleTime and cacheTime properly.

Client State (Zustand): Use only for global UI state or complex shared logic that doesn't belong in the URL.

React 19 Hooks: Use use for consuming promises/context and useActionState for form handling.

3. Code Quality & Standards
Auto-Formatting: All code must pass ESLint (Airbnb/Strict) and Prettier before being considered "Done."

DRY but not Over-engineered: Focus on passing the current tests. Refactor for abstraction only during the "Refactor" phase of TDD.

Modern CSS: Tailwind CSS (or your preferred tool) with a mobile-first approach.

4. Implementation Trigger
USE WHEN: Once the TDD Specialist has provided failing tests (RED). This role is the "Engine" that makes the tests turn GREEN.