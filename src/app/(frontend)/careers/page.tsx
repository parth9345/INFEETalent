import type { Metadata } from 'next'

import { PageStructuredData } from '@/components/seo/PageStructuredData'
import { AboutAdvantageSection } from '@/components/sections/about/AboutAdvantageSection'
import { CareerStoryVideo } from '@/components/sections/careers/CareerStoryVideo'
import { CareersJobList } from '@/components/sections/careers/CareersJobList'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { getCareers, getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'
import type { CareerItem, MediaLike, PageBlock, PageContent } from '@/types/content'

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

const careersAdvantageBlock: Extract<PageBlock, { blockType: 'advantage' }> = {
  id: 'careers-advantage-static',
  blockType: 'advantage',
  heading: 'Why Work With Us',
  highlight: 'Work With Us',
  description:
    'Build your career inside a global recruitment team that values ownership, collaboration, and continuous learning.',
  items: [
    {
      icon: 'Headset',
      title: 'Global Footprint',
      description: 'Part of a worldwide staffing leader serving the USA, UK & APAC.',
    },
    {
      icon: 'Briefcase',
      title: 'High-Impact Work',
      description: 'Partner with 250+ clients and contribute to large-scale global projects.',
    },
    {
      icon: 'Users',
      title: 'Thriving Culture',
      description: 'Inclusive, innovative, collaborative, and focused on continuous learning.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Employee-First Approach',
      description: 'Get empowered, supported, and trusted from day one.',
    },
  ],
}

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
  const heroBlock = getCareersHeroBlock(page)

  return (
    <div className="page-careers">
      <CareersHeroSection block={heroBlock} />
      <LatestJobsSection careers={careers} />
      <WhyWorkWithUsSection />
      <LeaderStorySection />
      <CareersStatsStrip />
      <PageStructuredData page={structuredDataPage} path="/careers" />
    </div>
  )
}

function getCareersHeroBlock(page?: PageContent | null) {
  return page?.layout?.find((block): block is Extract<PageBlock, { blockType: 'hero' }> => block.blockType === 'hero')
}

function CareersHeroSection({ block }: { block?: Extract<PageBlock, { blockType: 'hero' }> }) {
  return (
    <section className="border-b border-[#CCCCCC] bg-[#FFF8EE] text-[#151515] careers-hero-section anim-full-section anim-fade-down">
      <Container className="careers-hero-layout grid max-w-[1500px] gap-[56px] px-[24px] pb-[72px] pt-[70px] md:pt-[86px] lg:min-h-[628px] lg:grid-cols-[599px_692px] lg:items-start lg:gap-[209px] lg:px-[0px] lg:pb-[72px] lg:pt-[91px]">
        <div className="careers-hero-copy flex min-h-[404px] flex-col justify-between">
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

        <HeroCollage block={block} />
      </Container>
    </section>
  )
}

