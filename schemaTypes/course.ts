import {defineArrayMember, defineField, defineType} from 'sanity'
import {slugify} from './slugify'
import type {Rule} from 'sanity'

export default defineType({
  name: 'course',
  title: 'Курси',
  type: 'document',
  groups: [
    {name: 'main', title: 'Основне', default: true},
    {name: 'flow', title: 'Потік і оплата'},
    {name: 'page', title: 'Конструктор сторінки'},
    {name: 'legacy', title: 'Старий формат'},
  ],
  fields: [
    defineField({
      name: 'title',
      group: 'main',
      title: 'Назва курсу',
      type: 'localizedString',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      group: 'main',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.uk',
        maxLength: 96,
        slugify,
      },
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      group: 'main',
      title: 'Головне фото (десктоп)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mainImageMobile',
      group: 'main',
      title: 'Головне фото (мобільний)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'previewImage',
      group: 'main',
      title: 'Превью фото',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      group: 'main',
      title: 'Опис курсу',
      type: 'localizedString',
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'courseType',
      group: 'main',
      title: 'Тип курсу',
      type: 'reference',
      to: [{type: 'courseType'}],
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: 'flowStart',
      title: 'Старт потоку',
      description: 'Після цієї дати кнопки оплати автоматично змінюються на «Записатися на наступний потік».',
      type: 'date',
      group: 'flow',
    }),
    defineField({
      name: 'priceValidUntil',
      title: 'Ціна діє до (необов’язково)',
      description: 'Реальна дата закінчення ціни. Показується біля пакетів, лише якщо заповнена.',
      type: 'date',
      group: 'flow',
    }),
    defineField({
      name: 'telegramGroupUrl',
      title: 'Посилання на Telegram-групу курсу',
      description:
        'Кнопка на сторінці «Дякуємо» після оплати. Якщо порожньо — на сторінці буде «менеджер надішле посилання».',
      type: 'url',
      group: 'flow',
    }),
    defineField({
      name: 'sections',
      title: 'Блоки сторінки',
      description:
        'Додавайте, видаляйте й перетягуйте блоки. Якщо список порожній — показується старий формат сторінки.',
      type: 'array',
      group: 'page',
      of: [
        defineArrayMember({type: 'courseHeroBlock'}),
        defineArrayMember({type: 'courseResultsBlock'}),
        defineArrayMember({type: 'courseAudienceBlock'}),
        defineArrayMember({type: 'courseWhyBlock'}),
        defineArrayMember({type: 'courseTrainerBlock'}),
        defineArrayMember({type: 'courseProgramBlock'}),
        defineArrayMember({type: 'courseFormatBlock'}),
        defineArrayMember({type: 'coursePackagesBlock'}),
        defineArrayMember({type: 'courseReviewsBlock'}),
        defineArrayMember({type: 'courseFaqBlock'}),
        defineArrayMember({type: 'courseVideoBlock'}),
        defineArrayMember({type: 'courseTextImageBlock'}),
        defineArrayMember({type: 'courseGalleryBlock'}),
      ],
    }),
    defineField({
      name: 'firstBlock',
      title: 'Перший блок (старий формат)',
      description: 'Використовується, лише якщо в «Конструкторі сторінки» немає блоків.',
      type: 'object',
      group: 'legacy',
      fields: [
        defineField({
          name: 'title',
          title: 'Заголовок',
          type: 'localizedString',
        }),
        defineField({
          name: 'content',
          title: 'Контент',
          type: 'localizedBlockContent',
        }),
      ],
    }),
    defineField({
      name: 'secondBlock',
      title: 'Другий блок (старий формат)',
      type: 'object',
      group: 'legacy',
      fields: [
        defineField({
          name: 'title',
          title: 'Заголовок',
          type: 'localizedString',
        }),
        defineField({
          name: 'accordion',
          title: 'Акордеон',
          type: 'array',
          of: [{type: 'accordionItem'}],
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
