// @ts-check
import process from 'node:process'
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'
import starlightChangelogs, {
  makeChangelogsSidebarLinks,
} from 'starlight-changelogs'

const isDevMode = process.argv.includes('dev')

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
          watch: isDevMode,
        }),
        starlightChangelogs(),
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
        ...makeChangelogsSidebarLinks([
          {
            type: 'all',
            base: 'changelog',
            label: 'All versions',
          },
        ]),
      ],
    }),
  ],
})
