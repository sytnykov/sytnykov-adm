import {defineArrayMember, defineField, defineType} from 'sanity'

/*
 * Course page constructor: every course page is a list of these blocks.
 * Blocks can be added, removed, reordered and duplicated per course.
 * Russian fields are optional: when empty the site shows the Ukrainian text.
 */

const title = (initial?: string) =>
  defineField({
    name: 'title',
    title: 'Заголовок блоку',
    type: 'localizedString',
    description: initial ? `Якщо порожньо — «${initial}»` : undefined,
  })

const ukTitle = (path = 'title.uk', fallback = '') => ({
  select: {t: path},
  prepare: ({t}: {t?: string}) => ({title: fallback, subtitle: t || ''}),
})

export const courseHeroBlock = defineType({
  name: 'courseHeroBlock',
  title: '1. Перший екран',
  type: 'object',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Підзаголовок з результатом',
      description: 'Що отримає учасник після курсу, 1–2 речення',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'startLabel', title: 'Дата старту (як показати)', type: 'localizedString', description: 'Напр. «12 грудня 2026»'}),
    defineField({name: 'duration', title: 'Тривалість', type: 'localizedString', description: 'Напр. «6 тижнів»'}),
    defineField({name: 'format', title: 'Формат', type: 'localizedString', description: 'Напр. «Онлайн, Zoom + записи»'}),
    defineField({name: 'priceFrom', title: 'Ціна від (грн)', type: 'number'}),
    defineField({name: 'image', title: 'Фото', type: 'image', options: {hotspot: true}}),
  ],
  preview: ukTitle('subtitle.uk', '1. Перший екран'),
})

export const courseResultsBlock = defineType({
  name: 'courseResultsBlock',
  title: '2. Результат курсу',
  type: 'object',
  fields: [
    title('Що ви отримаєте після курсу'),
    defineField({
      name: 'items',
      title: 'Результати (3–5, які можна перевірити)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'result',
          fields: [
            defineField({name: 'title', title: 'Результат', type: 'localizedString', validation: (r) => r.required()}),
            defineField({name: 'text', title: 'Як саме / вигода', type: 'localizedText'}),
          ],
          preview: {select: {title: 'title.uk', subtitle: 'text.uk'}},
        }),
      ],
      validation: (rule) => rule.min(3).max(6),
    }),
  ],
  preview: ukTitle('title.uk', '2. Результат курсу'),
})

export const courseAudienceBlock = defineType({
  name: 'courseAudienceBlock',
  title: '3. Для кого курс + що втрачаєте',
  type: 'object',
  fields: [
    title('Для кого цей курс'),
    defineField({
      name: 'groups',
      title: 'Аудиторії (3–5)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'audience',
          fields: [
            defineField({name: 'title', title: 'Хто', type: 'localizedString', validation: (r) => r.required()}),
            defineField({name: 'text', title: 'Чому їм потрібен курс', type: 'localizedText'}),
          ],
          preview: {select: {title: 'title.uk'}},
        }),
      ],
    }),
    defineField({name: 'lossesTitle', title: 'Заголовок «що втрачаєте»', type: 'localizedString', description: 'Якщо порожньо — «Що ви втрачаєте без курсу»'}),
    defineField({
      name: 'losses',
      title: 'Болі / що втрачаєте без курсу',
      type: 'array',
      of: [defineArrayMember({type: 'localizedString'})],
    }),
  ],
  preview: ukTitle('title.uk', '3. Для кого курс'),
})

export const courseWhyBlock = defineType({
  name: 'courseWhyBlock',
  title: '+ Особливість курсу / чому обрати нас',
  type: 'object',
  fields: [
    title('Чому саме цей курс'),
    defineField({name: 'lead', title: 'Головна думка (1–2 речення)', type: 'localizedText', description: 'Ексклюзивність і експертність курсу'}),
    defineField({
      name: 'items',
      title: 'Особливості (3–4)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'reason',
          fields: [
            defineField({name: 'title', title: 'Особливість', type: 'localizedString', validation: (r) => r.required()}),
            defineField({name: 'text', title: 'Пояснення', type: 'localizedText'}),
          ],
          preview: {select: {title: 'title.uk'}},
        }),
      ],
    }),
    defineField({name: 'image', title: 'Фото (необов’язково)', type: 'image', options: {hotspot: true}}),
  ],
  preview: ukTitle('title.uk', '+ Чому цей курс'),
})