function HeroCollage({ block }: { block?: Extract<PageBlock, { blockType: 'hero' }> }) {
  const imageOne = block?.careerCollage?.imageOne || block?.media
  const imageTwo = block?.careerCollage?.imageTwo || block?.featureCard?.image
  const imageThree = block?.careerCollage?.imageThree

  return (
    <div className="careers-hero-collage grid gap-[20px] sm:grid-cols-[1fr_1fr] lg:h-[406px] lg:grid-cols-[204px_204px_236px] lg:grid-rows-[126px_126px_126px] lg:gap-[14px] 2xl:h-[563px] 2xl:grid-cols-[236px_203px_203px] 2xl:grid-rows-[157px_195px_163px] 2xl:gap-[24px]">
      <ImagePanel className="h-[250px] sm:h-[300px] lg:col-start-1 lg:row-span-2 lg:h-full" media={imageOne} fallbackSrc={figmaAssets.heroInterview} alt="INFE Talent team discussion" />

      <div className="careers-hero-stat-card relative flex min-h-[126px] flex-col justify-center bg-[#242E8F] px-[26px] text-[#FFFFFF] sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-1 2xl:min-h-[157px] 2xl:px-[30px]">
        <div className="flex items-start gap-[19px] 2xl:block">
          <div>
            <p className="text-[42px] font-[800] leading-[50px] tracking-[0px] 2xl:text-[51px] 2xl:leading-[56px]">3000+</p>
            <p className="mt-[2px] whitespace-nowrap text-[13px] font-[700] leading-[18px] tracking-[0px] 2xl:mt-[4px] 2xl:text-[19px] 2xl:leading-[23px]">Professionals Joined</p>
          </div>
          <div className="mt-[4px] hidden -space-x-[9px] md:flex 2xl:absolute 2xl:right-[22px] 2xl:top-[30px] 2xl:mt-0 2xl:-space-x-[13px]">
            {[figmaAssets.avatarOne, figmaAssets.avatarTwo, figmaAssets.avatarThree, figmaAssets.avatarFour].map((image, index) => (
              <span key={`${image}-${index}`} className="relative block size-[38px] overflow-hidden rounded-full 2xl:size-[54px]">
                <OptimizedImage src={image} altFallback="INFE professional" sizes="(min-width: 1536px) 54px, 38px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <ImagePanel className="h-[250px] sm:h-[300px] lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:h-full" media={imageTwo} fallbackSrc={figmaAssets.aboutOfficeSide} alt="INFE Talent advisor" />
      <ImagePanel className="h-[250px] sm:h-[300px] lg:col-start-3 lg:row-span-2 lg:row-start-2 lg:h-full" media={imageThree} fallbackSrc={figmaAssets.teamOffice} alt="INFE Talent global team" />

      <div className="careers-hero-stat-card flex min-h-[126px] flex-col justify-center bg-[#FCA62B] px-[26px] text-[#000000] lg:col-start-1 lg:row-start-3">
        <p className="text-[42px] font-[800] leading-[50px] tracking-[0px]">20+</p>
        <p className="mt-[3px] text-[13px] font-[800] leading-[18px] tracking-[0px]">Years of Experience</p>
      </div>
    </div>
  )
}

function LatestJobsSection({ careers }: { careers: CareerItem[] }) {
  return (
    <section className="bg-[#FFF8EE] py-[84px] text-[#151515] lg:pb-[92px] lg:pt-[96px] careers-jobs-section careers-cta-section anim-full-section anim-fade-up">
      <Container className="careers-jobs-container max-w-[1500px] px-[24px] lg:px-[0px]">
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
  return <AboutAdvantageSection block={careersAdvantageBlock} className="careers-benefits-section anim-full-section anim-fade-up" />
}

function LeaderStorySection() {
  return (
    <section className="bg-[#FFF8EE] py-[84px] text-[#151515] lg:py-[91px] careers-intro-section">
      <Container className="careers-intro-layout grid max-w-[1500px] items-center gap-[56px] px-[24px] lg:grid-cols-[610px_676px] lg:gap-[214px] lg:px-[0px]">
        <div className="careers-intro-copy anim-left-part anim-fade-left">
          <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[4.8px] text-[#2C368D]">#INFETALENT</p>
          <h2 className="heading-section mt-[20px] max-w-[610px] text-[38px] font-[800] leading-[48px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
            Every INFE Leader Carries A Story Shaped By These{' '}
            <span className="bg-[#FCE88B] px-[3px]">Principles - And Now,</span>{' '}
            We&apos;re Bringing Those Stories To{' '}
            <span className="bg-[#FCE88B] px-[3px]">You.</span>
          </h2>
        </div>

        <CareerStoryVideo
          thumbnailSrc={figmaAssets.aboutOfficeSide}
          fallbackSrc={figmaAssets.aboutOfficeSide}
          alt="INFE Talent leadership story video"
          className="careers-intro-video h-[260px] md:h-[344px] anim-right-part anim-fade-right"
        />
      </Container>
    </section>
  )
}

function CareersStatsStrip() {
  return (
    <section className="bg-[#2C368D] text-[#FFFFFF] careers-process-section anim-full-section anim-fade-up">
      <div className="careers-process-stats grid grid-cols-2 gap-y-[20px] px-[24px] py-[24px] md:grid-cols-4 lg:h-[146px] lg:items-center lg:px-[0px] lg:py-[0px]">
        {careerStats.map((item) => (
          <div key={item.value} className="flex justify-center min-w-0 items-center gap-[10px] lg:gap-[14px]">
            <strong className="shrink-0 text-[34px] font-[800] leading-[41px] tracking-[0px] md:text-[42px] md:leading-[50px] lg:text-[50px] lg:leading-[60px]">{item.value}</strong>
            <span className="min-w-0 text-[14px] font-[700] leading-[19px] tracking-[0px] md:text-[18px] md:leading-[24px] lg:text-[25px] lg:leading-[30px]">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ImagePanel({ alt, className, fallbackSrc, media }: { alt: string; className?: string; fallbackSrc: string; media?: MediaLike }) {
  return (
    <div className={`careers-hero-image-panel relative overflow-hidden ${className || ''}`}>
      <OptimizedImage media={media} fallbackSrc={fallbackSrc} altFallback={alt} sizes="(min-width: 1024px) 236px, 100vw" className="object-cover" />
    </div>
  )
}
