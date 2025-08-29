import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Галерея заходів',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва заходу',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Опис заходу',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Фотографії заходу',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.uk',
      media: 'images.0',
    },
  },
  orderings: [
    {
      title: 'Порядок',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