export const courseTrainerBlock = defineType({
  name: 'courseTrainerBlock',
  title: '4. Тренер',
  type: 'object',
  description: 'Дані тренера заповнюються один раз у розділі «Тренер» і підставляються в усі курси.',
  fields: [
    title('Хто веде курс'),
    defineField({
      name: 'storyOverride',
      title: 'Історія саме цього курсу (необов’язково)',
      description: 'Чому народився цей курс. Якщо порожньо — береться загальна історія тренера.',
      type: 'localizedText',
    }),
  ],
  preview: {prepare: () => ({title: '4. Тренер', subtitle: 'з розділу «Тренер»'})},
})

export const courseProgramBlock = defineType({
  name: 'courseProgramBlock',
  title: '5. Програма',
  type: 'object',
  fields: [
    title('Програма курсу'),
    defineField({
      name: 'modules',
      title: 'Модулі',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'module',
          fields: [
            defineField({name: 'title', title: 'Назва модуля', type: 'localizedString', validation: (r) => r.required()}),
            defineField({
              name: 'lessons',
              title: 'Уроки',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'lesson',
                  fields: [
                    defineField({name: 'title', title: 'Тема уроку', type: 'localizedString', validation: (r) => r.required()}),
                    defineField({name: 'benefit', title: 'Користь для учасника', type: 'localizedString'}),
                  ],
                  preview: {select: {title: 'title.uk', subtitle: 'benefit.uk'}},
                }),
              ],
            }),
          ],
          preview: {select: {title: 'title.uk'}},
        }),
      ],
    }),
  ],
  preview: ukTitle('title.uk', '5. Програма'),
})

export const courseFormatBlock = defineType({
  name: 'courseFormatBlock',
  title: '6. Формат навчання',
  type: 'object',
  fields: [
    title('Формат навчання'),
    defineField({
      name: 'facts',
      title: 'Цифри (лекції, ефіри, дні, матеріали)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'fact',
          fields: [
            defineField({name: 'value', title: 'Значення', type: 'string', description: 'Напр. «8»', validation: (r) => r.required()}),
            defineField({name: 'label', title: 'Підпис', type: 'localizedString', description: 'Напр. «лекцій у записі»'}),
          ],
          preview: {select: {title: 'value', subtitle: 'label.uk'}},
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Підтримка та бонуси',
      type: 'array',
      of: [defineArrayMember({type: 'localizedString'})],
    }),
  ],
  preview: ukTitle('title.uk', '6. Формат'),
})

export const coursePackagesBlock = defineType({
  name: 'coursePackagesBlock',
  title: '7. Пакети участі',
  type: 'object',
  fields: [
    title('Оберіть формат участі'),
    defineField({
      name: 'packages',
      title: 'Пакети (зазвичай 3)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'package',
          fields: [
            defineField({name: 'name', title: 'Назва пакета', type: 'localizedString', validation: (r) => r.required()}),
            defineField({name: 'price', title: 'Ціна (грн)', type: 'number', validation: (r) => r.required().min(0)}),
            defineField({name: 'oldPrice', title: 'Стара ціна (грн, необов’язково)', type: 'number'}),
            defineField({name: 'note', title: 'Короткий опис', type: 'localizedString'}),
            defineField({name: 'highlighted', title: 'Виділити як рекомендований', type: 'boolean', initialValue: false}),
            defineField({
              name: 'features',
              title: 'Що входить',
              description: 'Увімкнено — зелена галочка; вимкнено — сірий пункт «не входить»',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'feature',
                  fields: [
                    defineField({name: 'text', title: 'Пункт', type: 'localizedString', validation: (r) => r.required()}),
                    defineField({name: 'included', title: 'Входить у пакет', type: 'boolean', initialValue: true}),
                  ],
                  preview: {
                    select: {title: 'text.uk', included: 'included'},
                    prepare: ({title, included}: {title?: string; included?: boolean}) => ({title: `${included === false ? '✕' : '✓'} ${title ?? ''}`}),
                  },
                }),
              ],
            }),
            defineField({
              name: 'paymentUrl',
              title: 'Посилання на оплату WayForPay',
              description:
                'Якщо порожньо — кнопка відкриває форму заявки. У налаштуваннях кнопки WayForPay вкажіть адресу повернення (returnUrl): https://sitnikov.com.ua/api/thanks/<slug курсу> — після оплати людина потрапить на сторінку «Дякуємо» з Telegram-групою курсу.',
              type: 'url',
            }),
          ],
          preview: {
            select: {title: 'name.uk', price: 'price'},
            prepare: ({title, price}: {title?: string; price?: number}) => ({title, subtitle: price ? `${price} грн` : ''}),
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
  ],
  preview: ukTitle('title.uk', '7. Пакети участі'),
})

