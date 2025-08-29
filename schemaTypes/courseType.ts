import {defineField, defineType} from 'sanity'

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
        source: (doc) => doc.title?.ru,
        maxLength: 96,
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
