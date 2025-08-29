import {defineType} from 'sanity'

export default defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    {name: 'ru', type: 'blockContent', title: 'Русский'},
    {name: 'uk', type: 'blockContent', title: 'Українська'},
  ],
})
