import { BriefcaseBusiness, MapPin } from 'lucide-react'

import { CareerForm } from '@/components/forms/CareerForm'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { lexicalText } from '@/lib/richText'
import type { CareerItem } from '@/types/content'

export function CareerDetail({ career }: { career: CareerItem }) {
  const titleParts = splitCareerTitle(career.title)
  const detailSections = buildDetailSections(career)

  return (
    <>
      <section className="border-b border-[#CCCCCC] bg-[#FFF8EE] text-[#151515] career-detail-hero-section career-detail-cta-section anim-full-section anim-fade-down">
        <Container className="career-detail-hero-layout flex max-w-[1500px] flex-col gap-[40px] px-[24px] py-[64px] lg:h-[372px] lg:flex-row lg:items-start lg:justify-between lg:px-[0px] lg:pb-[0px] lg:pt-[72px]">
          <div className="career-detail-hero-copy">
            <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[4.8px] text-[#555555]">
              HOME / CAREERS / {truncateBreadcrumb(career.title)}
            </p>
            <h1 className="heading-section mt-[17px] max-w-[980px] text-[42px] font-[800] leading-[54px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
              <span className="bg-[#FCE88B] px-[3px]">{titleParts.highlight}</span>
              {titleParts.suffix ? <span> - {titleParts.suffix}</span> : null}
            </h1>
            <div className="career-detail-meta mt-[29px] flex flex-wrap gap-x-[34px] gap-y-[12px] text-[16px] font-[400] leading-[24px] tracking-[0px] text-[#555555]">
              <span className="inline-flex items-center gap-[14px]">
                <MapPin size={18} strokeWidth={2} className="text-[#151515]" aria-hidden="true" /> {career.location}
              </span>
              {career.experience ? (
                <span className="inline-flex items-center gap-[14px]">
                  <BriefcaseBusiness size={18} strokeWidth={2} className="text-[#151515]" aria-hidden="true" /> {career.experience}
                </span>
              ) : null}
            </div>
          </div>
          <Button href="#apply" className="primary-cst-btn career-detail-apply-button h-[50px] w-[135px] border-[0px] bg-[#FCA62B] px-[0px] text-[12px] font-[800] leading-[16px] tracking-[0.48px] text-[#262164] hover:bg-[#FCA62B]/88 lg:mt-[89px]">
            Apply Now
          </Button>
        </Container>
      </section>

      <section className="bg-[#FFF8EE] py-[84px] text-[#151515] lg:py-[120px] career-detail-content-section career-detail-requirements-section career-detail-process-section career-detail-related-section anim-full-section anim-fade-up">
        <Container className="career-detail-content-layout grid max-w-[1500px] gap-[56px] px-[24px] lg:grid-cols-[858px_577px] lg:gap-[65px] lg:px-[0px]">
          <div className="career-detail-panels border-l border-t border-[#CCCCCC] anim-left-part anim-fade-left">
            <DetailPanel title="Job Title" text={career.title} />
            <DetailPanel title="Reports To" text="Team Leader / Assistant Operations Manager" />
            {detailSections.map((detail, index) => (
              <div key={`${detail.heading}-${index}`} className="career-detail-panel border-b border-r border-[#CCCCCC] px-[30px] py-[31px]">
                <h2 className="text-[20px] font-[800] leading-[28px] tracking-[0px] text-[#151515]">{detail.heading}</h2>
                <CareerRichText value={detail.content} fallback={detail.fallback} list={detail.list} />
              </div>
            ))}
          </div>

          <CareerForm careerId={career.id} careerTitle={career.title} className="career-detail-application-section career-application-form anim-right-part anim-fade-right" />
        </Container>
      </section>
    </>
  )
}

function DetailPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="career-detail-panel border-b border-r border-[#CCCCCC] px-[30px] py-[31px]">
      <h2 className="text-[20px] font-[800] leading-[28px] tracking-[0px] text-[#151515]">{title}</h2>
      <p className="mt-[18px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555]">{text}</p>
    </div>
  )
}

