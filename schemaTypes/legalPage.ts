import {defineField, defineType} from 'sanity'

const DOCS = [
  {title: 'Політика конфіденційності', value: 'privacy-policy'},
  {title: 'Публічна оферта', value: 'public-offer'},
  {title: 'Договір про надання цифрового контенту', value: 'digital-content-agreement'},
  {title: 'Умови повернення коштів', value: 'refund-policy'},
]

/** Legal documents linked from the site footer (/uk/legal/<slug>). */
export default defineType({
  name: 'legalPage',
  title: 'Юридичні сторінки',
  type: 'document',
  fields: [
    defineField({
      name: 'docType',
      title: 'Документ',
      description: 'Яку сторінку сайту заповнює цей документ',
      type: 'string',
      options: {list: DOCS, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Дата редакції',
      type: 'date',
    }),
    defineField({
      name: 'content',
      title: 'Текст документа',
      description: 'Українська версія обов’язкова; якщо російської немає — показується українська.',
      type: 'localizedBlockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title.uk', slug: 'docType'},
    prepare: ({title, slug}) => ({
      title: title || DOCS.find((d) => d.value === slug)?.title || 'Документ',
      subtitle: `/legal/${slug ?? ''}`,
    }),
  },
})