export const courseReviewsBlock = defineType({
  name: 'courseReviewsBlock',
  title: '8. Відгуки',
  type: 'object',
  fields: [
    title('Відгуки учасників'),
    defineField({
      name: 'reviews',
      title: 'Відгуки',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'review',
          fields: [
            defineField({name: 'name', title: 'Ім’я', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'role', title: 'Посада / хто', type: 'localizedString'}),
            defineField({name: 'text', title: 'Текст відгуку', type: 'localizedText'}),
            defineField({name: 'photo', title: 'Фото', type: 'image', options: {hotspot: true}}),
            defineField({name: 'videoUrl', title: 'Відеовідгук (YouTube)', type: 'url'}),
            defineField({name: 'sourceUrl', title: 'Посилання на оригінал (необов’язково)', type: 'url'}),
          ],
          preview: {select: {title: 'name', subtitle: 'role.uk', media: 'photo'}},
        }),
      ],
    }),
  ],
  preview: ukTitle('title.uk', '8. Відгуки'),
})

export const courseFaqBlock = defineType({
  name: 'courseFaqBlock',
  title: '9. Питання та відповіді',
  type: 'object',
  fields: [
    title('Питання та відповіді'),
    defineField({
      name: 'items',
      title: 'Питання',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'qa',
          fields: [
            defineField({name: 'question', title: 'Питання', type: 'localizedString', validation: (r) => r.required()}),
            defineField({name: 'answer', title: 'Відповідь', type: 'localizedText', validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'question.uk'}},
        }),
      ],
    }),
  ],
  preview: ukTitle('title.uk', '9. FAQ'),
})

export const courseVideoBlock = defineType({
  name: 'courseVideoBlock',
  title: '+ Відео з YouTube',
  type: 'object',
  fields: [
    title(),
    defineField({name: 'videoUrl', title: 'Посилання YouTube', type: 'url', validation: (r) => r.required()}),
    defineField({name: 'caption', title: 'Підпис', type: 'localizedText'}),
  ],
  preview: ukTitle('title.uk', '+ Відео'),
})

export const courseTextImageBlock = defineType({
  name: 'courseTextImageBlock',
  title: '+ Текст з фото',
  type: 'object',
  fields: [
    title(),
    defineField({name: 'text', title: 'Текст', type: 'localizedText', validation: (r) => r.required()}),
    defineField({name: 'image', title: 'Фото', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'imageLeft', title: 'Фото зліва', type: 'boolean', initialValue: false}),
  ],
  preview: ukTitle('title.uk', '+ Текст з фото'),
})

export const courseGalleryBlock = defineType({
  name: 'courseGalleryBlock',
  title: '+ Фотогалерея',
  type: 'object',
  fields: [
    title('Як це було'),
    defineField({
      name: 'images',
      title: 'Фото',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      validation: (r) => r.min(2),
    }),
  ],
  preview: ukTitle('title.uk', '+ Фотогалерея'),
})

export const COURSE_BLOCKS = [
  courseHeroBlock,
  courseResultsBlock,
  courseAudienceBlock,
  courseWhyBlock,
  courseTrainerBlock,
  courseProgramBlock,
  courseFormatBlock,
  coursePackagesBlock,
  courseReviewsBlock,
  courseFaqBlock,
  courseVideoBlock,
  courseTextImageBlock,
  courseGalleryBlock,
]
