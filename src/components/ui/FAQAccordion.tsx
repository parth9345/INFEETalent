'use client'

import { useId, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

import { RichText } from './RichText'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/types/content'

type FAQAccordionProps = {
  items: FAQItem[]
  defaultOpenFirst?: boolean
}

export function FAQAccordion({ items, defaultOpenFirst = true }: FAQAccordionProps) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(defaultOpenFirst ? 0 : -1)

  return (
    <div className="divide-y divide-neutral-border border-y border-neutral-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-trigger-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.id || item.question} className="py-6">
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-center justify-between gap-6 text-left text-h4 font-extrabold text-neutral-dark"
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <span className="flex size-9 shrink-0 items-center justify-center border border-neutral-border text-brand-primary">
                {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn('grid transition-[grid-template-rows] duration-300', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl pt-4">
                  <RichText value={item.answer} fallback={typeof item.answer === 'string' ? [item.answer] : []} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
