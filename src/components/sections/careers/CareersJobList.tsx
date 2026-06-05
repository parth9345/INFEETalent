'use client'

import { useState } from 'react'
import { BriefcaseBusiness, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import type { CareerItem } from '@/types/content'

const initialVisibleCount = 7
const loadMoreCount = 4

export function CareersJobList({ careers }: { careers: CareerItem[] }) {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount)
  const visibleCareers = careers.slice(0, visibleCount)
  const hasMoreCareers = visibleCount < careers.length

  if (!careers.length) {
    return (
      <div className="careers-empty-state border border-[#CCCCCC] px-[32px] py-[42px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]">
        We do not have open roles right now. Please check back soon.
      </div>
    )
  }

  return (
    <>
      <div className="careers-job-list border border-[#CCCCCC]">
        {visibleCareers.map((career, index) => (
          <article
            key={career.slug || `${career.title}-${index}`}
            className="career-card grid min-h-[126px] gap-[24px] border-b border-[#CCCCCC] px-[28px] py-[28px] transition duration-300 last:border-b-[0px] hover:bg-[#FFFFFF]/58 md:grid-cols-[1fr_auto] md:items-center lg:px-[50px] lg:py-[0px]"
          >
            <div className="career-card-content">
              <h3 className="text-[18px] font-[800] leading-[26px] tracking-[0px] text-[#151515] md:text-[20px] md:leading-[28px]">
                {career.title}
              </h3>
              <div className="career-card-meta mt-[15px] flex flex-wrap gap-x-[24px] gap-y-[9px] text-[13px] font-[400] leading-[18px] tracking-[0px] text-[#555555]">
                <span className="inline-flex items-center gap-[8px]">
                  <MapPin size={15} strokeWidth={2} className="text-[#555555]" aria-hidden="true" />
                  {career.location}
                </span>
                {career.experience ? (
                  <span className="inline-flex items-center gap-[8px]">
                    <BriefcaseBusiness size={15} strokeWidth={2} className="text-[#555555]" aria-hidden="true" />
                    {career.experience}
                  </span>
                ) : null}
              </div>
            </div>

            {career.slug ? (
              <Button
                href={`/careers/${career.slug}`}
                className="primary-cst-btn career-card-button h-[36px] w-[132px] border-[0px] bg-[#FCA62B] px-[12px] text-[10px] font-[800] leading-[14px] tracking-[0.3px] text-[#262164] hover:bg-[#FCA62B]/88"
              >
                View And Apply
              </Button>
            ) : (
              <Button
                disabled
                className="primary-cst-btn career-card-button h-[36px] w-[132px] border-[0px] bg-[#FCA62B] px-[12px] text-[10px] font-[800] leading-[14px] tracking-[0.3px] text-[#262164]"
              >
                View And Apply
              </Button>
            )}
          </article>
        ))}
      </div>

      {hasMoreCareers ? (
        <div className="careers-load-more mt-[48px] flex justify-center">
          <Button
            variant="secondary"
            onClick={() => setVisibleCount((current) => Math.min(current + loadMoreCount, careers.length))}
            className="secondary-cst-btn h-[37px] min-w-[93px] border-[1px] border-[#2C368D] px-[18px] text-[10px] font-[800] leading-[14px] tracking-[0.3px] text-[#2C368D] hover:bg-[#EAEBF4]"
          >
            Load More
          </Button>
        </div>
      ) : null}
    </>
  )
}
