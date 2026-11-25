import {defineType} from 'sanity'

/** Multi-line text in two languages (paragraphs, answers, descriptions). */
export default defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {name: 'uk', type: 'text', rows: 3, title: 'Українська'},
    {name: 'ru', type: 'text', rows: 3, title: 'Русский'},
  ],
})
