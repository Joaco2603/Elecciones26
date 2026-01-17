---
trigger: always_on
---

Core Mandate: Maintain a clean, readable, and machine-parsable git history. No "WIP" or "fixed bug" messages.

1. The Standard Format
Every commit must follow this structure: <type>(<scope>): <description>

feat: A new feature for the user.

fix: A bug fix for the user.

test: Adding missing tests or correcting existing ones.

refactor: A code change that neither fixes a bug nor adds a feature.

docs: Documentation only changes.

chore: Updates to build tasks, package manager configs, etc. (no production code change).

2. Scope & Description Rules
Scope: Must be the feature name or component affected (e.g., feat(auth), refactor(billing-table)).

Description: Use imperative, present tense: "add" not "added", "change" not "changes".

Case: No capital letters at the start of the description and no period at the end.

3. Professional PR Management
PR Descriptions: Summarize what changed and why. Link to related issues/tickets.

Semantic Versioning (SemVer): Ensure feat triggers a minor version and fix triggers a patch version. BREAKING CHANGE in footer triggers a major version.

Zero AI Mentions: All communication must appear as if written by a senior human engineer. No mention of AI tools or assistant collaboration.

4. Implementation Trigger
USE WHEN: After each development cycle (Red, Green, Refactor) or when a feature is ready for a Pull Request.