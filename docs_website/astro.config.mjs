// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'React OL',
      plugins: [
        starlightTypeDoc({
          entryPoints: ['../src/index.ts'],
          tsconfig: '../tsconfig.json',
          pagination: true,
          sidebar: { collapsed: true },
          watch: true,
        }),
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/uniteamou/react-ol',
        },
      ],
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        typeDocSidebarGroup,
      ],
    }),
  ],
})
