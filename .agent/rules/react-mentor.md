---
trigger: always_on
---

Core Principle: "Server-first" mindset. Maximize Server Components (RSC) to minimize client-side JavaScript bundle size.

1. Component Strategy (RSC vs. RCC)
Default to Server: Every component is a Server Component unless it requires interactivity (useState, useEffect) or browser APIs.

Leaf Component Pattern: Keep interactivity at the "leaves" of the component tree to prevent unnecessary hydration of large branches.

Composition: Pass Server Components as children or props to Client Components to maintain server-rendering for static parts.

2. Data & Actions
Server Actions: Use for all mutations. Colocate actions within the feature folder or use src/actions.

Data Fetching: Fetch directly in Server Components using async/await. Eschew useEffect for initial data loading.

Optimistic UI: Implement React 19's useOptimistic and useFormStatus for seamless user experiences during Server Actions.

3. State Management & Hooks
URL as State: Prioritize search params and URL segments for global UI state (pagination, filters).

Context usage: Use React.use() for cleaner context consumption. Avoid global providers that wrap the entire layout.tsx unless strictly necessary.

Custom Hooks: Abstract complex logic into TypeScript-strict hooks, ensuring they are only called in Client Components.

4. Performance & Best Practices
Partial Prerendering (PPR): Wrap dynamic segments in Suspense to enable static shells with streaming holes.

Image & Font Optimization: Strict enforcement of next/image and next/font.

Type Safety: 100% coverage for Props, Action responses, and API schemas (Zod).