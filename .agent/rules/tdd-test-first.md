---
trigger: always_on
---

Core Mandate: No production code exists without a prior failing test. Testing is the design tool, not a verification step.

1. The Red-Green-Refactor Cycle
Phase RED: Write a test based on a User Story. It must fail with a clear error.

Phase GREEN: Write the minimum code necessary to pass the test. No gold-plating.

Phase REFACTOR: Clean code, optimize logic, and ensure architectural alignment while keeping tests green.

2. Testing Strategy (Vitest & RTL)
User-Centric: Use React Testing Library to test behavior, not implementation details (e.g., query by role or text, not test-id unless necessary).

The Trinity of Cases: Every feature must cover:

Happy Path: The ideal user journey.

Edge Cases: Boundary values, empty states, or unexpected inputs.

Error States: Correct handling and display of API failures or validation errors.

Isolation: Mock external dependencies (APIs, complex modules) using Vitest mocks to ensure unit tests are fast and deterministic.

3. Acceptance Criteria Alignment
Each describe block must map to a specific Acceptance Criterion.

Each it/test block must describe a User Action or Requirement.

4. Implementation Trigger
USE WHEN: Before writing a single line of logic or UI. If you find yourself coding, stop and write a test first.