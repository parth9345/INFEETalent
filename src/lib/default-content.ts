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
  {
    title: 'Recruitment Management',
    slug: 'recruitment-management',
    summary: 'End-to-end offshore recruitment management for staffing firms that need consistent sourcing, screening, submissions, interview coordination, and onboarding support.',
    icon: 'SearchCheck',
    content: 'INFE Talent builds dedicated recruitment delivery teams that manage the daily operating rhythm of high-volume hiring. Our recruiters support job intake, candidate sourcing, screening, shortlist preparation, submission tracking, interview coordination, and post-offer follow-up so your internal team can stay focused on client relationships and revenue growth.',
    benefits: [
      { label: 'Candidate Sourcing' },
      { label: 'Screening Support' },
      { label: 'Submission Management' },
      { label: 'Interview Coordination' },
      { label: 'Onboarding Follow-Up' },
      { label: 'Recruitment Reporting' },
    ],
    process: [
      { title: 'Map Requirements', description: 'We capture role requirements, workflow expectations, reporting cadence, and delivery priorities.' },
      { title: 'Build Pipeline', description: 'Dedicated recruiters source, screen, and organize candidate pipelines around your hiring goals.' },
      { title: 'Coordinate Delivery', description: 'We manage submissions, interview schedules, follow-ups, and operational reporting.' },
      { title: 'Improve Continuously', description: 'Weekly reviews keep quality, speed, and conversion performance visible.' },
    ],
    cta: { label: 'Talk To An Expert', url: '/contact' },
    seo: {
      metaTitle: 'Recruitment Management Services | INFE Talent',
      metaDescription: 'Scale recruitment delivery with INFE Talent offshore recruitment management teams for sourcing, screening, coordination, submissions, and onboarding.',
      keywords: [{ keyword: 'recruitment management' }, { keyword: 'offshore recruitment' }, { keyword: 'staffing support' }],
    },
  },
  {
    title: 'Executive Search',
    slug: 'executive-search',
    summary: 'Research-led executive search support for confidential, senior, and specialist leadership mandates across competitive global talent markets.',
    icon: 'BadgeCheck',
    content: 'Our executive search support combines market research, leadership mapping, discreet outreach, and candidate intelligence to help recruitment partners engage senior talent with confidence. We support C-suite, board, specialist, and hard-to-fill leadership searches with structured research and careful candidate handling.',
    benefits: [
      { label: 'Leadership Mapping' },
      { label: 'Confidential Search' },
      { label: 'Passive Candidate Research' },
      { label: 'Shortlist Development' },
      { label: 'Succession Support' },
      { label: 'Market Intelligence' },
    ],
    process: [
      { title: 'Define Search Strategy', description: 'We map role context, target companies, search sensitivity, and outreach priorities.' },
      { title: 'Research Talent Pools', description: 'Researchers build longlists across target markets, competitors, and adjacent sectors.' },
      { title: 'Qualify Candidates', description: 'Profiles are screened against role fit, motivation, availability, and leadership criteria.' },
      { title: 'Support Shortlists', description: 'We organize insights and candidate data for confident client presentation.' },
    ],
    cta: { label: 'Talk To An Expert', url: '/contact' },
    seo: {
      metaTitle: 'Executive Search Support | INFE Talent',
      metaDescription: 'Use INFE Talent executive search support for leadership mapping, passive candidate research, confidential search, and senior hiring intelligence.',
      keywords: [{ keyword: 'executive search' }, { keyword: 'leadership hiring' }, { keyword: 'candidate research' }],
    },
  },
  {
    title: 'HR Consulting',
    slug: 'hr-consulting',
    summary: 'Practical HR consulting support for staffing and recruitment teams that need stronger workflows, documentation, compliance, and people operations.',
    icon: 'FileCheck2',
    content: 'INFE Talent helps recruitment organizations improve HR operations through workflow documentation, compliance support, onboarding structure, policy alignment, and process improvement. Our consultants work alongside your team to create repeatable people operations that support scale.',
    benefits: [
      { label: 'HR Process Mapping' },
      { label: 'Compliance Support' },
      { label: 'Onboarding Structure' },
      { label: 'Policy Documentation' },
      { label: 'Workflow Improvement' },
      { label: 'Operational Reporting' },
    ],
    process: [
      { title: 'Audit Workflows', description: 'We review current HR and recruitment operations to identify gaps and friction points.' },
      { title: 'Design Improvements', description: 'Recommendations focus on clearer process ownership, documentation, and repeatable standards.' },
      { title: 'Support Rollout', description: 'We help operational teams implement new practices without disrupting delivery.' },
      { title: 'Measure Adoption', description: 'Progress is monitored through reporting, feedback, and practical operating metrics.' },
    ],
    cta: { label: 'Talk To An Expert', url: '/contact' },
    seo: {
      metaTitle: 'HR Consulting Services | INFE Talent',
      metaDescription: 'Improve HR and recruitment operations with INFE Talent consulting support for workflows, compliance, onboarding, and people operations.',
      keywords: [{ keyword: 'HR consulting' }, { keyword: 'recruitment operations' }, { keyword: 'HR compliance' }],
    },
  },
  {
    title: 'Talent Acquisition',
    slug: 'talent-acquisition',
    summary: 'Dedicated offshore talent acquisition teams that identify, engage, screen, and nurture candidates for active and future hiring needs.',
    icon: 'UsersRound',
    content: 'Our talent acquisition teams strengthen your candidate pipeline by combining targeted sourcing, structured outreach, qualification, and nurturing. We help staffing firms improve coverage, speed, and candidate experience across active roles and future demand.',
    benefits: [
      { label: 'Active Sourcing' },
      { label: 'Passive Talent Search' },
      { label: 'Candidate Screening' },
      { label: 'Pipeline Nurturing' },
      { label: 'Talent Pool Management' },
      { label: 'Candidate Experience' },
    ],
    process: [
      { title: 'Plan Demand', description: 'We align sourcing priorities with role volume, market difficulty, and expected hiring timelines.' },
      { title: 'Source Talent', description: 'Recruiters search across job boards, databases, networks, and targeted market segments.' },
      { title: 'Engage Candidates', description: 'Outreach and follow-up keep prospects informed, responsive, and ready for next steps.' },
      { title: 'Track Quality', description: 'Pipeline quality is reviewed through submission, interview, and conversion data.' },
    ],
    cta: { label: 'Talk To An Expert', url: '/contact' },
    seo: {
      metaTitle: 'Talent Acquisition Services | INFE Talent',
      metaDescription: 'Build stronger candidate pipelines with INFE Talent offshore talent acquisition teams for sourcing, screening, and candidate engagement.',
      keywords: [{ keyword: 'talent acquisition' }, { keyword: 'candidate sourcing' }, { keyword: 'offshore recruiters' }],
    },
  },
  {
    title: 'Staffing Solutions',
    slug: 'staffing-solutions',
    summary: 'Flexible staffing support models that help recruitment agencies scale delivery teams, improve coverage, and maintain consistent output.',
    icon: 'Briefcase',
    content: 'INFE Talent staffing solutions give agencies the operational capacity to expand delivery without adding unnecessary overhead. We provide dedicated recruiters, sourcers, coordinators, and back-office support tailored to your sector, systems, and service level expectations.',
    benefits: [
      { label: 'Dedicated Offshore Teams' },
      { label: 'Flexible Capacity' },
      { label: 'Sector-Aligned Support' },
      { label: 'Delivery Coordination' },
      { label: 'Back-Office Operations' },
      { label: 'Performance Reporting' },
    ],
    process: [
      { title: 'Choose Team Model', description: 'We define the right mix of recruiters, sourcers, coordinators, and support roles.' },
      { title: 'Integrate Systems', description: 'Teams work inside your ATS, VMS, job boards, reporting tools, and communication channels.' },
      { title: 'Launch Delivery', description: 'Daily priorities are managed through a clear delivery rhythm and escalation path.' },
      { title: 'Scale Responsibly', description: 'Capacity can expand as role volume, client demand, and performance targets grow.' },
    ],
    cta: { label: 'Talk To An Expert', url: '/contact' },
    seo: {
      metaTitle: 'Staffing Solutions | INFE Talent',
      metaDescription: 'Scale staffing delivery with INFE Talent offshore staffing solutions for recruiters, sourcers, coordinators, and back-office operations.',
      keywords: [{ keyword: 'staffing solutions' }, { keyword: 'offshore staffing' }, { keyword: 'recruitment support' }],
    },
  },
  {
    title: 'Payroll Management',
    slug: 'payroll-management',
    summary: 'Payroll administration support for recruitment teams that need accurate timesheet checks, payroll coordination, records, and reporting.',
    icon: 'ReceiptText',
    content: 'Our payroll management support helps staffing firms reduce administrative pressure by coordinating timesheets, pay data, documentation, payroll queries, and reporting. We work with your existing tools and approval processes to keep payroll operations organized and accurate.',
    benefits: [
      { label: 'Timesheet Follow-Up' },
      { label: 'Payroll Data Checks' },
      { label: 'Documentation Support' },
      { label: 'Query Coordination' },
      { label: 'Approval Tracking' },
      { label: 'Payroll Reporting' },
    ],
    process: [
      { title: 'Confirm Workflow', description: 'We document payroll inputs, approval paths, deadlines, and reporting requirements.' },
      { title: 'Track Submissions', description: 'Teams follow up on timesheets, missing information, and approval exceptions.' },
      { title: 'Prepare Records', description: 'Payroll data and supporting documentation are organized for internal review.' },
      { title: 'Report Exceptions', description: 'Issues are surfaced early so payroll teams can resolve them before deadlines.' },
    ],
    cta: { label: 'Talk To An Expert', url: '/contact' },
    seo: {
      metaTitle: 'Payroll Management Support | INFE Talent',
      metaDescription: 'Improve staffing payroll operations with INFE Talent support for timesheets, payroll data checks, documentation, and reporting.',
      keywords: [{ keyword: 'payroll management' }, { keyword: 'timesheet support' }, { keyword: 'staffing payroll' }],
    },
  },
  {
    title: 'Career Consulting',
    slug: 'career-consulting',
    summary: 'Candidate-focused career consulting support that improves readiness, communication, interview preparation, and placement confidence.',
    icon: 'GraduationCap',
    content: 'INFE Talent supports recruitment partners with candidate care that improves readiness and confidence. Our teams help coordinate resume readiness, interview preparation, communication, follow-ups, and candidate guidance throughout the hiring journey.',
    benefits: [
      { label: 'Resume Readiness' },
      { label: 'Interview Preparation' },
      { label: 'Candidate Communication' },
      { label: 'Career Guidance' },
      { label: 'Follow-Up Support' },
      { label: 'Placement Readiness' },
    ],
    process: [
      { title: 'Assess Candidate Needs', description: 'We identify readiness gaps, communication preferences, and role expectations.' },
      { title: 'Prepare Materials', description: 'Candidate profiles, resumes, and supporting details are reviewed for presentation quality.' },
      { title: 'Support Interviews', description: 'Candidates receive coordination support and preparation guidance before interviews.' },
      { title: 'Maintain Engagement', description: 'Follow-up and communication keep candidates informed through hiring decisions.' },
    ],
    cta: { label: 'Talk To An Expert', url: '/contact' },
    seo: {
      metaTitle: 'Career Consulting Support | INFE Talent',
      metaDescription: 'Support candidates with INFE Talent career consulting for resume readiness, interview preparation, communication, and placement readiness.',
      keywords: [{ keyword: 'career consulting' }, { keyword: 'candidate care' }, { keyword: 'interview preparation' }],
    },
  },
  {
    title: 'Corporate Training',
    slug: 'corporate-training',
    summary: 'Recruitment operations training support that helps teams improve process adoption, communication, compliance, and delivery consistency.',
    icon: 'Presentation',
    content: 'Our corporate training support helps recruitment teams adopt better operating rhythms, understand process standards, and improve communication across delivery workflows. Training can support recruiters, sourcers, coordinators, and offshore delivery teams.',
    benefits: [
      { label: 'Recruiter Enablement' },
      { label: 'Process Training' },
      { label: 'Compliance Awareness' },
      { label: 'Communication Coaching' },
      { label: 'System Adoption' },
      { label: 'Delivery Standards' },
    ],
    process: [
      { title: 'Identify Training Needs', description: 'We map capability gaps, workflow issues, and team priorities.' },
      { title: 'Build Practical Content', description: 'Training materials focus on real recruitment scenarios and day-to-day operating needs.' },
      { title: 'Deliver Sessions', description: 'Teams receive structured guidance, examples, and follow-up action points.' },
      { title: 'Reinforce Learning', description: 'Progress is supported through refreshers, manager feedback, and performance indicators.' },
    ],
    cta: { label: 'Talk To An Expert', url: '/contact' },
    seo: {
      metaTitle: 'Corporate Training For Recruitment Teams | INFE Talent',
      metaDescription: 'Train recruitment teams with INFE Talent corporate training for process adoption, communication, compliance, and delivery standards.',
      keywords: [{ keyword: 'corporate training' }, { keyword: 'recruitment training' }, { keyword: 'team enablement' }],
    },
  },
]

