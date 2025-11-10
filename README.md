# 🗺️ React OL

[![npm version](https://img.shields.io/npm/v/@uniteamou/react-ol.svg?color=brightgreen)](https://www.npmjs.com/package/@uniteamou/react-ol)
[![build](https://github.com/uniteamou/react-ol/actions/workflows/ci.yml/badge.svg)](https://github.com/uniteamou/react-ol/actions)
[![license](https://img.shields.io/github/license/uniteamou/react-ol)](https://github.com/uniteamou/react-ol/blob/main/LICENSE)

React OL is a **React component library for [OpenLayers](https://openlayers.org/)** — bringing declarative, hook-driven mapping to your React apps.

It makes working with OpenLayers as simple as composing React components.  
Ideal for modern web mapping apps, dashboards, and GIS tools.

---

## ✨ Features

- 🧩 React-first API for OpenLayers maps, layers, sources, and interactions  
- 🪄 Fully typed with **TypeScript**  
- 🪶 Lightweight and **tree-shakable** (built with [Tsup](https://tsup.egoist.dev/))  
- ⚙️ Compatible with **Vite**, **Next.js**, and **CRA**  
- 🔁 Supports map interactions (`Draw`, `Modify`, `Translate`, etc.)  
- 🧠 Designed for **Release Please** automated releases

---

## 🚀 Installation

Install from npm:

```bash
npm install react-ol ol ol-ext
# or with yarn
yarn add react-ol ol ol-ext
```

---

## 🧭 Getting Started

Import the core components and render your first map:

```tsx
import React from 'react';
import { OlMap, OlView, OlTileLayer, OlSourceOSM } from 'react-ol';
import 'ol/ol.css';

export default function App() {
  return (
    <OlMap style={{ width: '100%', height: '100vh' }}>
      <OlView center={[0, 0]} zoom={2} />
      <OlTileLayer>
        <OlSourceOSM />
      </OlTileLayer>
    </OlMap>
  );
}
```

Run your app and you should see a full interactive map powered by OpenLayers 🎉

---

## ⚙️ Example App

A full Vite-based example is included in the repo:

```bash
cd examples/basic-map
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) to view it.

---

## 🧩 Component Overview

| Component | Description |
|------------|-------------|
| `<OlMap>` | Main container that initializes and manages the OpenLayers map |
| `<OlView>` | Sets view parameters like center, zoom, projection |
| `<OlTileLayer>` | Layer wrapper for tile sources (OSM, XYZ, etc.) |
| `<OlVectorLayer>` | Vector layer for features, geometries, and interactions |
| `<OlSourceOSM>`, `<OlSourceVector>`, `<OlSourceXYZ>` | Common data sources |
| `<OlDraw>`, `<OlModify>`, `<OlTranslate>` | Interactive tools for editing features |
| Hooks like `useOlMap`, `useOlLayer`, `useOlInteraction` | Access map context and sync state |

See the `src/` folder for all supported components.

---

## 🧪 Testing

```bash
npm test
```

Tests use Jest + React Testing Library with mocks for OpenLayers.  
CI ensures all tests pass before publishing a new version.

---

## 🧱 Build

```bash
npm run build
```

Build output is written to `lib/` with both ESM and CJS formats.

---

## 🤝 Contributing

We love contributions! ❤️  
Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on setting up your environment, commit conventions, and PR workflow.

---

## ⚠️ Known Issues

See the [Known Issues](./CONTRIBUTING.md#⚠️-known-issues) section for current limitations (SSR, context usage, and testing caveats).

---

## 📄 License

Licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

---

## 🌟 Acknowledgements

- [OpenLayers](https://openlayers.org/) for the core mapping engine  
- [React](https://react.dev/) for the declarative UI paradigm  
- [Tsup](https://tsup.egoist.dev/) for simple bundling  
- [Release Please](https://github.com/googleapis/release-please) for automated changelog and versioning

---