type DetailSection = {
  heading: string
  content?: unknown
  fallback?: string[]
  list?: boolean
}

const supplementalSections: DetailSection[] = [
  {
    heading: 'Essential Functions',
    fallback: [
      'Source and screen qualified candidates.',
      'Submit candidates to Account Managers.',
      'Coordinate and track client submissions.',
      'Schedule and follow up on interviews.',
      'Facilitate offer management and acceptance.',
      'Ensure adequate job coverage across open positions.',
      'Track and report on placement performance.',
    ],
    list: true,
  },
  {
    heading: 'Work / Facility Disclaimer',
    fallback: [
      'This job description should not be construed to imply that these requirements are the only duties, responsibilities, and qualifications for this job. Incumbents may be required to follow additional instructions, acquire related job skills, and perform other related work as required. Modifications to this position may be required to perform other related work as assigned.',
    ],
  },
  {
    heading: 'Physical Demands',
    fallback: [
      'An employee must meet the physical demands described here to perform the essential functions of this job successfully. While performing duties, the employee is frequently required to sit, talk, and work on a computer. The employee is occasionally required to stand and walk and move within the office premises for work-related coordination.',
    ],
  },
  {
    heading: 'Other Information',
    fallback: [
      'Job Location: Ahmedabad / Jaipur',
      'Job Timings: As per Geography (UK)',
      'Holidays: UK Holiday Calendar',
      'Work Mode: Working from INFE Office',
    ],
    list: true,
  },
]

function buildDetailSections(career: CareerItem): DetailSection[] {
  const cmsSections = career.jobDetails || []
  const cmsByHeading = new Map(cmsSections.map((section) => [normalizeHeading(section.heading), section]))
  const sections: DetailSection[] = [
    {
      heading: 'Position Mission',
      fallback: [career.summary],
    },
  ]

  const positionMission = cmsByHeading.get('position mission')
  if (positionMission) {
    sections.push(positionMission)
  }

  const responsibilities = cmsByHeading.get('responsibilities')
  if (responsibilities) {
    sections.push({ ...responsibilities, list: true })
  }

  sections.push(supplementalSections[0])

  const qualifications = [...cmsByHeading.entries()].find(([heading]) => heading.includes('qualifications'))
  if (qualifications?.[1]) {
    sections.push({ ...qualifications[1], list: true })
  }

  sections.push(...supplementalSections.slice(1))

  cmsSections.forEach((section) => {
    const normalized = normalizeHeading(section.heading)
    const alreadyRendered = sections.some((item) => normalizeHeading(item.heading) === normalized)
    if (!alreadyRendered) {
      sections.push(section)
    }
  })

  return sections
}

function CareerRichText({ value, fallback = [], list = false }: { value?: unknown; fallback?: string[]; list?: boolean }) {
  const text = lexicalText(value)
  const lines = text.length ? text : fallback
  const items = list ? normalizeListItems(lines) : []

  if (list && items.length) {
    return (
      <ul className="mt-[16px] list-disc space-y-[2px] pl-[18px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  return (
    <div className="mt-[18px] space-y-[12px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555]">
      {lines.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>{paragraph}</p>
      ))}
    </div>
  )
}

function normalizeListItems(lines: string[]) {
  return lines
    .flatMap((line) => line.split(/\n+/))
    .flatMap((line) => line.split(/(?<=\.)\s+(?=[A-Z])/))
    .map((line) => line.replace(/^[\s*-]+/, '').trim())
    .filter(Boolean)
}

function normalizeHeading(heading: string) {
  return heading.trim().toLowerCase()
}

function splitCareerTitle(title: string) {
  const parts = title.split(/\s[-\u2013]\s/)

  return {
    highlight: parts[0] || title,
    suffix: parts.slice(1).join(' - '),
  }
}

function truncateBreadcrumb(title: string) {
  const upperTitle = title.toUpperCase()

  return upperTitle.length > 22 ? `${upperTitle.slice(0, 21)}...` : upperTitle
}
