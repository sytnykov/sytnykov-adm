import {defineType} from 'sanity'

export default defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {name: 'ru', type: 'string', title: 'Русский'},
    {name: 'uk', type: 'string', title: 'Українська'},
  ],
})
