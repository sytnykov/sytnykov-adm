# Sitnikov Admin Panel
 
Административная панель для управления контентом сайта Sitnikov. 

## Структура проекта

```
sitnikov-admin/
├── schemaTypes/           # Схемы данных Sanity
│   ├── announcement.ts    # Схема анонсов
│   ├── blockContent.ts    # Схема блоков контента
│   ├── course.ts         # Схема курсов
│   ├── courseType.ts     # Схема типов курсов
│   ├── gallery.ts        # Схема галереи
│   ├── accordionItem.ts  # Схема элементов аккордеона
│   ├── localizedString.ts # Схема мультиязычных строк
│   ├── localizedBlockContent.ts # Схема мультиязычных блоков
│   ├── post.ts           # Схема постов
│   └── index.ts          # Экспорт всех схем
├── static/               # Статические файлы
├── sanity.config.ts      # Конфигурация Sanity
├── sanity.cli.ts         # CLI конфигурация
└── package.json          # Зависимости проекта
```

## Типы контента

### Анонсы (Announcements)

- Заголовок (мультиязычный)
- Описание (мультиязычное)
- Дата начала

### Курсы (Courses)

- Заголовок (мультиязычный)
- Описание (мультиязычное)
- Тип курса
- Содержание (мультиязычное)
- Аккордеон с тегами (мультиязычными)

### Галерея (Gallery)

- Изображения
- Описания (мультиязычные)

### Посты (Posts)

- Заголовок (мультиязычный)
- Содержание (мультиязычное)
- Дата публикации

## Установка и запуск

1. Установите зависимости:

```bash
npm install
```

2. Запустите проект в режиме разработки:

```bash
npm run dev
```

3. Сборка для продакшена:

```bash
npm run build
```

## Подключение к фронтенду

### 1. Установка клиента Sanity

```bash
npm install @sanity/client
```

### 2. Создание клиента

```typescript
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'z82t1cbr',
  dataset: 'production',
  apiVersion: '2024-03-25', // Используйте текущую дату
  useCdn: true,
})
```

### 3. Примеры запросов

#### Получение анонсов

```typescript
const announcements = await client.fetch(`
  *[_type == "announcement"] {
    title,
    description,
    startDate
  }
`)
```

#### Получение курсов

```typescript
const courses = await client.fetch(`
  *[_type == "course"] {
    title,
    description,
    "type": courseType->title,
    content,
    accordion[] {
      title,
      tags,
      videoUrl
    }
  }
`)
```

#### Получение галереи

```typescript
const gallery = await client.fetch(`
  *[_type == "gallery"] {
    images[] {
      asset->,
      description
    }
  }
`)
```

## Мультиязычность

Все текстовые поля поддерживают два языка:

- `ru` - русский
- `uk` - украинский

Пример структуры мультиязычного поля:

```typescript
{
  ru: "Текст на русском",
  uk: "Текст українською"
}
```

## Развертывание

1. Соберите проект:

```bash
npm run build
```

2. Разверните на вашем хостинге:

```bash
npm run deploy
```

## Контакты

По всем вопросам обращайтесь к администратору проекта.

## Примеры компонентов

### Компонент курса с серверным рендерингом (Next.js 14)

```typescript
// app/[lang]/courses/[slug]/page.tsx
import {createClient} from '@sanity/client'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

const client = createClient({
  projectId: 'z82t1cbr',
  dataset: 'production',
  apiVersion: '2024-03-25',
  useCdn: true,
})

// Генерация метаданных для SEO
export async function generateMetadata({
  params: {slug, lang},
}: {
  params: {slug: string; lang: string}
}): Promise<Metadata> {
  const course = await client.fetch(
    `*[_type == "course" && slug.current == $slug][0] {
      title,
      description,
      "image": mainImage.asset->url
    }`,
    {slug}
  )

  if (!course) return {}

  return {
    title: course.title[lang],
    description: course.description[lang],
    openGraph: {
      title: course.title[lang],
      description: course.description[lang],
      images: course.image ? [course.image] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title[lang],
      description: course.description[lang],
      images: course.image ? [course.image] : [],
    },
  }
}

// Генерация статических путей
export async function generateStaticParams() {
  const courses = await client.fetch(`
    *[_type == "course"] {
      "slug": slug.current
    }
  `)

  const languages = ['ru', 'uk']
  return courses.flatMap((course: {slug: string}) =>
    languages.map((lang) => ({
      slug: course.slug,
      lang,
    }))
  )
}

export default async function CoursePage({
  params: {slug, lang},
}: {
  params: {slug: string; lang: string}
}) {
  const course = await client.fetch(
    `*[_type == "course" && slug.current == $slug][0] {
      title,
      description,
      "type": courseType->title,
      content,
      accordion[] {
        title,
        tags,
        videoUrl
      }
    }`,
    {slug}
  )

  if (!course) notFound()

  return (
    <div>
      <h1>{course.title[lang]}</h1>
      <p>{course.description[lang]}</p>
      <div>
        {course.accordion.map((item: any) => (
          <div key={item._key}>
            <h3>{item.title[lang]}</h3>
            <div>
              {item.tags.map((tag: any) => (
                <span key={tag._key}>{tag[lang]}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Компонент анонсов с клиентским рендерингом

```typescript
// components/Announcements.tsx
'use client'

