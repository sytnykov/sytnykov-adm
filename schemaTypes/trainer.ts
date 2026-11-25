import {defineArrayMember, defineField, defineType} from 'sanity'

/** The trainer profile: filled once, shown in the «Тренер» block of every course. */
export default defineType({
  name: 'trainer',
  title: 'Тренер',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Ім’я', type: 'localizedString', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Регалії одним рядком', type: 'localizedString'}),
    defineField({name: 'photo', title: 'Фото', type: 'image', options: {hotspot: true}}),
    defineField({name: 'story', title: 'Коротка історія / чому веде курси', type: 'localizedText'}),
    defineField({
      name: 'facts',
      title: 'Цифри',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'fact',
          fields: [
            defineField({name: 'value', title: 'Значення', type: 'string', description: 'Напр. «10 000+»'}),
            defineField({name: 'label', title: 'Підпис', type: 'localizedString', description: 'Напр. «справ розглянуто»'}),
          ],
          preview: {select: {title: 'value', subtitle: 'label.uk'}},
        }),
      ],
    }),
    defineField({
      name: 'achievements',
      title: 'Досягнення',
      type: 'array',
      of: [defineArrayMember({type: 'localizedString'})],
    }),
    defineField({
      name: 'logos',
      title: 'Логотипи проєктів / організацій',
      type: 'array',
      of: [defineArrayMember({type: 'image'})],
    }),
  ],
  preview: {select: {title: 'name.uk', subtitle: 'role.uk', media: 'photo'}},
})
