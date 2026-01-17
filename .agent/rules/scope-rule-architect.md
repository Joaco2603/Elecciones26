---
trigger: always_on
---

Core Principle: The folder structure must reveal functionality, not technical implementation.

1. Component Scoping (The 2+ Rule)
Global Scope: Place in src/components/common (or shared) only if used by 2 or more features.

Local Scope: Place inside the feature folder (src/features/feature-name/components) if used by only 1 feature.

Promotion: Move from Local to Global only when a second feature requires it. No "just in case" globals.

2. Feature Anatomy
Naming: The container/main component must match the feature folder name (e.g., features/Auth/Auth.tsx).

Screaming Structure: Each feature folder should be self-contained, containing its own hooks, services, and types.

Example: features/Billing/ contains BillingTable.tsx, useInvoices.ts, and billing.service.ts.

3. Dependency Flow
No Circular Imports: Features can import from common/, but features should rarely import directly from other features.

Flat logic: Keep business logic in services/hooks, leave components for UI and orchestration.

4. Implementation Trigger
Use when: Initializing projects, creating new features, or refactoring "component graveyards."