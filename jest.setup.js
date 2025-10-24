require('@testing-library/jest-dom')

// Mock ResizeObserver for OpenLayers
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
