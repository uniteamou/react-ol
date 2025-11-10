# 🫶 Contributing to React OL

Thanks for taking the time to contribute!  
This project wraps the [OpenLayers](https://openlayers.org/) mapping framework with React components and hooks for a modern, composable developer experience.

We welcome bug reports, feature requests, and pull requests from everyone.

---

## 🚀 Getting Started

### 1. Fork and Clone
```bash
git clone https://github.com/uniteamou/react-ol.git
cd react-ol
npm install
```

### 2. Run the Example App
To quickly test your changes in a live environment:
```bash
cd examples/basic-map
npm install
npm run dev
```
This launches a Vite dev server and mounts `<App />` using components from your local build.

### 3. Build the Library
```bash
npm run build
```
The output goes into the `lib/` folder via [Tsup](https://tsup.egoist.dev/).

---

## 🧪 Running Tests
Unit tests use [Jest](https://jestjs.io/) with `ts-jest` and `@testing-library/react`.

```bash
npm test
```

Test files live alongside source files as `*.test.tsx` or `*.test.ts`.

---

## 🌿 Branching & Workflow
1. Create a new branch for your fix or feature:
   ```bash
   git checkout -b feat/new-component
   ```
2. Make your changes and commit (see the convention below).
3. Push to your fork and open a Pull Request against `main`.

CI will lint, test, and trigger a Release PR automatically if the commit type warrants a version bump.

---

## 🧩 Commit Message Convention

This repo uses **[Conventional Commits](https://www.conventionalcommits.org/)** and **Release Please** to automate versioning and changelog generation.

| Type | Use for | Example |
|------|----------|---------|
| `feat:` | New feature or component | `feat: add OlUserLocationLayer` |
| `fix:` | Bug fix | `fix: correct draw event listener cleanup` |
| `docs:` | Documentation updates | `docs: update usage examples in README` |
| `chore:` | Repo maintenance, configs, issue templates | `chore: add GitHub issue templates` |
| `ci:` | Continuous integration | `ci: update node version in release workflow` |
| `test:` | Adding or improving tests | `test: add ol-map rendering test` |
| `refactor:` | Code cleanup or reorganization | `refactor: simplify shallowEqual utility` |

---

## 🧹 Linting & Formatting
We use **ESLint** and **Prettier** to maintain code style.

```bash
npm run lint
npm run format
```

These run automatically in CI before a release.

---

## 🧱 Folder Structure
```
src/               → React + OpenLayers components and hooks
example/           → Vite app for development and demo
.github/           → Workflows and issue templates
lib/               → Build output (auto-generated)
```

---

## 🧾 Submitting a Pull Request
1. Follow the commit convention.  
2. Ensure `npm test` passes.  
3. Open a PR to the `main` branch.  
4. Link related issues (e.g., `Fixes #123`).

A maintainer will review your contribution, and if approved, it’ll be merged and released via **Release Please**.

---

## 💬 Issue Guidelines
When opening an issue:
- Use one of the provided templates (bug, feature, question).
- Include clear steps to reproduce or describe the feature clearly.
- Add screenshots, code snippets, or example repos if helpful.

---

## 🤝 Code of Conduct
Please be respectful and constructive in all interactions.  
By participating, you agree to follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

---

### ❤️ Thank You
Your contributions make React OL better for everyone.  
Happy mapping!
