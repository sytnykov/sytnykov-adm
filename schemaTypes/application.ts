import {defineField, defineType} from 'sanity'

/** Requests from the site forms (written by the site, status edited by the team). */
export default defineType({
  name: 'application',
  title: 'Заявки з сайту',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      title: 'Статус',
      type: 'string',
      options: {
        list: [
          {title: 'Нова', value: 'new'},
          {title: 'В роботі', value: 'in_progress'},
          {title: 'Оброблена', value: 'done'},
          {title: 'Спам', value: 'spam'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({name: 'submittedAt', title: 'Дата', type: 'datetime', readOnly: true}),
    defineField({name: 'source', title: 'Звідки', type: 'string', readOnly: true}),
    defineField({name: 'name', title: 'Ім’я', type: 'string', readOnly: true}),
    defineField({name: 'phone', title: 'Телефон', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'E-mail', type: 'string', readOnly: true}),
    defineField({name: 'course', title: 'Курс', type: 'string', readOnly: true}),
    defineField({name: 'message', title: 'Повідомлення', type: 'text', readOnly: true}),
    defineField({name: 'page', title: 'Сторінка', type: 'string', readOnly: true}),
    defineField({
      name: 'attribution',
      title: 'Джерело та візит',
      description: 'Канал, перший візит, сторінки, пристрій: заповнює сайт.',
      type: 'text',
      rows: 4,
      readOnly: true,
    }),
    defineField({name: 'note', title: 'Нотатка менеджера', type: 'text'}),
  ],
  orderings: [
    {title: 'Спочатку нові', name: 'newest', by: [{field: 'submittedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {name: 'name', phone: 'phone', source: 'source', status: 'status', date: 'submittedAt'},
    prepare: ({name, phone, source, status, date}) => ({
      title: `${status === 'new' ? '🟢 ' : ''}${name ?? '—'} · ${phone ?? ''}`,
      subtitle: `${source ?? ''} · ${date ? new Date(date).toLocaleString('uk-UA') : ''}`,
    }),
  },
})
