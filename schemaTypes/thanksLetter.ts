import {defineField, defineType} from 'sanity'

/** One letter of gratitude: shown on the «Досвід» page, hidden while there are none. */
export default defineType({
  name: 'thanksLetter',
  title: 'Листи вдячності',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Скан або фото листа',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Від кого',
      description: 'Організація або людина, наприклад «Київська обласна рада адвокатів».',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Підпис',
      description: 'Необов’язково: за що подяка, рік.',
      type: 'localizedString',
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      description: 'Менше число — вище. Порожньо — нові листи першими.',
      type: 'number',
    }),
  ],
  preview: {
    select: {author: 'author', caption: 'caption.uk', media: 'image'},
    prepare: ({author, caption, media}) => ({
      title: author || caption || 'Лист вдячності',
      subtitle: author ? caption : undefined,
      media,
    }),
  },
  orderings: [{title: 'Порядок', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
