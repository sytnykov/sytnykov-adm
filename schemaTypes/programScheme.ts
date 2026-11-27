import {defineArrayMember, defineField, defineType} from 'sanity'

const step = defineArrayMember({
  type: 'object',
  name: 'schemeItem',
  fields: [
    defineField({name: 'title', title: 'Назва блоку', type: 'localizedString', validation: (r) => r.required()}),
    defineField({name: 'note', title: 'Коротко (1 рядок, необов’язково)', type: 'localizedString'}),
    defineField({
      name: 'course',
      title: 'Курс',
      description: 'Сторінка курсу відкриється в новій вкладці. Поки курс не обрано — блок показується як «Незабаром».',
      type: 'reference',
      to: [{type: 'course'}],
    }),
  ],
  preview: {
    select: {title: 'title.uk', course: 'course.title.uk'},
    prepare: ({title, course}: {title?: string; course?: string}) => ({
      title,
      subtitle: course ? `→ ${course}` : 'Незабаром (курс не обрано)',
    }),
  },
})

/** «Правовий конструктор стратегії судового захисту» on the «Навчання» page. */
export default defineType({
  name: 'programScheme',
  title: 'Схема програми (Навчання)',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Заголовок', type: 'localizedString'}),
    defineField({name: 'descr', title: 'Опис', type: 'localizedText'}),
    defineField({
      name: 'chain',
      title: 'Основна послідовність (зі стрілками)',
      type: 'array',
      of: [step],
      validation: (r) => r.max(6),
    }),
    defineField({name: 'extrasTitle', title: 'Заголовок окремих курсів', type: 'localizedString'}),
    defineField({
      name: 'extras',
      title: 'Окремі курси (без стрілок)',
      type: 'array',
      of: [step],
      validation: (r) => r.max(6),
    }),
  ],
  preview: {prepare: () => ({title: 'Правовий конструктор стратегії судового захисту'})},
})
