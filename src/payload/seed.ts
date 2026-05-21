/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from './getPayload'
import { figmaAssets } from '@/lib/assets'
import {
  blogs,
  careers,
  faqs,
  homePageFallback,
  primaryNavigation,
  services,
  teamMembers,
  testimonials,
} from '@/lib/default-content'
import { richTextFromPlain } from '@/lib/richText'
import { formatSlug } from '@/lib/slug'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '..', '..')

type CollectionSlug =
  | 'blogs'
  | 'careers'
  | 'faqs'
  | 'media'
  | 'pages'
  | 'services'
  | 'testimonials'
  | 'team-members'

const mimeTypes: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
}

const localFilePath = (publicPath: string) => path.join(rootDir, 'public', publicPath.replace(/^\//, ''))

const metaTitle = (title: string) => title.slice(0, 70)
const metaDescription = (description: string) => description.slice(0, 170)

async function ensureMedia(alt: string, publicPath: string) {
  const payload = (await getPayload()) as any
  const filePath = localFilePath(publicPath)
  const filename = `${formatSlug(alt)}-${path.basename(filePath)}`
  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    where: {
      or: [
        {
          alt: {
            equals: alt,
          },
        },
        {
          filename: {
            equals: filename,
          },
        },
      ],
    },
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  const data = await fs.readFile(filePath)
  const extension = path.extname(filePath).toLowerCase()

  return payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: mimeTypes[extension] || 'application/octet-stream',
      name: filename,
      size: data.byteLength,
    },
  })
}

async function upsert(collection: CollectionSlug, slug: string, data: Record<string, unknown>) {
  const payload = (await getPayload()) as any
  const existing = await payload.find({
    collection,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection,
    data,
    overrideAccess: true,
  } as any)
}

async function upsertByField(
  collection: CollectionSlug,
  field: string,
  value: string,
  data: Record<string, unknown>,
) {
  const payload = (await getPayload()) as any
  const existing = await payload.find({
    collection,
    limit: 1,
    where: {
      [field]: {
        equals: value,
      },
    },
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection,
    data,
    overrideAccess: true,
  } as any)
}

