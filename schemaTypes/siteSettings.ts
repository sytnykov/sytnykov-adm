import {defineField, defineType} from 'sanity'

/**
 * One document for the whole site (opened from «Налаштування сайту»).
 * An empty field keeps the value the site already shows.
 */
export default defineType({
  name: 'siteSettings',
  title: 'Налаштування сайту',
  type: 'document',
  groups: [
    {name: 'contacts', title: 'Контакти', default: true},
    {name: 'socials', title: 'Соцмережі'},
    {name: 'media', title: 'Відео та відгуки'},
  ],
  fields: [
    defineField({
      name: 'phone',
      title: 'Телефон',
      description: 'Наприклад +380 66 255 54 86. Порожньо — поточний номер на сайті.',
      type: 'string',
      group: 'contacts',
      validation: (rule) =>
        rule.custom((v?: string) =>
          !v || v.replace(/\D/g, '').length >= 10 ? true : 'Перевірте номер: замало цифр',
        ),
    }),
    defineField({name: 'email', title: 'E-mail', type: 'string', group: 'contacts', validation: (rule) => rule.email()}),
    defineField({
      name: 'telegram',
      title: 'Telegram',
      description: 'Посилання t.me на канал, групу або особистий акаунт.',
      type: 'url',
      group: 'contacts',
    }),
    defineField({name: 'facebook', title: 'Facebook', type: 'url', group: 'socials'}),
    defineField({name: 'instagram', title: 'Instagram', type: 'url', group: 'socials'}),
    defineField({name: 'linkedin', title: 'LinkedIn', type: 'url', group: 'socials'}),
    defineField({name: 'youtube', title: 'YouTube', type: 'url', group: 'socials'}),
    defineField({name: 'tiktok', title: 'TikTok', type: 'url', group: 'socials'}),
    defineField({
      name: 'googleReviewsUrl',
      title: 'Профіль у Google (відгуки)',
      description:
        'Посилання на профіль компанії в Google Maps. Поки поле порожнє, кнопки «Відгуки в Google» на сайті немає.',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Відео-візитка (YouTube)',
      description: 'Посилання на відео YouTube. Поки поле порожнє, блоку з відео на головній немає.',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'videoTitle',
      title: 'Назва відео',
      description: 'Підпис під відео на головній і назва для Google.',
      type: 'localizedString',
      group: 'media',
    }),
    defineField({
      name: 'videoUploadDate',
      title: 'Дата публікації відео на YouTube',
      description: 'Потрібна Google, щоб показати відео в пошуку.',
      type: 'date',
      group: 'media',
    }),
  ],
  preview: {prepare: () => ({title: 'Налаштування сайту'})},
})
