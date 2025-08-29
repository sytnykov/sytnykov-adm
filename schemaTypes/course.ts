import {defineField, defineType} from 'sanity'
import type {Rule} from 'sanity'

export default defineType({
  name: 'course',
  title: 'Курси',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва курсу',
      type: 'localizedString',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.uk',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 96),
      },
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Головне фото (десктоп)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mainImageMobile',
      title: 'Головне фото (мобільний)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'previewImage',
      title: 'Превью фото',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Опис курсу',
      type: 'localizedString',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'courseType',
      title: 'Тип курсу',
      type: 'reference',
      to: [{type: 'courseType'}],
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'firstBlock',
      title: 'Перший блок',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Заголовок',
          type: 'localizedString',
          validation: (rule: Rule) => rule.required(),
        }),
        defineField({
          name: 'content',
          title: 'Контент',
          type: 'localizedBlockContent',
          validation: (rule: Rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'secondBlock',
      title: 'Другий блок',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Заголовок',
          type: 'localizedString',
          validation: (rule: Rule) => rule.required(),
        }),
        defineField({
          name: 'accordion',
          title: 'Акордеон',
          type: 'array',
          of: [{type: 'accordionItem'}],
          validation: (rule: Rule) => rule.required().min(1),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.uk',
      subtitle: 'courseType.title.uk',
      media: 'previewImage',
    },
  },
})
