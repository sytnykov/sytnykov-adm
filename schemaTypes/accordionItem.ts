import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'accordionItem',
  title: 'Елемент акордеону',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Теги',
      type: 'array',
      of: [{type: 'localizedString'}],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Посилання на відео',
      type: 'url',
    }),
  ],
})
