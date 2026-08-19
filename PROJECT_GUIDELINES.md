# Project Guidelines

This file is the **source of truth for future AI/coding agents** working on this frontend.

## 1. Project Architecture

This project is built with **Vite, React, and JavaScript**.
The architecture is designed to be **simple and practical**.
**Prefer simple organization over excessive architecture.**

### Folder Responsibilities

- `src/components/`: Reusable UI components (e.g., `Button.jsx`, `Navbar.jsx`, `Modal.jsx`). Do NOT create a folder for every component unless it becomes complex enough to genuinely need multiple files.
- `src/pages/`: Route-level pages (e.g., `Home.jsx`, `Login.jsx`). Pages should compose reusable components instead of containing large amounts of reusable UI.
- `src/layouts/`: Shared layouts (e.g., `MainLayout.jsx`). Only create layouts when they are actually needed.
- `src/hooks/`: Reusable React hooks (e.g., `useAuth.js`). Do not create unnecessary folders for individual hooks.
- `src/services/`: API communication and external-service logic (e.g., `api.js`, `authService.js`). Keep API communication separate from UI components. Components should not contain large amounts of API-request logic.
- `src/utils/`: Genuinely reusable helper functions (e.g., `formatDate.js`). If a helper only belongs to one component or feature, keep it close to where it is used. Do NOT use `utils/` as a dumping ground.
- `src/contexts/`: React Contexts. Use only when the application actually needs React Context. Do not put every piece of state into Context. Local state should remain inside the component when possible.
- `src/assets/`: Images, icons, and other static assets.
- `src/styles/`: Genuinely global styles. Do not create unnecessary styling directories.

## 2. When to Create a New Folder (and When NOT to)

- **Do NOT** create folders just because they are common in large projects. A folder should exist only when the project actually needs it.
- **Do NOT** create things such as: repositories, managers, factories, interfaces, providers, abstractions, multiple layers, deeply nested folders unless there is an actual requirement for them.
- A developer should normally be able to find a file within 1–2 directory levels.
- **Keep related code together**: For a small feature, use the existing shared folders. Do NOT immediately create feature-based folders (e.g., `features/posts/...`). Feature-based architecture should only be introduced later if the application becomes large enough to justify it.

## 3. JavaScript Conventions

- Use `.jsx` for React components.
- Use `.js` for JavaScript utilities, services, and hooks.
- Use ES modules (`import` / `export`).
- Use Functional React components and React hooks.
- Use clear and descriptive names.
- **Do NOT** introduce TypeScript files or TypeScript configuration.

## 4. Avoid Premature Abstraction

The application should grow naturally. Do not build an enterprise architecture for a small application.
When choosing between:
A. creating another abstraction/folder/file
B. keeping the logic simple and close to where it is used

**Prefer B**, unless there is a clear reason to choose A.

## 5. Rules for AI/Coding Agents

1. Inspect the existing project structure before creating files.
2. Read `PROJECT_GUIDELINES.md` before making architectural changes.
3. Reuse existing components before creating new ones.
4. Do not create duplicate utilities, hooks, or services.
5. Do not create unnecessary folders.
6. Do not introduce a new architectural pattern without a concrete reason.
7. Keep components reasonably small and focused.
8. Keep API logic outside UI components.
9. Keep feature-specific logic close to where it is used.
10. Do not move existing files unless there is a good reason.
11. Do not add dependencies without checking whether the existing stack already solves the problem.
12. Do not refactor unrelated code while implementing a feature.
13. Prefer the simplest solution that fits the existing architecture.
14. Follow the conventions already established in `PROJECT_GUIDELINES.md`.
15. Before creating a new abstraction, check whether a simpler implementation is sufficient.