export const testimonials: TestimonialItem[] = [
  {
    name: 'John Lang',
    role: 'Managing Director',
    company: 'Appoint Group',
    quote:
      'Working with INFE Talent has been our first experience of working with an offshoring service, and it has been a very positive one. We would happily recommend INFE Talent as an offshoring solution.',
    rating: 5,
    testimonialType: 'text',
    featured: false,
    sortOrder: 10,
  },
  {
    name: 'Brady Wolfe',
    role: 'Delivery Manager',
    company: 'Brooksource',
    quote:
      'I have had the privilege of working with a team of INFE Talent recruiters for the past 3 years, and I can genuinely say it has been a very rewarding and valuable experience. The INFE Talent team has diligently worked offshore to help support all my MSP clients and their contract resource needs.',
    rating: 5,
    testimonialType: 'video',
    featured: true,
    sortOrder: 20,
  },
  {
    name: 'David Cassese',
    role: 'Regional Vice President',
    company: 'C&L Group',
    quote:
      'INFE Talent has been a great partner throughout the years. We work on both IT and non-IT positions across many industries with them. I would like to say thank you for your stellar customer service and all the help that you have provided to ensure that we can maintain our SLAs and good VMS/MSP relationships.',
    rating: 5,
    testimonialType: 'text',
    featured: false,
    sortOrder: 30,
  },
  {
    name: 'Robert Frantz',
    role: 'Director - Alternative Delivery Channels',
    company: 'Kelly Services',
    quote:
      'Anyone can be a great partner when times are good. INFE Talent is a great partner when times are tough, and that is what you need from an offshore partnership.',
    rating: 5,
    testimonialType: 'text',
    featured: false,
    sortOrder: 40,
  },
  {
    name: 'VP Talent',
    role: 'Talent Acquisition Leader',
    company: 'US Healthcare Staffing',
    quote: 'INFE became a true extension of our team within weeks. The quality of submissions transformed our delivery.',
    rating: 5,
    testimonialType: 'video',
    featured: true,
    sortOrder: 50,
  },
  {
    name: 'Head of Compliance',
    role: 'Compliance Leader',
    company: 'Large Healthcare Recruitment Agency, UK',
    quote:
      'The partnership and support that INFE Talent continues to demonstrate are much appreciated, and we look forward to continuing our relationship positively.',
    rating: 5,
    testimonialType: 'text',
    featured: true,
    sortOrder: 60,
  },
  {
    name: 'CEO',
    role: 'Business Owner',
    company: 'ProMedical',
    quote: 'Very well done on the super prompt turnaround and flexibility on approach.',
    rating: 5,
    testimonialType: 'text',
    featured: false,
    sortOrder: 70,
  },
  {
    name: 'MD',
    role: 'Managing Director',
    company: 'APAC Staffing Group',
    quote: 'Predictable, professional, partnership-driven. The best offshore decision we have made.',
    rating: 5,
    testimonialType: 'video',
    featured: true,
    sortOrder: 80,
  },
  {
    name: 'Training Program Graduate',
    role: 'Candidate',
    company: 'Career Consulting Program',
    quote:
      'The training and career consulting support helped me understand recruiter expectations, improve my interview readiness, and move into a role with confidence.',
    rating: 5,
    testimonialType: 'video',
    featured: false,
    sortOrder: 90,
  },
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
