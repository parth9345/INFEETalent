'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight, BriefcaseBusiness, MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/Button'
import type { CareerItem } from '@/types/content'

type CareerListProps = {
  careers: CareerItem[]
  showFilters?: boolean
  emptyState?: string
}

export function CareerList({ careers, showFilters = true, emptyState }: CareerListProps) {
  const [department, setDepartment] = useState('all')
  const [location, setLocation] = useState('all')

  const departments = useMemo(() => unique(careers.map((career) => career.department)), [careers])
  const locations = useMemo(() => unique(careers.map((career) => career.location)), [careers])
  const filteredCareers = careers.filter((career) => {
    const departmentMatch = department === 'all' || career.department === department
    const locationMatch = location === 'all' || career.location === location

    return departmentMatch && locationMatch
  })

  return (
    <div>
      {showFilters && careers.length ? (
        <div className="mb-10 grid gap-4 border border-neutral-border bg-neutral-white p-5 md:grid-cols-[1fr_1fr_auto]">
          <Filter label="Department" value={department} options={departments} onChange={setDepartment} />
          <Filter label="Location" value={location} options={locations} onChange={setLocation} />
          <Button
            variant="secondary"
            className="h-[60px]"
            onClick={() => {
              setDepartment('all')
              setLocation('all')
            }}
          >
            Reset
          </Button>
        </div>
      ) : null}
      {filteredCareers.length ? (
        <div className="grid gap-6">
          {filteredCareers.map((career) => (
            <article key={career.slug || career.title} className="grid gap-6 border border-neutral-border bg-neutral-white p-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-body12 font-extrabold uppercase tracking-[2.4px] text-brand-primary">{career.department || 'Careers'}</p>
                <h3 className="mt-3 text-h3 font-extrabold text-neutral-dark">{career.title}</h3>
                <p className="mt-3 max-w-3xl text-body14 leading-[22px] text-neutral-muted">{career.summary}</p>
                <div className="mt-5 flex flex-wrap gap-5 text-body14 text-neutral-muted">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={18} className="text-brand-primary" aria-hidden="true" /> {career.location}
                  </span>
                  {career.experience ? (
                    <span className="inline-flex items-center gap-2">
                      <BriefcaseBusiness size={18} className="text-brand-primary" aria-hidden="true" /> {career.experience}
                    </span>
                  ) : null}
                </div>
              </div>
              {career.slug ? (
                <Link href={`/careers/${career.slug}` as Route} className="inline-flex items-center gap-2 text-link14 font-extrabold uppercase tracking-[0.8px] text-brand-primary">
                  View Role <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-neutral-border bg-neutral-white p-8 text-body18 leading-[30px] text-neutral-muted">
          {emptyState || 'We do not have open roles right now.'}
        </div>
      )}
    </div>
  )
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="grid gap-2 text-body12 font-extrabold uppercase tracking-[2px] text-brand-primary">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-[60px] border border-neutral-border bg-neutral-white px-4 text-body16 font-semibold normal-case tracking-normal text-neutral-dark">
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

const unique = (items: (string | undefined)[]) => Array.from(new Set(items.filter((item): item is string => Boolean(item))))