async function run() {
  const payload = (await getPayload()) as any

  const media = {
    hero: await ensureMedia('Hero interview', figmaAssets.heroInterview),
    aboutTall: await ensureMedia('About office tall', figmaAssets.aboutOfficeTall),
    aboutSide: await ensureMedia('About office side', figmaAssets.aboutOfficeSide),
    insights: await Promise.all(
      figmaAssets.insights.map((asset, index) => ensureMedia(`Insight ${index + 1}`, asset)),
    ),
    partners: await Promise.all(
      figmaAssets.partners.map((asset, index) => ensureMedia(`Partner certification ${index + 1}`, asset)),
    ),
    awards: await Promise.all(figmaAssets.awards.map((asset, index) => ensureMedia(`Award ${index + 1}`, asset))),
  }

  const serviceDocs = await Promise.all(
    services.map((service) =>
      upsert('services', service.slug || service.title, {
        ...service,
        content: richTextFromPlain(service.summary),
        seo: {
          metaTitle: metaTitle(`${service.title} | INFE Talent`),
          metaDescription: metaDescription(service.summary),
          keywords: [{ keyword: service.title }, { keyword: 'offshore recruitment' }],
        },
        _status: 'published',
      }),
    ),
  )

  const testimonialDocs = await Promise.all(
    testimonials.map((testimonial) =>
      upsertByField('testimonials', 'name', testimonial.name, {
          ...testimonial,
          featured: true,
          seo: {
            metaTitle: metaTitle(`${testimonial.name} Testimonial | INFE Talent`),
            metaDescription: metaDescription(testimonial.quote),
          },
          _status: 'published',
        }),
    ),
  )

  await Promise.all(
    faqs.map((faq, index) =>
      upsertByField('faqs', 'question', faq.question, {
        ...faq,
        answer: richTextFromPlain(String(faq.answer || '')),
        order: index + 1,
        seo: {
          metaTitle: metaTitle(`${faq.question} | INFE Talent FAQ`),
          metaDescription: metaDescription(String(faq.answer || '')),
        },
        _status: 'published',
      }),
    ),
  )

  const teamDocs = await Promise.all(
    teamMembers.map((member, index) =>
      upsert('team-members', formatSlug(member.slug || member.name), {
        ...member,
        photo: index === 0 ? media.hero.id : index === 1 ? media.aboutTall.id : media.aboutSide.id,
        bio: richTextFromPlain(String(member.bio || '')),
        order: index + 1,
        seo: {
          metaTitle: metaTitle(`${member.name} | INFE Talent`),
          metaDescription: metaDescription(String(member.bio || member.role)),
        },
        _status: 'published',
      }),
    ),
  )

  const blogDocs = await Promise.all(
    blogs.map((blog, index) =>
      upsert('blogs', blog.slug || blog.title, {
        ...blog,
        featuredImage: media.insights[index]?.id,
        content: richTextFromPlain(blog.excerpt),
        seo: {
          metaTitle: metaTitle(`${blog.title} | INFE Talent`),
          metaDescription: metaDescription(blog.excerpt),
          openGraphImage: media.insights[index]?.id,
        },
        _status: 'published',
      }),
    ),
  )

  await Promise.all(
    careers.map((career) =>
      upsert('careers', career.slug || career.title, {
        ...career,
        jobDetails: career.jobDetails?.map((detail) => ({
          heading: detail.heading,
          content: richTextFromPlain(String(detail.content)),
        })),
        seo: {
          metaTitle: metaTitle(`${career.title} | INFE Talent Careers`),
          metaDescription: metaDescription(career.summary),
        },
        _status: 'published',
      }),
    ),
  )

  const homeLayout = homePageFallback.layout?.map((block) => {
    if (block.blockType === 'hero') {
      return { ...block, media: media.hero.id }
    }

    if (block.blockType === 'contentImage') {
      return {
        ...block,
        body: richTextFromPlain(block.bodyText?.join('\n') || ''),
        media: media.aboutTall.id,
        mediaSecondary: media.aboutSide.id,
      }
    }

    if (block.blockType === 'servicesGrid') {
      return { ...block, services: serviceDocs.map((service) => service.id) }
    }

    if (block.blockType === 'awards') {
      return {
        ...block,
        items: block.items?.map((item, index) => ({ ...item, image: media.awards[index]?.id })),
      }
    }

    if (block.blockType === 'testimonials') {
      return { ...block, items: testimonialDocs.map((testimonial) => testimonial.id) }
    }

    if (block.blockType === 'blogListing') {
      return { ...block, posts: blogDocs.map((blog) => blog.id) }
    }

    return block
  })

  await upsert('pages', 'home', {
    title: homePageFallback.title,
    slug: 'home',
    layout: homeLayout,
    seo: {
      ...homePageFallback.seo,
      metaDescription: metaDescription(homePageFallback.seo?.metaDescription || ''),
      openGraphImage: media.hero.id,
    },
    _status: 'published',
  })

  await upsert('pages', 'about', {
    title: 'About',
    slug: 'about',
    layout: [
      {
        blockType: 'hero',
        variant: 'centered',
        eyebrow: 'About INFE Talent',
        heading: 'If It Is About People, We Make It Possible.',
        description:
          'INFE Talent helps staffing firms build dependable offshore recruitment delivery across sourcing, screening, submissions, coordination, and onboarding.',
        primaryAction: { label: 'Talk To Us', url: '/contact' },
        secondaryAction: { label: 'Explore Services', url: '/services' },
        media: media.hero.id,
      },
      {
        blockType: 'contentImage',
        layout: 'overlap',
        eyebrow: 'Our Story',
        heading: 'A Recruitment Operations Partner Built For Scale.',
        body: richTextFromPlain(
          'We combine recruiting process discipline with flexible offshore delivery teams, helping partners increase coverage without losing quality.\nOur teams work as an extension of your recruitment operation, with clear reporting, repeatable workflows, and an emphasis on candidate experience.',
        ),
        media: media.aboutTall.id,
        mediaSecondary: media.aboutSide.id,
        action: { label: 'Contact Us', url: '/contact' },
      },
      {
        blockType: 'team',
        eyebrow: 'Our Team',
        heading: 'Experienced Operators Behind Every Delivery Model.',
        description: 'Meet the specialist teams that keep sourcing, coordination, and client communication moving.',
        members: teamDocs.map((member) => member.id),
      },
    ],
    seo: {
      metaTitle: 'About INFE Talent | Offshore Recruitment Partner',
      metaDescription: 'Learn how INFE Talent supports staffing firms with offshore recruitment delivery teams built for quality, coverage, and scale.',
      openGraphImage: media.aboutTall.id,
    },
    _status: 'published',
  })

  await upsert('pages', 'services', {
    title: 'Services',
    slug: 'services',
    layout: [
      {
        blockType: 'hero',
        variant: 'centered',
        eyebrow: 'Services',
        heading: 'A Complete Offshore Recruitment Ecosystem.',
        description: 'Select the recruiting workflows you need to strengthen, then scale them with a dedicated offshore delivery model.',
        primaryAction: { label: 'Get Started', url: '/contact' },
      },
      {
        blockType: 'servicesGrid',
        selectionMode: 'manual',
        heading: 'Recruitment Support Services Built For Staffing Teams.',
        description: 'From sourcing to onboarding, every service is designed to improve speed, accuracy, and continuity.',
        services: serviceDocs.map((service) => service.id),
        action: { label: 'Talk To Us', url: '/contact' },
      },
    ],
    seo: {
      metaTitle: 'Offshore Recruitment Services | INFE Talent',
      metaDescription: 'Explore INFE Talent services for recruitment management, sourcing, market mapping, compliance, onboarding, and administrative support.',
      openGraphImage: media.hero.id,
    },
    _status: 'published',
  })

  await upsert('pages', 'blogs', {
    title: 'Blogs',
    slug: 'blogs',
    layout: [
      {
        blockType: 'hero',
        variant: 'centered',
        eyebrow: 'Blogs',
        heading: 'Recruitment Insights For Scalable Delivery Teams.',
        description: 'Read practical thinking on offshore recruitment operations, sourcing strategy, staffing delivery, and hiring market shifts.',
      },
      {
        blockType: 'blogListing',
        selectionMode: 'manual',
        heading: 'Latest Blogs',
        description: 'Ideas and operating guidance for staffing leaders building resilient recruitment pipelines.',
        posts: blogDocs.map((blog) => blog.id),
        limit: 9,
      },
    ],
    seo: {
      metaTitle: 'Recruitment Blogs | INFE Talent',
      metaDescription: 'Read INFE Talent blogs covering offshore recruitment, staffing support, sourcing strategy, and global delivery operations.',
      openGraphImage: media.insights[0]?.id,
    },
    _status: 'published',
  })

  await upsert('pages', 'careers', {
    title: 'Careers',
    slug: 'careers',
    layout: [
      {
        blockType: 'hero',
        variant: 'centered',
        eyebrow: 'Careers',
        heading: 'Build Your Career With A Global Recruitment Delivery Team.',
        description: 'Join a team that values ownership, communication, and the craft of connecting people to opportunity.',
      },
      {
        blockType: 'career',
        selectionMode: 'latest',
        heading: 'Open Roles',
        description: 'Explore current opportunities with INFE Talent.',
        showFilters: true,
      },
    ],
    seo: {
      metaTitle: 'Careers at INFE Talent',
      metaDescription: 'Explore open recruitment and operations roles at INFE Talent.',
      openGraphImage: media.hero.id,
    },
    _status: 'published',
  })

  await upsert('pages', 'contact', {
    title: 'Contact',
    slug: 'contact',
    layout: [
      {
        blockType: 'contact',
        eyebrow: 'Contact',
        heading: 'Let Us Design Your Offshore Recruitment Engine.',
        description: 'Tell us about your hiring goals. We will come back with a tailored model and a clear path to scale.',
        formHeading: 'Get in Touch Today!',
        contactMethods: [
          { label: 'UK', value: '+44 203 878 3559', url: 'tel:+442038783559' },
          { label: 'US', value: '+1 614 266 3317', url: 'tel:+16142663317' },
          { label: 'AUS', value: '+61 740 620 017', url: 'tel:+61740620017' },
          { label: 'Email', value: 'info@infetalent.com', url: 'mailto:info@infetalent.com' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Contact INFE Talent',
      metaDescription: 'Contact INFE Talent to discuss offshore recruitment support, sourcing teams, and scalable staffing delivery models.',
      openGraphImage: media.hero.id,
    },
    _status: 'published',
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      primaryNavigation,
      footerNavigation: primaryNavigation,
      footerPartners: media.partners.map((partner, index) => ({
        image: partner.id,
        label: `Partner certification ${index + 1}`,
      })),
      copyright: '© 2026 INFE Talent. All rights reserved.',
      contact: {
        officeAddress: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
        ukPhone: '+44 203 878 3559',
        usPhone: '+1 614 266 3317',
        ausPhone: '+61 740 620 017',
        email: 'info@infetalent.com',
      },
    },
    overrideAccess: true,
  })
}

run()
  .then(() => {
    console.log('Seed complete')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
