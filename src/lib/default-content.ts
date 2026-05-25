import { figmaAssets } from './assets'
import type { BlogItem, CareerItem, FAQItem, Link, PageContent, ServiceItem, TeamMemberItem, TestimonialItem } from '@/types/content'

export const primaryNavigation: Link[] = [
  { label: 'About', url: '/about' },
  { label: 'Services', url: '/services' },
  { label: 'Blogs', url: '/blogs' },
  { label: 'Careers', url: '/careers' },
  { label: 'Contact', url: '/contact' },
]

export const services: ServiceItem[] = [
  { title: 'Recruitment Management', slug: 'recruitment-management', summary: 'End-to-end sourcing, screening, shortlisting, submission, interview coordination, and onboarding support.', icon: 'SearchCheck' },
  { title: 'Market Mapping', slug: 'market-mapping', summary: 'Targeted talent intelligence that helps staffing firms understand availability, compensation, and geography.', icon: 'Map' },
  { title: 'Lead Generation', slug: 'lead-generation', summary: 'Structured prospect research and outreach support to keep new client and candidate pipelines moving.', icon: 'Radar' },
  { title: 'Sourcing', slug: 'sourcing', summary: 'Dedicated offshore sourcing teams using role-specific search strategies across major global markets.', icon: 'UsersRound' },
  { title: 'Credentialing & Compliance', slug: 'credentialing-compliance', summary: 'Documentation, verification, and compliance workflows designed for accuracy and audit readiness.', icon: 'ShieldCheck' },
  { title: 'Onboarding Coordination', slug: 'onboarding-coordination', summary: 'Candidate follow-up, joining checks, and handoff coordination that reduce leakage after offer acceptance.', icon: 'Handshake' },
  { title: 'Full Cycle Recruitment', slug: 'full-cycle-recruitment', summary: 'Flexible recruiter pods that can own requisitions from intake through placement with uninterrupted coverage.', icon: 'RefreshCcw' },
  { title: 'Administrative Support', slug: 'administrative-support', summary: 'Back-office recruiting operations support for formatting, reporting, database hygiene, and scheduling.', icon: 'ClipboardList' },
  { title: 'Executive Search & Leadership Hiring', slug: 'executive-search-leadership-hiring', summary: 'Research-led senior talent engagement for leadership, specialist, and confidential hiring mandates.', icon: 'BadgeCheck' },
]

export const testimonials: TestimonialItem[] = [
  { name: 'Healthcare Staffing Business', company: 'USA', quote: 'We partner with INFE Talent on several business-critical workstreams across our marketplace. The team is flexible, adaptable, and consistently positive when priorities shift.' },
  { name: 'Senior Operations Leader', company: 'UK Staffing Firm', quote: 'INFE Talent gives us dependable coverage across sourcing, submissions, and coordination, helping our recruiters focus on client conversations.' },
  { name: 'Talent Delivery Director', company: 'APAC Recruitment Group', quote: 'Their offshore teams operate with the discipline of an embedded delivery center and the responsiveness of a true partner.' },
]

export const faqs: FAQItem[] = [
  {
    question: 'What recruitment functions can INFE Talent support?',
    answer:
      'We support sourcing, screening, submissions, interview coordination, onboarding, credentialing, compliance support, market mapping, and recruitment administration.',
  },
  {
    question: 'Which markets do your offshore teams cover?',
    answer:
      'Our teams regularly support staffing and recruitment partners across the USA, UK, APAC, and Australia with flexible coverage models.',
  },
  {
    question: 'Can we start with a small dedicated team?',
    answer:
      'Yes. We can begin with a focused team or pod, then scale responsibilities, coverage, and reporting as your delivery model matures.',
  },
]

export const teamMembers: TeamMemberItem[] = [
  {
    name: 'Delivery Leadership Team',
    role: 'Recruitment Operations',
    bio: 'Experienced recruiting leaders focused on quality, coverage, reporting, and embedded offshore delivery.',
    photo: figmaAssets.teamOffice,
  },
  {
    name: 'Talent Research Team',
    role: 'Sourcing and Mapping',
    bio: 'Specialists in market mapping, candidate discovery, and structured outreach across global hiring markets.',
    photo: figmaAssets.profileCard,
  },
  {
    name: 'Client Success Team',
    role: 'Partnership Management',
    bio: 'Operators who keep communication clear, priorities aligned, and delivery rhythms predictable.',
    photo: figmaAssets.aboutOfficeSide,
  },
]

export const blogs: BlogItem[] = [
  { title: 'Why soft skills are key to career growth in today market', slug: 'soft-skills-career-growth', excerpt: 'Communication, adaptability, and ownership are now essential differentiators for high-performing recruitment teams.', publishedAt: '2026-05-08T00:00:00.000Z', featuredImage: figmaAssets.insights[0] },
  { title: 'How global delivery teams keep recruitment pipelines moving', slug: 'global-delivery-recruitment-pipelines', excerpt: 'A practical look at how offshore recruiting support improves continuity, coverage, and candidate experience.', publishedAt: '2026-05-08T00:00:00.000Z', featuredImage: figmaAssets.insights[1] },
  { title: 'What staffing leaders should expect from an offshore partner', slug: 'offshore-recruitment-partner-expectations', excerpt: 'The operating rhythms, reporting, and controls that separate scalable support from transactional outsourcing.', publishedAt: '2026-05-08T00:00:00.000Z', featuredImage: figmaAssets.insights[2] },
]

