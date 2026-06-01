import type { Metadata } from 'next'
import { Globe2, MessageSquareText, Play, Sparkles, UsersRound } from 'lucide-react'

import { PageStructuredData } from '@/components/seo/PageStructuredData'
import { CareersJobList } from '@/components/sections/careers/CareersJobList'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { getCareers, getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'
import type { CareerItem, PageContent } from '@/types/content'

export const revalidate = 60

const fallbackCareersPage: PageContent = {
  title: 'Careers',
  slug: 'careers',
  seo: {
    metaTitle: 'Careers at INFE Talent',
    metaDescription:
      'Explore open recruitment roles at INFE Talent and join a global offshore recruitment delivery team.',
  },
}

const benefits = [
  {
    icon: Globe2,
    title: 'Global Footprint',
    description: 'Part of a worldwide staffing leader serving the USA, UK & APAC.',
  },
  {
    icon: MessageSquareText,
    title: 'High-Impact Work',
    description: 'Partner with 250+ clients and contribute to large-scale global projects.',
  },
  {
    icon: Sparkles,
    title: 'Thriving Culture',
    description: 'Inclusive, innovative, collaborative, and focused on continuous learning.',
  },
  {
    icon: UsersRound,
    title: 'Employee-First Approach',
    description: 'Get empowered, supported, and trusted from day one.',
  },
]

const careerStats = [
  { value: '250+', label: 'Clients Globally' },
  { value: '20+', label: 'Years Of Experience' },
  { value: '3000+', label: 'Professionals' },
  { value: '97%', label: 'NPS Score' },
]

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getPageBySlug('careers')) || fallbackCareersPage

  return buildMetadata(page, '/careers')
}

export default async function CareersPage() {
  const [page, careers] = await Promise.all([getPageBySlug('careers'), getCareers(50)])
  const structuredDataPage = page || fallbackCareersPage

  return (
    <>
      <CareersHeroSection />
      <LatestJobsSection careers={careers} />
      <WhyWorkWithUsSection />
      <LeaderStorySection />
      <CareersStatsStrip />
      <PageStructuredData page={structuredDataPage} path="/careers" />
    </>
  )
}

