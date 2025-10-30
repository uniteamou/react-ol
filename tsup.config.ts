import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: ['./src/**/*.{ts,tsx}', '!./src/**/*.test.{ts,tsx}'],
  outDir: './lib',
  format: ['esm'],
  minify: !options.watch,
  clean: true,
  dts: {
    compilerOptions: {
      // Don't fail on unused imports (needed for React JSX)
      noUnusedLocals: false,
      noUnusedParameters: false,
    },
  },
  external: ['react', 'react-dom', 'ol', 'ol-ext'],
  splitting: true,
  treeshake: true,
}));
