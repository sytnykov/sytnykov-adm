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
    defineField({
      name: 'eventType',
      title: 'Тип заходу',
      type: 'string',
      options: {
        list: [
          {title: 'Безкоштовний вебінар', value: 'webinar'},
          {title: 'Суботня школа', value: 'saturday-school'},
          {title: 'Старт курсу', value: 'course-start'},
          {title: 'Інший захід', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'format',
      title: 'Формат',
      type: 'string',
      options: {
        list: [
          {title: 'Онлайн', value: 'online'},
          {title: 'Офлайн', value: 'offline'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'place',
      title: 'Місце проведення',
      description: 'Місто та адреса, для офлайн-заходу.',
      type: 'string',
      hidden: ({parent}) => parent?.format !== 'offline',
    }),
    defineField({
      name: 'price',
      title: 'Ціна, грн',
      description: '0 — безкоштовно. Порожньо — ціна на сайті не показується.',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Посилання на реєстрацію',
      description: 'Форма, Zoom, сторінка курсу тощо. Якщо заповнено, на сайті з’явиться кнопка «Зареєструватися» (до початку заходу).',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
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