function CareersHeroSection() {
  return (
    <section className="border-b border-[#CCCCCC] bg-[#FFF8EE] text-[#151515]">
      <Container className="grid max-w-[1500px] gap-[56px] px-[24px] pb-[72px] pt-[70px] md:pt-[86px] lg:min-h-[628px] lg:grid-cols-[599px_692px] lg:items-start lg:gap-[209px] lg:px-[0px] lg:pb-[72px] lg:pt-[91px]">
        <div className="flex min-h-[404px] flex-col justify-between">
          <div>
            <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[4.8px] text-[#2C368D]">HOME / CAREERS</p>
            <h1 className="heading-section mt-[19px] max-w-[545px] text-[42px] font-[800] leading-[54px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
              If It&apos;s About{' '}
              <span className="bg-[#FCE88B] px-[3px]">PEOPLE,</span>
              <br />
              We Make It{' '}
              <span className="bg-[#FCE88B] px-[3px]">POSSIBLE!</span>
            </h1>
          </div>
          <p className="mt-[56px] max-w-[423px] text-[16px] font-[400] leading-[24px] tracking-[0px] text-[#555555] lg:mt-[0px]">
            Join our global team with 20+ years of delivering offshore recruitment excellence. Elevate your career while transforming how businesses hire.
          </p>
        </div>

        <HeroCollage />
      </Container>
    </section>
  )
}

function HeroCollage() {
  return (
    <div className="grid gap-[20px] sm:grid-cols-[1fr_1fr] lg:h-[406px] lg:grid-cols-[204px_204px_236px] lg:grid-rows-[126px_126px_126px] lg:gap-[14px]">
      <ImagePanel className="h-[250px] sm:h-[300px] lg:col-start-1 lg:row-span-2 lg:h-full" src={figmaAssets.heroInterview} alt="INFE Talent team discussion" />

      <div className="flex min-h-[126px] flex-col justify-center bg-[#242E8F] px-[26px] text-[#FFFFFF] sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-1">
        <div className="flex items-start gap-[19px]">
          <div>
            <p className="text-[42px] font-[800] leading-[50px] tracking-[0px]">3000+</p>
            <p className="mt-[2px] text-[13px] font-[700] leading-[18px] tracking-[0px]">Professionals Joined</p>
          </div>
          <div className="mt-[4px] hidden -space-x-[9px] md:flex">
            {[figmaAssets.avatarOne, figmaAssets.profileCard, figmaAssets.aboutOfficeSide, figmaAssets.heroInterview].map((image, index) => (
              <span key={`${image}-${index}`} className="relative block size-[38px] overflow-hidden rounded-full border-[3px] border-[#FFFFFF]">
                <OptimizedImage src={image} altFallback="INFE professional" sizes="38px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <ImagePanel className="h-[250px] sm:h-[300px] lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:h-full" src={figmaAssets.aboutOfficeSide} alt="INFE Talent advisor" />
      <ImagePanel className="h-[250px] sm:h-[300px] lg:col-start-3 lg:row-span-2 lg:row-start-2 lg:h-full" src={figmaAssets.teamOffice} alt="INFE Talent global team" />

      <div className="flex min-h-[126px] flex-col justify-center bg-[#FCA62B] px-[26px] text-[#000000] lg:col-start-1 lg:row-start-3">
        <p className="text-[42px] font-[800] leading-[50px] tracking-[0px]">20+</p>
        <p className="mt-[3px] text-[13px] font-[800] leading-[18px] tracking-[0px]">Years of Experience</p>
      </div>
    </div>
  )
}

function LatestJobsSection({ careers }: { careers: CareerItem[] }) {
  return (
    <section className="bg-[#FFF8EE] py-[84px] text-[#151515] lg:pb-[92px] lg:pt-[96px]">
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
        <div className="mb-[46px]">
          <h2 className="heading-section text-[38px] font-[800] leading-[48px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
            Explore Latest Jobs At INFE
          </h2>
          <p className="mt-[9px] max-w-[640px] text-[15px] font-[400] leading-[23px] tracking-[0px] text-[#555555]">
            Join a role that pushes boundaries and develops with you at every stage.
          </p>
        </div>

        <CareersJobList careers={careers} />
      </Container>
    </section>
  )
}

function WhyWorkWithUsSection() {
  return (
    <section className="bg-[linear-gradient(108deg,#050948_0%,#121967_58%,#243C91_100%)] py-[84px] text-[#FFFFFF] lg:py-[88px]">
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
        <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[4.8px] text-[#FCA62B]">WHY INFE</p>
        <h2 className="heading-section relative mt-[14px] inline-block text-[38px] font-[800] leading-[48px] tracking-[0px] md:text-[50px] md:leading-[66px]">
          <span className="relative z-[1]">Why Work With Us</span>
          <span className="absolute bottom-[6px] left-[181px] h-[12px] w-[174px] bg-[#A08E3E]" aria-hidden="true" />
        </h2>

        <div className="mt-[34px] grid border-l border-t border-[#FFFFFF]/35 lg:grid-cols-[500px_500px_500px] lg:grid-rows-[191px_191px]">
          <BenefitCell benefit={benefits[0]} />
          <div className="relative hidden border-b border-r border-[#FFFFFF]/35 lg:row-span-2 lg:flex lg:items-center lg:justify-center">
            <span className="select-none text-[170px] font-[800] leading-[170px] text-[#FFFFFF]/10" aria-hidden="true">
              &infin;
            </span>
          </div>
          <BenefitCell benefit={benefits[1]} />
          <BenefitCell benefit={benefits[2]} />
          <BenefitCell benefit={benefits[3]} />
        </div>
      </Container>
    </section>
  )
}

function BenefitCell({ benefit }: { benefit: (typeof benefits)[number] }) {
  const Icon = benefit.icon

  return (
    <article className="min-h-[191px] border-b border-r border-[#FFFFFF]/35 px-[32px] py-[30px] transition duration-300 hover:bg-[#FFFFFF]/5 lg:px-[36px] lg:py-[34px]">
      <Icon size={54} strokeWidth={1.7} className="text-[#FFFFFF]" aria-hidden="true" />
      <h3 className="mt-[24px] text-[18px] font-[800] leading-[24px] tracking-[0px] text-[#FFFFFF]">{benefit.title}</h3>
      <p className="mt-[8px] max-w-[322px] text-[14px] font-[400] leading-[21px] tracking-[0px] text-[#FFFFFF]/78">
        {benefit.description}
      </p>
    </article>
  )
}

function LeaderStorySection() {
  return (
    <section className="bg-[#FFF8EE] py-[84px] text-[#151515] lg:py-[91px]">
      <Container className="grid max-w-[1500px] items-center gap-[56px] px-[24px] lg:grid-cols-[610px_676px] lg:gap-[214px] lg:px-[0px]">
        <div>
          <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[4.8px] text-[#2C368D]">#INFETALENT</p>
          <h2 className="heading-section mt-[20px] max-w-[610px] text-[38px] font-[800] leading-[48px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
            Every INFE Leader Carries A Story Shaped By These{' '}
            <span className="bg-[#FCE88B] px-[3px]">Principles - And Now,</span>{' '}
            We&apos;re Bringing Those Stories To{' '}
            <span className="bg-[#FCE88B] px-[3px]">You.</span>
          </h2>
        </div>

        <div className="relative h-[260px] overflow-hidden bg-[#151515] md:h-[344px]">
          <OptimizedImage src={figmaAssets.aboutOfficeSide} altFallback="INFE Talent leadership story video" sizes="(min-width: 1024px) 676px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#000000]/38" aria-hidden="true" />
          <button
            type="button"
            aria-label="Play INFE Talent leadership story video"
            className="absolute left-1/2 top-1/2 flex size-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFFFFF]/35 text-[#FFFFFF] backdrop-blur-[2px] transition duration-300 hover:bg-[#FFFFFF]/45"
          >
            <Play size={34} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  )
}

function CareersStatsStrip() {
  return (
    <section className="bg-[#2C368D] text-[#FFFFFF]">
      <Container className="grid max-w-[1500px] grid-cols-2 gap-y-[20px] px-[24px] py-[24px] md:grid-cols-4 lg:h-[146px] lg:items-center lg:px-[0px] lg:py-[0px]">
        {careerStats.map((item) => (
          <div key={item.value} className="flex min-w-0 items-center gap-[10px] lg:gap-[14px]">
            <strong className="shrink-0 text-[34px] font-[800] leading-[41px] tracking-[0px] md:text-[42px] md:leading-[50px] lg:text-[50px] lg:leading-[60px]">{item.value}</strong>
            <span className="min-w-0 text-[14px] font-[700] leading-[19px] tracking-[0px] md:text-[18px] md:leading-[24px] lg:text-[25px] lg:leading-[30px]">{item.label}</span>
          </div>
        ))}
      </Container>
    </section>
  )
}

function ImagePanel({ alt, className, src }: { alt: string; className?: string; src: string }) {
  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <OptimizedImage src={src} altFallback={alt} sizes="(min-width: 1024px) 236px, 100vw" className="object-cover" />
    </div>
  )
}
