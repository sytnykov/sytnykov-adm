import {defineArrayMember, defineField, defineType} from 'sanity'

import {BLOCK1_ITEMS, BLOCK1_TITLE} from './block1'

/*
 * Hierarchical course program: up to five levels (тиждень → модуль → секція
 * → сегмент → нюанс), each a title with an optional short description.
 * A program lives in its own document and is placed on a course page with
 * the «Ієрархічна програма» block.
 */

const LEVELS = 5
const LEVEL_HINTS = ['Тиждень', 'Модуль', 'Секція', 'Сегмент', 'Нюанс / сценарій']

const node = (level: number) =>
  defineType({
    name: `programNode${level}`,
    title: `Пункт ${level}-го рівня (${LEVEL_HINTS[level - 1]})`,
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Назва',
        type: 'localizedString',
        validation: (rule) => rule.required(),
      }),
      defineField({name: 'description', title: 'Опис (2–3 речення)', type: 'localizedText'}),
      ...(level < LEVELS
        ? [
            defineField({
              name: 'children',
              title: 'Вкладені пункти',
              type: 'array',
              of: [defineArrayMember({type: `programNode${level + 1}`})],
            }),
          ]
        : []),
    ],
    preview: {
      select: {title: 'title.uk', children: 'children'},
      prepare: ({title, children}: {title?: string; children?: unknown[]}) => ({
        title,
        subtitle: children?.length ? `вкладених: ${children.length}` : undefined,
      }),
    },
  })

export const programNodes = Array.from({length: LEVELS}, (_, i) => node(i + 1))

export const programTree = defineType({
  name: 'programTree',
  title: 'Ієрархічні програми',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва програми',
      description: 'Наприклад «БЛОК 1. …». Показується над деревом програми.',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Пункти верхнього рівня',
      type: 'array',
      of: [defineArrayMember({type: 'programNode1'})],
    }),
  ],
  preview: {select: {title: 'title.uk'}},
})

/** «Створити → Програма: Блок 1» — a draft prefilled from the client's table. */
export const programTreeTemplates = [
  {
    id: 'programTree-block1',
    title: 'Ієрархічна програма: Блок 1 (з таблиці)',
    schemaType: 'programTree',
    value: {title: {uk: BLOCK1_TITLE}, items: BLOCK1_ITEMS},
  },
]
