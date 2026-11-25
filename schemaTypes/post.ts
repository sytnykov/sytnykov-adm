import {defineField, defineType} from 'sanity'
import {slugify} from './slugify'

export default defineType({
  name: 'post',
  title: 'Публікації',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва публікації',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'previewImage',
      title: 'Фото превью',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => doc.title?.uk,
        maxLength: 96,
        slugify,
      },
      description: 'Адреса статті латиницею. Натисніть «Generate» — вона створиться з української назви.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Контент',
      type: 'localizedBlockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Галерея',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.uk',
      media: 'previewImage',
    },
  },
})
