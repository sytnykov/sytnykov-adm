import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {programTreeTemplates} from './schemaTypes/programTree'

/** One settings document for the whole site, always the same id. */
const SINGLETONS = new Set(['siteSettings'])

export default defineConfig({
  name: 'default',
  title: 'Ситников Адмін',

  projectId: 'z82t1cbr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Вміст')
          .items([
            S.listItem()
              .title('Налаштування сайту')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Налаштування сайту')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETONS.has(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // no "create new" for the singleton; the Block 1 draft is one click away
    templates: (templates) => [
      ...templates.filter(({schemaType}) => !SINGLETONS.has(schemaType)),
      ...programTreeTemplates,
    ],
  },

  document: {
    // the settings document can be edited and published, not duplicated or deleted
    actions: (actions, {schemaType}) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
