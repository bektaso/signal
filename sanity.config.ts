import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
    name: 'signalton',
    title: 'Signalton CMS',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3i2rg51e',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        // Singletons
                        S.listItem()
                            .title('Site Settings')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings')
                            ),
                        S.listItem()
                            .title('Navigation')
                            .child(
                                S.document()
                                    .schemaType('navigation')
                                    .documentId('navigation')
                            ),
                        S.divider(),
                        // Documents
                        S.documentTypeListItem('page').title('Pages'),
                        S.documentTypeListItem('product').title('Products'),
                    ]),
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
})
