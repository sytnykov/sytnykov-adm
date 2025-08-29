import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Анонси',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва анонсу',
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
      name: 'description',
      title: 'Опис',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Дата початку',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.uk',
      media: 'previewImage',
      startDate: 'startDate',
    },
    prepare({title, media, startDate}) {
      return {
        title,
        subtitle: startDate ? new Date(startDate).toLocaleString('uk-UA') : 'Без дати',
        media,
      }
    },
  },
})
