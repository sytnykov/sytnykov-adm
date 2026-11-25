import {defineField, defineType} from 'sanity'
import {slugify} from './slugify'

export default defineType({
  name: 'courseType',
  title: 'Типи курсів',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва типу курсу',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => doc.title?.uk || doc.title?.ru,
        maxLength: 96,
        slugify,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.uk',
    },
  },
})