import {useEffect, useState} from 'react'
import {createClient} from '@sanity/client'
import {useParams} from 'next/navigation'

const client = createClient({
  projectId: 'z82t1cbr',
  dataset: 'production',
  apiVersion: '2024-03-25',
  useCdn: true,
})

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const lang = params.lang as string

  useEffect(() => {
    async function fetchAnnouncements() {
      const data = await client.fetch(`
        *[_type == "announcement"] | order(startDate desc) {
          title,
          description,
          startDate
        }
      `)
      setAnnouncements(data)
      setLoading(false)
    }

    fetchAnnouncements()
  }, [])

  if (loading) return <div>Загрузка...</div>

  return (
    <div>
      {announcements.map((announcement: any) => (
        <div key={announcement._id}>
          <h3>{announcement.title[lang]}</h3>
          <p>{announcement.description[lang]}</p>
          <time>{new Date(announcement.startDate).toLocaleDateString()}</time>
        </div>
      ))}
    </div>
  )
}
```

## SEO и серверный рендеринг

### 1. Метаданные

```typescript
// app/[lang]/courses/[slug]/page.tsx
import {Metadata} from 'next'

export async function generateMetadata({
  params: {slug, lang},
}: {
  params: {slug: string; lang: string}
}): Promise<Metadata> {
  const course = await client.fetch(
    `*[_type == "course" && slug.current == $slug][0] {
      title,
      description,
      "image": mainImage.asset->url
    }`,
    {slug},
  )

  if (!course) return {}

  return {
    title: course.title[lang],
    description: course.description[lang],
    openGraph: {
      title: course.title[lang],
      description: course.description[lang],
      images: course.image ? [course.image] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title[lang],
      description: course.description[lang],
      images: course.image ? [course.image] : [],
    },
  }
}
```

### 2. Статическая генерация

```typescript
// app/[lang]/courses/[slug]/page.tsx
export async function generateStaticParams() {
  const courses = await client.fetch(`
    *[_type == "course"] {
      "slug": slug.current
    }
  `)

  const languages = ['ru', 'uk']
  return courses.flatMap((course: {slug: string}) =>
    languages.map((lang) => ({
      slug: course.slug,
      lang,
    })),
  )
}
```

### 3. Ревалидация данных

```typescript
// app/[lang]/courses/[slug]/page.tsx
export const revalidate = 3600 // Ревалидация каждый час

export default async function CoursePage({
  params: {slug, lang},
}: {
  params: {slug: string; lang: string}
}) {
  const course = await client.fetch(
    `*[_type == "course" && slug.current == $slug][0]`,
    {slug},
    {next: {revalidate: 3600}},
  )

  if (!course) notFound()

  // ... рендеринг компонента
}
```

### 4. Структурированные данные

```typescript
// app/[lang]/courses/[slug]/page.tsx
export default async function CoursePage({
  params: {slug, lang},
}: {
  params: {slug: string; lang: string}
}) {
  const course = await client.fetch(
    `*[_type == "course" && slug.current == $slug][0]`,
    {slug}
  )

  if (!course) notFound()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title[lang],
    description: course.description[lang],
    provider: {
      '@type': 'Organization',
      name: 'Sitnikov',
      sameAs: 'https://sitnikov.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />
      {/* Остальной контент */}
    </>
  )
}
```

### 5. Middleware для языков

```typescript
// middleware.ts
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

const locales = ['ru', 'uk']
const defaultLocale = 'ru'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = defaultLocale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```