export const careers: CareerItem[] = [
  {
    title: 'Associate Recruiter - NHC',
    slug: 'associate-recruiter-nhc',
    department: 'Recruitment Delivery',
    location: 'Ahmedabad, Gujarat, India',
    employmentType: 'full-time',
    experience: '2+ Years',
    summary: 'Identify, attract, and engage top talent by sourcing, screening, and presenting quality candidates for client requirements.',
    jobDetails: [
      { heading: 'Position Mission', content: 'To identify, attract, and engage top talent by sourcing, screening, and presenting quality candidates for client requirements, ensuring timely submissions and successful placements.' },
      { heading: 'Responsibilities', content: 'Source, screen, interview, and evaluate candidates. Review applicants, format resumes, coordinate interviews, and communicate clearly with the delivery team.' },
      { heading: 'Qualifications, Experience & Required Skills', content: 'Bachelor degree preferred, 1-2 years of recruitment experience, strong communication skills, attention to detail, and ability to multitask.' },
    ],
  },
]

export const homePageFallback: PageContent = {
  title: 'Home',
  slug: 'home',
  seo: {
    metaTitle: 'INFE Talent | Offshore Recruitment Solutions',
    metaDescription: 'End-to-end offshore recruitment solutions that help staffing firms in the USA, UK, and APAC scale delivery teams.',
    keywords: [{ keyword: 'offshore recruitment' }, { keyword: 'recruitment process outsourcing' }, { keyword: 'staffing support' }],
    openGraphImage: figmaAssets.heroInterview,
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'INFE Talent',
      heading: 'End-To-End Offshore Recruitment Solutions, To Transform Your Business - INSIDE OUT.',
      description: 'Build scalable recruiting capacity with dedicated offshore teams for sourcing, screening, submissions, and onboarding.',
      primaryAction: { label: 'Get Started', url: '#contact' },
      secondaryAction: { label: 'Learn More', url: '#about' },
      media: figmaAssets.heroInterview,
      stats: [{ value: '3000+', label: 'Professionals Joined' }],
    },
    { blockType: 'statsStrip', items: [{ value: '250+', label: 'Clients Globally' }, { value: '20+', label: 'Years of Experience' }, { value: '3000+', label: 'Professionals' }, { value: '97%', label: 'NPS Score' }] },
    {
      blockType: 'contentImage',
      heading: 'If It Is About People, We Make It Possible!',
      bodyText: [
        'INFE Talent is a global offshore recruitment service provider with over 20 years of expertise. As an offshore recruitment partner, we empower staffing firms in the USA, UK, and APAC to benefit from our flexible, scalable, and uninterrupted recruitment solutions to build dynamic teams.',
        'Our clients have trusted INFE Talent as their offshore recruitment partner for over 20 years. With delivery centers in India and the Philippines, we provide 360\u00B0 recruitment services, from mapping and sourcing to onboarding and everything in between!',
      ],
      media: figmaAssets.aboutOfficeTall,
      mediaSecondary: figmaAssets.aboutOfficeSide,
      action: { label: 'Get In Touch', url: '#contact' },
    },
    { blockType: 'servicesGrid', heading: 'A Complete Offshore Recruitment Ecosystem.', description: 'By identifying, attracting, and engaging exceptional talent, we make every connection count.', services },
    {
      blockType: 'awards',
      heading: 'Our Awards',
      description: 'Our numerous recognitions highlight our continued service excellence.',
      items: figmaAssets.awards.map((image, index) => ({ title: `Recruitment Excellence ${index + 1}`, description: 'Recognized for reliable delivery, measurable outcomes, and long-standing recruitment operations support.', image })),
    },
    { blockType: 'certifications', heading: 'Our Certifications', items: ['ISO 9001:2015', 'ISO 27001:2022', 'HIPAA Aligned', 'GDPR Ready', 'SOC Controls', 'Data Security', 'Quality Management', 'Privacy Standards'].map((label) => ({ label })) },
    {
      blockType: 'industries',
      eyebrow: 'Industries We Serve',
      heading: 'Specialised Recruitment Across 10+ Verticals.',
      description: 'Flexible delivery teams for healthcare, IT, engineering, finance, manufacturing, retail, logistics, and professional services.',
      primaryAction: { label: 'Get Started', url: '#contact' },
      secondaryAction: { label: 'Learn More', url: '/services' },
      items: ['Healthcare', 'IT & Digital', 'Light Industrial', 'Engineering', 'Finance', 'Legal', 'Manufacturing', 'Retail', 'Logistics', 'Professional Services'].map((label) => ({ label })),
    },
    { blockType: 'testimonials', eyebrow: '#infetalent', heading: 'What Partners Say About Working With INFE.', description: 'Every INFE leader carries a story shaped by these principles - and now, we are bringing those stories to you.', items: testimonials },
    { blockType: 'blogListing', heading: 'Blogs', description: 'With deep industry expertise, we present unique insights into the trends that impact organisations in a dynamic world market.', posts: blogs, limit: 3 },
    { blockType: 'contact', eyebrow: 'Get in Touch', heading: 'Let Us Design Your Offshore Recruitment Engine.', description: 'Tell us about your hiring goals. We will come back within one business day with a tailored model and a clear path to scale.', formHeading: 'Get in Touch Today!' },
  ],
}
