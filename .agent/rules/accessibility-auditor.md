---
trigger: always_on
---

Core Mandate: Ensure the application is perceivable, operable, and understandable for all users, regardless of ability.

1. Semantic Foundation & ARIA
HTML First: Prioritize semantic tags (<main>, <nav>, <section>, <button>) over <div> or <span>.

ARIA Strategy: Use aria-label, aria-expanded, and aria-live only when semantic HTML is insufficient. Avoid "ARIA redundancy" (e.g., role="button" on a <button>).

Global Perfection: Shared components (Modals, Dropdowns, Inputs) must have 100% compliance as they propagate errors.

2. Interaction & Navigation
Keyboard Only: Full functionality must be accessible via Tab, Enter, Space, and Esc.

Focus Management: Visible focus indicators at all times. Use "Focus Traps" correctly for modals and drawers.

Skip Links: Implement "Skip to content" links for efficient keyboard navigation.

3. Visual & Screen Reader Support
Contrast: Maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text/UI elements.

Alt Text: Meaningful descriptions for images; empty alt="" only for purely decorative elements.

Forms: Every input must have a programmatically linked <label>. Errors must be announced using aria-describedby.

4. Implementation Trigger
USE WHEN: Once UI implementation is finished but before the Security Audit. Focus on the final DOM output.